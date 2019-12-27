pipeline {
  agent {
    node {
      label 'hackjam'
    }

  }
  stages {
    stage('Build') {
      steps {
        withNPM()
      }
    }

  }
}