---
title : WebDecode-Write-Up
tags: [PicoCTF, Web, Security]
comment: true
style: border
color: dark
description: webdecode-writeUp_web_easy.
---


## It's an Easy challange from picoctf webDecode
#


![image1](/posts/img/WebDecode/webdecode-1.png)

### in Description itself telling we able to getting the falg is inspect area 
![image1](/posts/img/WebDecode/Description-2.png)

### let open the url ,and open the inspect area and look for the flag , and navigate every pages  in the website 

![image1](/posts/img/WebDecode/3-home-page.png)

### inspecting ....
![image1](/posts/img/WebDecode/inspect-4.png)

### haan ....! we can see some scrambled words in there its look base 64 encode string 

![image1](/posts/img/WebDecode/about-5.png)

### using cyberchef we can decode the base 64 string , haan .. here we got the flag !!! 

![image1](/posts/img/WebDecode/6-64decode.png)