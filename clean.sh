echo "$1"
echo "command args [ $1 ]"

basePath=$(cd "$(dirname "$0")"; pwd)
help="--help"
build="--build"
init="--init"
clean="--clean"

init(){
     npm install
     cd publishHouse/electron
     npm install
     cd ../ionic
     npm install 
     cd ../..
}

losBuild(){
    echo "build core and copy file"
    node node_modules/webpack/bin/webpack.js
    
   # python ./transformAmdToCmd.py

    cp -f  "$basePath/lib/engine.js"  "$basePath/publishHouse/electron/src/engine.js"  
    cp -f  "$basePath/lib/engine.js"  "$basePath/publishHouse/ionic/www/js/engine.js" 

    cp -f -R  "$basePath/image/."  "$basePath/publishHouse/ionic/www/img/"
    cp -f -R  "$basePath/image/."  "$basePath/publishHouse/electron/dist/image/"
    
    echo "package electron"
    cd ./publishHouse/electron
    node node_modules/webpack/bin/webpack.js
    cd ../..

    cd ./publishHouse/ionic
    echo "ionic cordova build android"
    #ionic cordova build android
    cd ../..

    cd ./publishHouse/electron
    
    echo "electron-packager .  --electron-version=1.7.9 --no-prune --overwrite --out=$basePath/build"
    electron-packager .  --electron-version=1.7.9 --no-prune --overwrite --out="$basePath/build "
    cd ../..
}
clean(){
    rm -rf ./lib
    rm -rf ./build
    rm -f ./publishHouse/electron/src/engine.js
    rm -rf ./publishHouse/electron/image

    rm -f ./publishHouse/ionic/www/js/engine.js
    rm -rf ./publishHouse/ionic/www/img
}

losHelp(){
    echo "--init   install all pacakge"
    echo "--build  build android/win/linux"
    echo "--clean  clean build files"
}

if [ "$1" = "$help" ] 
then
    losHelp
elif  [ "$1" = "$build" ]
then
    losBuild
elif  [ "$1" = "$init" ] 
then
       init
elif  [ "$1" = "$clean" ] 
then
      clean
else
     losHelp
fi


