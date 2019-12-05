#### What is Splunk?


A tool which is used for exploring logs

-Real time log forwarding

-Real time syslog analysis

-Real time server monitoring

-Real-time alerts/notifications

-Historical data log store and analysis

#### Deployment of Splunk Enterprise on Ubuntu Server(AWS/Local)

Steps: Change to super user
```
sudo su -
```
change directory 
```angular2
cd /opt/
```

```angular2
tar -xvf file name  
r-w-x
chmod -R 777 splunkforwarder
chmod -R 777 splunk
```

On splunk master go to /splunk/bin

``
cd /splunk/bin
``

Start Splunk Server

``
./splunk start --accept-license
``

Setup Universal Forwarder

Similar procedure 

```
cd /splunkforwarder/bin

./splunk start --accept-license
```
Setup log forwarding

``
cd /var/log
``

To check server logs
``
cat syslog 
``

Go to :

``
cd /opt/splunkforwarder/bin
``

``
./splunk add forward-server <ip of master>:9997
``

Added forwarding message is displayed to confirm

Add path of system log file

``
./ splunk add monitor /var/log/syslog -index main -sourcetype MyUFServerLogs
``

Confirmation message: ``Added monitor``

on the Master:
open ports(SG on AWS)

``
./splunk enable listen 9997
``

Confirmation message:``Listen for splunk data``


Example API requests:

``
curl -u admin:<password> -k https://<ip>:8089/services/search/jobs -d search="search sourcetype=linux_secure fail* | top src_ip"
``

``
curl -u admin:<password> -k https://<ip>:8089/services/search/jobs/1572575969.157
``

Default output is in xml for any other format

``
curl -u admin:<password> -k https://<ip>:8089/services/search/jobs/1572575969.157/results --get -d output_mode=csv 
``

5 main features of splunk enterprise:

1. Index Data
   Collects data from sources, label data with source types. And convert to event and sorted by timestamp.
2. Search and Navigate
3. Add Knowledge
4. Monitor and Alert
5. Report and Analysis


#### Splunk Java SDK Setup:

Splunk Hooks:


- REST API
- SDK (Java/Python/JS)
- Spring Integration Adaptors
- Logging
- JMS Messaging
- JMX Beans
- Byte Code Injection

To add Splunk SDK there are 2 options:
1. Ant
2. Maven


add the following to the pom.xml file
```
<repositories>
...
<repository>
    <id>splunk-artifactory</id>  
    <name>Splunk Releases</name>
    <url>http://splunk.jfrog.io/splunk/ext-releases-local</url>
</repository>
</repositories>

<dependencies>
...
<dependency>
    <groupId>com.splunk</groupId>
    <artifactId>splunk</artifactId>
    <version>1.6.0.0</version>
</dependency>
</dependencies>

```



