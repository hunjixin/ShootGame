echo "$1"
echo "command args [ $1 ]"

basePath=$(cd "$(dirname "$0")"; pwd)
help="--help"
build="--build"
init="--init"
clean="--clean"
package="--package"

init(){
     npm install
     cd publishHouse/electron
     npm install 
     cd ../ionic
     npm install 
     cd ../..
}

losBuild(){

    androidPath="$basePath/build/android"
    electronImageDir="$basePath/publishHouse/electron/dist/image/"
    testDir="$basePath/test"
    createDir $electronImageDir
    createDir $androidPath
    createDir $testDir

    echo "build core and copy file"
    node node_modules/webpack/bin/webpack.js


    cp -f  "$basePath/lib/engine.js"  "$basePath/publishHouse/electron/src/engine.js"  
    cp -f  "$basePath/lib/engine.js"  "$basePath/publishHouse/ionic/www/js/engine.js" 
    cp -f -R "$basePath/lib"  $testDir
   
    cp -f -R  "$basePath/image/."  "$basePath/publishHouse/ionic/www/image/"
    cp -f -R  "$basePath/image/."  "$basePath/publishHouse/electron/dist/image/"

   # python ./transformAmdToCmd.py

    echo "package electron"
    cd ./publishHouse/electron
    node node_modules/webpack/bin/webpack.js
    cd ../..
}
clean(){
    rm -rf ./lib
    rm -rf ./build
    rm -f ./publishHouse/electron/src/engine.js
    rm -rf ./publishHouse/electron/image

    rm -f ./publishHouse/ionic/www/js/engine.js
    rm -rf ./publishHouse/ionic/www/image
    rm -rf ./publishHouse/electron/dist
    rm -rf ./test/lib
}

package(){

    cd ./publishHouse/ionic
    echo "ionic cordova build android"
    ionic cordova build android
    cd ../..

    cp -f -R  "$basePath/publishHouse/ionic/platforms/android/build/outputs/apk"  $androidPath


    cd ./publishHouse/electron
    
    echo "electron-packager .  --electron-version=1.7.9 --no-prune --overwrite --out=$basePath/build"
    electron-packager .  --electron-version=1.7.9 --no-prune --overwrite --out="$basePath/build"
    cd ../..
}
losHelp(){
    echo "--init   install all pacakge"
    echo "--build  build android/win/linux"
    echo "--clean  clean build files"
}

createDir(){
    if [ ! -d $1 ]
    then
    /bin/mkdir -p $1 >/dev/null 2>&1 && echo "Directory $1 created." ||  echo "Error: Failed to create $1 directory."
    else
    echo  
    fi
}
if [ "$1" = "$help" ] 
then
    losHelp
elif  [ "$1" = "$build" ]
then
    losBuild
elif  [ "$1" = "$package" ] 
then
    package
elif  [ "$1" = "$init" ] 
then
       init
elif  [ "$1" = "$clean" ] 
then
      clean
else
     losHelp
fi


