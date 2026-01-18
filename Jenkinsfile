pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        // Define other environment variables or credentials here
        // DB_URI = credentials('mongo-db-uri')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Backend Deps') {
                    steps {
                        dir('backend') {
                            sh 'npm ci'
                        }
                    }
                }
                stage('Frontend Deps') {
                    steps {
                        dir('frontend') {
                            sh 'npm ci'
                        }
                    }
                }
            }
        }

        stage('Test') {
            steps {
                dir('backend') {
                    // Assuming there are tests to run
                    sh 'npm test'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Example deployment script execution
                    // Ensure the deploy user has permissions and SSH keys were set up
                    // This is a placeholder for the actual deployment logic
                    // which could involve SCPing files to a remote server
                    // or executing a local shell script if the agent is the implementation server.
                    
                    // Ideally, you would use an Automation Script here
                     sh 'bash scripts/deploy.sh'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
