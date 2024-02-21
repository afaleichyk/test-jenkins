 node('team_devtools-k8s-small') {
    sh "echo \"Hello\""
    
    env.DOCKER_TOOL = "Docker-20.10.8"
    env.DOCKER_HOME = "${tool env.DOCKER_TOOL}"

    env.NODEJS_TOOL = "node16.14"
    env.NODEJS_HOME = "${tool env.NODEJS_TOOL}"
    
    stage('build') {
        def AWS_REGION = ""
        def AWS_ACCOUNT = ""
        def ECR_REGISTRY = "${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com"
        def ECR_REPO_NAME = ""
        def IMAGE_TAG = "test"
        def LATEST_IMAGE_TAG = "test:latest"
        
        withEnv(["PATH=${env.NODEJS_HOME}/bin:${env.PATH}", "PATH+DOCKER=${env.DOCKER_HOME}/bin"]) {
            sh 'docker --version'
            sh 'node --version'
            sh 'npm --version'
            sh "npm run build-image -- --tag ${IMAGE_TAG}"
            sh "docker push ${IMAGE_TAG}"
            sh "docker tag ${IMAGE_TAG} ${LATEST_IMAGE_TAG}"
            sh "docker push ${LATEST_IMAGE_TAG}"
        }
    }
 }