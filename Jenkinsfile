pipeline {
  agent {
    node {
      label 'package.json'
    }

  }
  stages {
    stage('Build') {
      steps {
        withNPM()
      }
    }

    stage('Test') {
      steps {
        withNPM(npmrcConfig: 'run test') {
          sh 'npm run test'
        }

      }
    }

  }
}