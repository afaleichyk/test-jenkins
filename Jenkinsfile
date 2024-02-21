 node('team_devtools-k8s-small') {
    sh "echo \"Hello\""
    
    env.DOCKER_TOOL = "Docker-20.10.8"
    env.DOCKER_HOME = "${tool env.DOCKER_TOOL}"

    env.NODEJS_TOOL = "node16.14"
    env.NODEJS_HOME = "${tool env.NODEJS_TOOL}"

    stage('scm') {
        checkout scm
    }
    
    stage('build') {
        def AWS_REGION = "us-east-1"
        def AWS_ACCOUNT = "833915412828"
        def ECR_REGISTRY = "${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com"
        def ECR_REPO_NAME = "backstage-test-af"
        def IMAGE_TAG = "${ECR_REGISTRY}/${ECR_REPO_NAME}:${env.BUILD_NUMBER}"
        
        withEnv(["PATH=${env.NODEJS_HOME}/bin:${env.PATH}", "PATH+DOCKER=${env.DOCKER_HOME}/bin"]) {
            sh 'npm install --global yarn'
            sh "npm run build-image -- --tag ${IMAGE_TAG}"
            withAWSQa {
            loginToEcr("$AWS_REGION", "$AWS_ACCOUNT")
                sh "aws ecr create-repository --repository-name ${ECR_REPO_NAME} --region ${AWS_REGION} 2>&1 || true"
                sh "docker push ${IMAGE_TAG}"
            }
        }
    }
 }