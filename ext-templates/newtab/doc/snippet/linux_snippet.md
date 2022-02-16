# Linux snippet

## Command

### 1.count files

```shell
ls |wc -w
```

### 2.count files size

```shell
du filename
```

### 3.search files by contain keyword
```shell
grep keyword ./ -r -n
```


### 4.search files by filename keyword
```shell
find / -type f -name *keyword*
```

## Network config

### 1.Fixing Net-Manager

```shell
sudo /etc/init.d/network-manager stop && 
sudo rm -rf /var/lib/NetworkManager/NetworkManager.state && 
sudo sed -i 's/managed=false/managed=true/g' /etc/NetworkManager/NetworkManager.conf && 
sudo /etc/init.d/network-manager start
```

## Editor

### 1.sublime-text

```shell
wget https://download.sublimetext.com/sublime_text_3_build_3211_x64.tar.bz2 -O /opt/sublime_text_3_build_3211_x64.tar.bz2 && 
tar -xf /opt/sublime_text_3_build_3211_x64.tar.bz2 -C /opt/ && 
rm -f /opt/sublime_text_3_build_3211_x64.tar.bz2 && 
ln -s /opt/sublime_text_3/sublime_text /bin/subl
```

### 2.Pycharm

```shell
sudo wget https://download.jetbrains.8686c.com/python/pycharm-community-2020.2.3.tar.gz &
sudo tar -zxvf pycharm-community-2020.2.3.tar.gz -C /opt/ &
sudo rm pycharm-community-2020.2.3.tar.gz &
sudo /opt/pycharm-community-2020.2.3/bin/pycharm.sh
```

## Server

### 1.Python http.server
```shell
python3 -m http.server
```
### 2.SSH server
```shell
sudo apt install openssh-server
```

### 3.FTP server plaintext

```shell
sudo apt-get install vsftpd &&
sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.bak &&
sudo sed -i 's/listen=NO/listen=YES/g' /etc/vsftpd.conf &&
sudo sed -i 's/listen_ipv6=YES/listen_ipv6=NO/g' /etc/vsftpd.conf &&
sudo sed -i 's/#write_enable=YES/write_enable=YES/g' /etc/vsftpd.conf &&
sudo sed -i 's/#chroot_local_user=YES/chroot_local_user=NO/g' /etc/vsftpd.conf &&
sudo sed -i 's/#chroot_list_enable=YES/chroot_list_enable=YES/g' /etc/vsftpd.conf &&
sudo sed -i 's/#chroot_list_file=\/etc\/vsftpd.chroot_list/chroot_list_file=\/etc\/vsftpd.chroot_list/g' /etc/vsftpd.conf &&
sudo sed -i 's/listen_ipv6=YES/listen_ipv6=NO/g' /etc/vsftpd.conf &&
sudo sed -i '$a local_root=/home/ftpuser' /etc/vsftpd.conf &&
sudo sed -i '$a allow_writeable_chroot=YES' /etc/vsftpd.conf &&
sudo mkdir /home/ftpuser &&
sudo useradd ftpuser -d /home/ftpuser -s /bin/bash &&
sudo passwd ftpuser &&
sudo chown -R ftpuser:ftpuser /home/ftpuser/ &&
sudo echo ftpuser>>/etc/vsftpd.chroot_list &&
sudo service vsftpd restart
```

## File

### 1.make iso
```shell
# mkisofs
mkisofs -r -o a.iso a/

# genisoimage
genisoimage -o a.iso -V BACKUP -R -J a/
```

### 2.mount iso

```shell
mkdir /mnt/cdrom/ 
mount -t iso9660 -o loop /dev/cdrom /mnt/cdrom/
umount /dev/loop15

# or
mkdir dvd/
mount -o loop a.iso dvd/
umount dvd/

df -hl
```

### 3.pdf reader

```shell
sudo bash
wget http://cdn07.foxitsoftware.cn/pub/foxit/reader/desktop/linux/2.x/2.1/en_us/FoxitReader2.1.0805_Server_x64_enu_Setup.run.tar.gz
tar -zxvf FoxitReader2.1.0805_Server_x64_enu_Setup.run.tar.gz
./'FoxitReader.enu.setup.2.1.0805(r225432).x64.run'
```

### 4.markdown reader typora

```shell
wget -qO - https://typora.io/linux/public-key.asc | sudo apt-key add -
sudo add-apt-repository 'deb https://typora.io/linux ./'
sudo apt-get update
sudo apt-get install typora
```

## dev

### 1.golang
```shell
wget https://golang.google.cn/dl/go1.14.10.linux-amd64.tar.gz
tar -zxvf go1.14.10.linux-amd64.tar.gz -C /usr/local/
echo "export PATH=\$PATH:/usr/local/go/bin/" >> ~/.bashrc
rm -rf ./go1.14.10.linux-amd64.tar.gz
go version
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```

### 2.docker
```shell
sudo apt install docker.io
echo '{ 
"registry-mirrors": ["https://alzgoonw.mirror.aliyuncs.com"] 
}' > /etc/docker/daemon.json
systemctl daemon-reload
systemctl restart docker
systemctl status docker
```

#### run dockerfile
```shelll
docker images
docker rmi image_name
docker ps -a
docker rm container_name

docker build -t name:name1 .
docker run -i -d -p 20000:80 name:name1
docker exec -i -t trusting_jackson /bin/bash
```


### 3.ghidra
```shell
mkdir Ghidra
cd Ghidra
wget https://ghidra-sre.org/ghidra_9.0.1_PUBLIC_20190325.zip
unzip ghidra_9.0.1_PUBLIC_20190325.zip
cd ghidra_9.0.1
sudo add-apt-repository ppa:openjdk-r/ppa 
sudo apt update 
sudo apt install openjdk-11-jdk 
sudo apt install openjdk-11-jre-headless
chmod +x gidraRun
./ghidraRun
```

### 4.electron-vue
```shell
# node v14.15.1
# npm v6.14.8

npm config edit
# registry=https://registry.npm.taobao.org/
# electron_mirror=https://npm.taobao.org/mirrors/electron/

npm install @vue/cli          # @vue/cli 4.5.9
vue create vue-electron-notes # vue 2

npm install electron --save-dev
vue add electron-builder

npm run serve
```

### 5.oracle-jdk8
```shell
sudo add-apt-repository ppa:ts.sch.gr/ppa
sudo apt-get update
sudo apt-get install oracle-java8-installer
```

### 6.xshell
```shell
yum -y install lrzsz
apt install lrzsz
ll
rz # upload
sz # download
```

### 7.firewall centos
```shell
# allow tcp 80
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --reload
```

### 8.nmap
```shell
# show all open port
nmap -sS 192.168.88.43

# test is port open
nmap 192.168.88.43 -p 80
```


### 9.base64
```shell
echo test|base64
echo dGVzdAo=|base64 -d
```