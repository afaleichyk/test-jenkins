node('prod_linux_awscli_docker_24.0.2_buildx') {
    properties([disableConcurrentBuilds()])

    env.DOCKER_TOOL = "Docker-20.10.8"
    env.DOCKER_HOME = "${tool env.DOCKER_TOOL}"

    env.NODEJS_TOOL = "node16.14"
    env.NODEJS_HOME = "${tool env.NODEJS_TOOL}"

    stage('scm') {
        checkout scm
    }

    stage('build & push') {
        def AWS_REGION = "us-east-1"
        def AWS_ACCOUNT = "470427355418"
        def ECR_REGISTRY = "${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com"
        def ECR_REPO_NAME = "backstage-app"
        def IMAGE_TAG = "${ECR_REGISTRY}/${ECR_REPO_NAME}:${env.BUILD_NUMBER}"
        def LATEST_IMAGE_TAG = "${ECR_REGISTRY}/${ECR_REPO_NAME}:latest"

        withEnv(["PATH=${env.NODEJS_HOME}/bin:${env.PATH}", "PATH+DOCKER=${env.DOCKER_HOME}/bin"]) {
            sh 'docker --version'
            sh 'aws --version'
            sh 'node --version'
            sh 'npm --version'

            sh 'yarn install --frozen-lockfile'
            sh 'npm run build:backend'

            withAWSQa {
                loginToEcr("$AWS_REGION", "$AWS_ACCOUNT")
                sh "aws ecr create-repository --repository-name ${ECR_REPO_NAME} --region ${AWS_REGION} 2>&1 || true"
                sh "npm run build-image -- --tag ${IMAGE_TAG}"
                sh "docker push ${IMAGE_TAG}"
                sh "docker tag ${IMAGE_TAG} ${LATEST_IMAGE_TAG}"
                sh "docker push ${LATEST_IMAGE_TAG}"
            }
        }
    }

    stage('deploy') {
        sh "aws sts get-caller-identity"
        sh "aws sts assume-role --role-arn arn:aws:iam::651190245128:role/jenkins --role-session-name rcs-infrastructure-pipe > rcs_dev_session_token.json"
        env.RCS_DEV_AWS_ACCESS_KEY_ID = sh(script: "cat rcs_dev_session_token.json | jq -r .Credentials.AccessKeyId", returnStdout: true).trim()
        env.RCS_DEV_AWS_SECRET_ACCESS_KEY = sh(script: "cat rcs_dev_session_token.json | jq -r .Credentials.SecretAccessKey", returnStdout: true).trim()
        env.RCS_DEV_AWS_SESSION_TOKEN = sh(script: "cat rcs_dev_session_token.json | jq -r .Credentials.SessionToken", returnStdout: true).trim()
        sh "rm rcs_dev_session_token.json"

        withEnv(["AWS_ACCESS_KEY_ID=${env.RCS_DEV_AWS_ACCESS_KEY_ID}",
                "AWS_SECRET_ACCESS_KEY=${env.RCS_DEV_AWS_SECRET_ACCESS_KEY}",
                "AWS_SESSION_TOKEN=${env.RCS_DEV_AWS_SESSION_TOKEN}"]) {
            sh 'aws ecs update-service --cluster rcs-dev --service backstage --force-new-deployment --region us-east-1'
        }
    }
}
