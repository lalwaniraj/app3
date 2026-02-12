pipeline {
    agent any

    environment {
        IMAGE = "rajkumar179/app3:latest"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/lalwaniraj/app3.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE .'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                ssh ubuntu@APP_EC2_IP "
                docker stop app || true
                docker rm app || true
                docker run -d -p 80:3000 --name app $IMAGE
                "
                '''
            }
        }
    }
}
