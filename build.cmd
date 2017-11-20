echo "%1%"
echo "command args [ %1% ]"

set basePath=%cd%
echo %basePath%
set help1="--help"
set build="--build"
set init="--init"
set clean="--clean"

if "%1" == %help1% (
  goto:losHelp
) else if   "%1" == %clean% (
  goto:clean
)else if   "%1" == %build% (
  goto:losBuild
)else if   "%1" == %init% (
  goto:losInit
)
GOTO:EOF


:losHelp
    echo "-init   install all pacakge"
    echo "--build  build android\win\linux"
    echo "--clean  clean build files"
GOTO:EOF 

:losBuild
    echo "build core and copy file"
    node node_modules\webpack\bin\webpack.js
    
    rem python .\transformAmdToCmd.py

    copy   "%basePath%\lib\engine.js"  "%basePath%\publishHouse\electron\src\engine.js"   /Y
    copy   "%basePath%\lib\engine.js"  "%basePath%\publishHouse\ionic\www\js\engine.js"   /Y

    copy   "%basePath%\image"  "%basePath%\publishHouse\ionic\www\img\"  /Y
    copy   "%basePath%\image"  "%basePath%\publishHouse\electron\dist\image\"  /Y
    
    echo "package electron"
    cd .\publishHouse\electron
    node node_modules\webpack\bin\webpack.js
    cd ..\..

    cd .\publishHouse\ionic
    echo "ionic cordova build android"
    rem ionic cordova build android
    cd ..\..

    cd .\publishHouse\electron
    
    echo "electron-packager .  --electron-version=1.7.9 --no-prune --overwrite --out=%basePath%\build"
    electron-packager .  --electron-version=1.7.9 --no-prune --overwrite --out="%basePath%\build"
    cd ..\..
GOTO:EOF 

:clean
    rmdir /s /q "%basePath%\lib"
    rmdir /s /q "%basePath%\build"

    del  "%basePath%\publishHouse\electron\src\engine.js"
    rmdir /s /q "%basePath%\publishHouse\electron\image"

    del  "%basePath%\publishHouse\ionic\www\js\engine.js"
    rmdir /s /q "%basePath%\publishHouse\ionic\www\img"

    rmdir /s /q "%basePath%\shotdown-win32-x64"
GOTO:EOF 

:losInit
     npm install
     cd publishHouse\electron
     npm install
     cd ..\ionic
     npm install 
     cd ..\..
GOTO:EOF 