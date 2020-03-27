pipeline {
  agent any
  stages {

    stage('Check for vulnerabilities') {
      steps {
        sh 'npm audit --parseable --production'
      }
    }

    stage('download dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Check linting') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Check unit:test') {
      steps {
        sh 'npm run test:unit -- --ci --coverage'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
  }
}
