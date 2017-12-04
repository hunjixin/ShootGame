echo "$1"
echo "command args [ $1 ]"

basePath=$(cd "$(dirname "$0")"; pwd)
buildDir="$basePath/build"
help="--help"
build="--build"
init="--init"
clean="--clean"
package="--package"

electronRootDir="$basePath/publishHouse/electron"
electronImageDir="$electronRootDir/dist/image"

ionicRootDir="$basePath/publishHouse/ionic/www" 
ionicImageDir="$ionicRootDir/image" 

webRootDir="$basePath/publishHouse/web"
webImageDir="$basePath/publishHouse/web/image"

testDir="$basePath/spec"

init(){
     npm install
     cd publishHouse/electron
     npm install 
     cd ../ionic
     npm install 
     cd ../..
}

losBuild(){
    createDir $electronImageDir
    createDir $ionicImageDir
    createDir $webImageDir
    createDir $testDir

    echo "build core and copy file"
    node node_modules/webpack/bin/webpack.js

    #electron
    echo "copy electron file"
    cp -f  "$basePath/lib/engine.js"  "$electronRootDir/src/engine.js"  
    cp -f -R  "$basePath/image/."  "$electronRootDir/dist/image/"

    #ionic
    echo "copy ionic file" 
    cp -f  "$basePath/lib/engine.js"  "$ionicRootDir/js/engine.js" 
    cp -f -R  "$basePath/image/."  $ionicImageDir
    
    #web
    echo "copy web file"
    cp -f  "$basePath/lib/engine.js"  "$webRootDir/engine.js"  
    cp -f -R  "$basePath/image/."  $webImageDir

    # test
    cp -f -R "$basePath/lib"  $testDir
   
    echo "transform lib for browser environment"
    python ./transformAmdToCmd.py

    echo "build electron"
    cd ./publishHouse/electron
    node node_modules/webpack/bin/webpack.js
    cd ../..
}
clean(){
    rm -rf "$basePath/lib"
    rm -rf "$basePath/build"

    rm -f  "$electronRootDir/src/engine.js"  
    rm -rf "$electronRootDir/dist"

    rm -f  "$ionicRootDir/js/engine.js" 
    rm -rf  $ionicImageDir

    rm -rf "$basePath/spec/lib"

    rm -r  "$webRootDir/engine.js"  
    rm -rf  $webImageDir
}

package(){
    androidPath="$buildDir/android"
    webPublist="$buildDir/web"
    createDir $androidPath

    cd ./publishHouse/ionic
    echo "ionic cordova build android" 

    ionic cordova build android
    cd ../..
    cp -f -R  "$basePath/publishHouse/ionic/platforms/android/build/outputs/apk"  $androidPath


    cd ./publishHouse/electron
    
    echo "electron-packager .  --electron-version=1.7.9 --no-prune --overwrite --out=$basePath/build"
    electron-packager .  --electron-version=1.7.9 --no-prune --overwrite --out="$basePath/build"
    cd ../..

    cd ./publishHouse/web

    cp -f -R $webRootDir $webPublist
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


