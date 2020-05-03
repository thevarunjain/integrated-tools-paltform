# Installing docker on centos 

sudo yum install -y docker
sudo service docker start
docker --version 


# Get Started with Jenkins 


1. Spin a centos machine on AWS
2. SSH on it using your .pem key
3. Install dependency on centos machine

```
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
yum install java-1.8.0-openjdk
sudo service jenkins start
sudo chkconfig jenkins on
```
Jenkins is now launched as a daemon in the hosted machine.
Now jenkins is running on port 8080

Access the GUI using browser, use http://host_address:8080

> Detailed guide for instruction to install jenkins on RedHat Distribution (CentOS)
> https://wiki.jenkins.io/display/JENKINS/Installing+Jenkins+on+Red+Hat+distributions 

Server
ssh -i "NCaliforniaAWS.pem" ec2-user@ec2-54-153-5-132.us-west-1.compute.amazonaws.com

Service
Docker Host 
ssh -i "NCaliforniaAWS.pem" ubuntu@ec2-52-9-164-185.us-west-1.compute.amazonaws.com

---

# Credentials

Secret Password - 7525d20862a04195a65f466fd60f09d4
Username - admin
Password - admin
Name - Varun Jain 
Email - varunsj18@gmail.com
HTTP Basic Access Token - 112246fa80d7af43b1a98e9d0aec4574ec

#### Get Access Token
https://wiki.jenkins.io/display/JENKINS/Authenticating+scripted+clients
Go to your profile >  configure

#### JAVA REST CLIENT 
UNIREST 

#### Java Jenkins Client 
jenkins-client-api

### Java APis
https://support.cloudbees.com/hc/en-us/articles/226852648-How-to-build-a-job-using-the-REST-API-and-Java-


# Github Integration 
https://www.youtube.com/watch?v=Z3S2gMBUkBo
Go to manage jenkins 
got to available plugins
search github > github integration plugin
resatrt jenkins 


Your centOs machine may not have git installed 
    sudo yum install git
after this give /usr/bin/git path to your git configuration in manage jenkins > global configs 

create a new job


# JIRA - GITHUB INTEGRATION

Pipeline with Jenkinsfile for maven app
https://www.jenkins.io/doc/tutorials/build-a-java-app-with-maven/