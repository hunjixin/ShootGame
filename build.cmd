echo "%1%"
echo "command args [ %1% ]"

set basePath=%cd%
echo %basePath%
set help1="--help"
set build="--build"
set init="--init"
set clean="--clean"
set package="--package"

set electronRootDir=%basePath%\publishHouse\electron
set electronImageDir=%electronRootDir%\dist\image

set ionicRootDir=%basePath%\publishHouse\ionic\www
set ionicImageDir=%ionicRootDir%\image

set webRootDir=%basePath%\publishHouse\web
set webImageDir=%basePath%\publishHouse\web\image\

set testDir=%basePath%\spec\lib

if "%1" == %help1% (
  goto:losHelp
) else if   "%1" == %build% (
  goto:losBuild
) else if   "%1" == %package% (
  goto:losPakage
)else if   "%1" == %clean% (
  goto:clean
)else if   "%1" == %init% (
  goto:losInit
)
GOTO:EOF

:losHelp
    echo "-init   install all pacakge"
    echo "--build  build android\win\linux"
    echo "--package  package android\win\linux"
    echo "--clean  clean build files"
GOTO:EOF 

:losBuild
    IF NOT EXIST "%electronImageDir%" MD  "%electronImageDir%"
    IF NOT EXIST "%ionicImageDir%" MD  "%ionicImageDir%"
    IF NOT EXIST "%testDir%" MD  "%testDir%"
    IF NOT EXIST "%webImageDir%" MD  "%webImageDir%"

    echo "build core and copy file"
    node node_modules\webpack\bin\webpack.js

    ::  m electron
    echo "copy electron file"
    copy  "%basePath%\lib\shotGame.js"  "%electronRootDir%\src\shotGame.js"   
    copy  "%basePath%\image\"  "%electronRootDir%\dist\image\" /Y

    ::  ionic
    echo "copy ionic file" 
    copy  "%basePath%\lib\shotGame.js"  "%ionicRootDir%\js\shotGame.js" 
    copy  "%basePath%\image\"  %ionicImageDir% /Y
    
    ::  web
    echo "copy web file"
    copy  "%basePath%\lib\shotGame.js"  "%webRootDir%\shotGame.js"   
    copy  "%basePath%\image\"  %webImageDir% /Y

    ::  test
    copy "%basePath%\lib"  %testDir% /Y
   
    echo "transform lib for browser environment"
    python .\transformAmdToCmd.py 

    echo "build electron"
    cd .\publishHouse\electron
    node node_modules\webpack\bin\webpack.js
    cd ..\..
GOTO:EOF 

:losPakage
    set androidPath="%buildDir%\android"
    set webPublist="%buildDir%\web"

    cd .\publishHouse\ionic
    echo "ionic cordova build android" 

    ionic cordova build android
    cd ..\..
    copy  "%basePath%\publishHouse\ionic\platforms\android\build\outputs\apk"  %androidPath% /Y


    cd .\publishHouse\electron
    
    echo "electron-packager .  --electron-version=1.7.9 --no-prune --overwrite --out=$basePath\build"
    electron-packager .  --electron-version=1.7.9 --no-prune --overwrite --out="%basePath%\build"
    cd ..\..

    cd .\publishHouse\web

    copy %webRootDir% %webPublist% /Y
GOTO:EOF

:clean
    ::rmdir /s /q "%basePath%\lib"
    ::rmdir /s /q "%basePath%\build"

    del  "%basePath%\publishHouse\electron\src\shotGame.js"
    rmdir /s /q "%basePath%\publishHouse\electron\image"

    del  "%basePath%\publishHouse\ionic\www\js\shotGame.js"
    rmdir /s /q "%basePath%\publishHouse\ionic\www\img"

    rmdir /s /q "%basePath%\shotdown-win32-x64"


    rmdir /s /q  "%basePath%/lib"
    rmdir /s /q  "%basePath%/build"

    del  "%electronRootDir%\src\shotGame.js"  
    rmdir /s /q "%electronRootDir%\dist"

    del  "%ionicRootDir%\js\shotGame.js" 
    rmdir /s /q  %ionicImageDir%

    rmdir /s /q "%basePath%\spec\lib"

    del  "%webRootDir%\shotGame.js"  
    rmdir /s /q  %webImageDir%
GOTO:EOF 

:losInit
     npm install
     cd publishHouse\electron
     npm install 
     cd ..\ionic
     npm install 
     cd ..\..
GOTO:EOF 

:test
   .\node_modules\jasmine\bin\jasmine.js

GOTO:EOF 
