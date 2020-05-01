
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
