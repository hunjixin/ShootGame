node node_modules/webpack/bin/webpack.js
echo "build success"

basePath=$(cd "$(dirname "$0")"; pwd)

cp -f  "$basePath/lib"  "$basePath/publishHouse/electron/src" /Y
cp -f  "$basePath/lib"  "$basePath/publishHouse/ionic/www/js" /Y
cp -f -R  "$basePath/lib/image"  "$basePath/publishHouse/ionic/img"
cp -f -R  "$basePath/lib/image"  "$basePath/publishHouse/electron/images"

cd ./publishHouse/ionic
ionic build android
cd ../..

cd ./publishHouse/electron
electron-packager .
cd ../..


