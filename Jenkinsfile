pipeline {
  agent any

  triggers {
      cron('@daily')
  }

  options {
    timeout(
      time: 1,
      unit: 'HOURS'
    )
  }

  stages {
    stage('sync data') {
      steps {
        sh '''
        git subtree pull \
          --prefix src/assets/covid19-gr-json \
          https://github.com/kargig/covid19-gr-json \
          master \
          --squash
        '''
      }
    }

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
