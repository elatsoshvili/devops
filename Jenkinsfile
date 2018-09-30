node{
  def Namespace = "development"
  def ImageName = "nikanikabadze/devopsapp"
  def Creds	= "dockerhub"
  try{
  stage('Checkout'){
      git 'https://github.com/nikanikabadze/devops.git'
      sh "git rev-parse --short HEAD > .git/commit-id"
      imageTag= readFile('.git/commit-id').trim()



  }


  stage('RUN Unit Tests'){
      sh "npm install"
      sh "npm test"
  }
  stage('Docker Build, Push'){
    withDockerRegistry([credentialsId: "${Creds}", url: 'https://index.docker.io/v1/']) {
      sh "docker build -t ${ImageName}:${imageTag} ."
      sh "docker push ${ImageName}"
        }

    }
    stage('Deploy on K8s'){
//this shit should be fixed
     sh "ansible-playbook  /var/lib/jenkins/workspace/POC/ansible/devopsapp-deploy/deploy.yml  --user=jenkins --extra-vars ImageName=${ImageName} --extra-vars imageTag=${imageTag} --extra-vars Namespace=${Namespace}"
    }
     } catch (err) {
      currentBuild.result = 'FAILURE'
    }
}
