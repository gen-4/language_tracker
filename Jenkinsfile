node {
	def app

	System.setProperty("org.jenkinsci.plugins.durabletask.BourneShellScript.HEARTBEAT_CHECK_INTERVAL", "86400")

	stage('Clone repository') {
		echo 'Cloning repository...'
		checkout scm
		echo 'Repository cloned'
	}

	stage('Build api image') {
		echo 'Building api image...'
		dir('api') {
			retry(3) {
				app = docker.build("language_tracker_image:latest")
			}
		}
		echo 'Image built'
	}


	stage('Build web image') {
		echo 'Building web image...'
		dir('language_frontend') {
			retry(3) {
				app = docker.build("language_tracker_web_image:latest")
			}
		}
		echo 'Image built'
	}

	stage('Deploying language_tracker') {
		dir('/home/hera/scripts') {
			sh 'restart_composition.sh'
		}
	}
}
