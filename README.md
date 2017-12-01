
# shooting game
a shoot game use ECMAScript 6

Using  electron to support windows/linux
Using  ionic to support android/ios
Using  express to support web browser

and finally you can run in all sreen

# Environment

The program is written based on nodejs, so you need to install [nodejs](https://nodejs.org/en/) first   </br>

In order to take account of both the client and the mobile side, the python script is used as the class library conversion in the program,if you want to build the program ,[python](https://www.python.org/download/releases/2.7/) is require

If you want  mobile version, you need to install the [ionic](http://ionicframework.com/getting-started) environment  </br>

If you want  PC version ,you need to install the [electron](https://electronjs.org) environment

# Build 

./build.sh --build </br>

./build.sh --package </br>

Web
----------

cd ./build/web 

node ./server.js

and then you can player in [localhost:3000/index.htmml](localhost:3000/index.htmml)

Android
-------

cd ./build/android 

there will be an android application

PC Client
----------
cd ./build/linx&windows

There will be a  package, The specific package name depends on the current machine, Cross compilation is not yet supported

Example
-------
[https://github.com/hunjixin/ShootGame/settings/](https://github.com/hunjixin/ShootGame/settings/)
</br>



