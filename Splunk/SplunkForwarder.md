Create an instance from Splunk AMI on AWS marketplace
Default username: admin
Default Password: SPLUNK-Instance id
Configure Recieveing port
-> Setting -> Recieving and Forwarding -> add new port
Port 9997

##  Setup the forwarder
Use ubuntu ami
Sigup on Splunk website 
Use wget generated command 
install using 
```
apt install ./...deb
```
```
cd /opt/splunkforwarder/bin/
```
```
sudo ./splunk start --accept-license
```
id: rohansk
password : cmpe295B
```
./splunk add forward-server 54.176.116.92:9997
```

To enable start on boot

```
/opt/splunkforwarder/bin/splunk enable boot-start
```
add a monitor
```
./splunk add monitor /var/log/auth.log -sourcetype linux_secure
```
```
./splunk add monitor /var/log/syslog -sourcetype syslog
```
For making it permanent
```
vi /opt/splunkforwarder/etc/system/local/inputs.conf
```

add lines
```
[monitor:///var/log/auth.log] sourcetype=linux_secure
 
[monitor:///var/log/syslog] sourcetype=syslog
```


