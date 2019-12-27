pipeline {
  agent {
    node {
      label 'run'
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