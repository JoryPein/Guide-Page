# Windows snippet

## NETWORK

### netsh

```cmd
ipconfig
netsh interface show interface
netsh interface ipv4 set address WLAN static 192.168.113.113 255.255.255.0 192.168.113.224
```


## os
### cmd
```cmd
rem 显示“控制面板－区域设置属性－区域设置”选项视窗
rundll32.exe shell32.dll,Control_RunDLL intl.cpl,,

rem 日期和时间属性/日期和时间
timedate.cpl

rem fonts
explorer c:\windows\fonts\

rem admintools    
control admintools

rem system panel
control system
```

### burpsuite
```shell
start javaw -noverify -javaagent:.\burp-loader-x-Ai.jar -Xmx2048m -jar .\burpsuite_pro.jar
```