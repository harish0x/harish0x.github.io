---
title : Config node mcu
tags: [IoT, Config]
comment: true
style: border
color: dark
description: Config you NodeMcu v3 CH340G for MAC(OS).
---

# Get started With NodeMcu V3 CH340G (Mac os)
*This is for NodeMcu v3 CH Type version*

----
![NodeMCU](/posts/img/IoT_Nodemcu/1_6eyBKauM_5Msp0M8ZmlWaA.jpg)

First, you have to connect the NodeMcu board to your Mac and install the CH driver on your Mac (Link given below)

http://www.wch.cn/downloads/CH341SER_MAC_ZIP.html

After installing the driver restart your mac , check the driver were installed correctly

---

>> ls/dev/tty.wchusbserial*

---

Now , configure Arduino IDE , Open Arduino IDE > select Preference , paste the Given link in the "Additional Board Mangers Urls:"
https://arduino.esp8266.com/stable/package_esp8266com_index.json

![aud](/posts/img/IoT_Nodemcu/1_ViEFW1iCFuufRr9MSZ8CiA.png)

Now open Board Manager , Search for esp8266 install your favorite version (in this I have already installed it)

![adu_bo](/posts/img/IoT_Nodemcu/1_1ILW2RB4GED5o-Ea23ZXog%20(1).png)

Now select Board Type as Generic ESP8266 Module and connect nodeMcu board , Get your hands dirt :)
