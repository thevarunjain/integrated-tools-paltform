
Docker on Ubuntu 18.04

Step 1 — Installing Docker


```
sudo apt update
```


```
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

```
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
```


```
sudo apt update
```

```
apt-cache policy docker-ce
```
Install Docker-ce
```
sudo apt install docker-ce
```

```
sudo systemctl status docker
```
Get Splunk Image

```
docker pull store/splunk/splunk:7.3
```

Run the splunk container

```
docker run -d -p 8000:8000 -e 'SPLUNK_START_ARGS=--accept-license' -e 'SPLUNK_PASSWORD=<password>' store/splunk/splunk:7.3
```
