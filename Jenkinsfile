pipeline {
    agent any

    environment {
        IMAGE_NAME = "rajkumar179/app3"
        IMAGE_TAG  = "${BUILD_NUMBER}"
    }

    stages {

        // -------------------------------
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/lalwaniraj/app3.git'
            }
        }

        // -------------------------------
        stage('Build Docker Image') {
            steps {
                echo "Building Docker image $IMAGE_NAME:$IMAGE_TAG"
                sh '''
                    docker build -t $IMAGE_NAME:$IMAGE_TAG -t $IMAGE_NAME:latest .
                '''
            }
        }

        // -------------------------------
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $IMAGE_NAME:$IMAGE_TAG
                        docker push $IMAGE_NAME:latest
                    '''
                }
            }
        }

        // -------------------------------
        stage('Deploy to GREEN EC2') {
            steps {
                sshagent(['green-ec2']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ec2-user@13.235.243.150 "
                            echo 'Pulling latest image...'
                            docker pull $IMAGE_NAME:latest &&
                            echo 'Stopping old container...'
                            docker stop app-green || true &&
                            docker rm app-green || true &&
                            echo 'Starting new container...'
                            docker run -d -p 80:3000 --name app-green $IMAGE_NAME:latest
                        "
                    '''
                }
            }
        }

    }

    post {
        success {
            echo "Pipeline completed successfully! ✅"
        }
        failure {
            echo "Pipeline failed! ❌ Check logs."
        }
    }
}
