node node_modules/webpack/bin/webpack.js
echo "build success"

set basePath=%cd%

copy   "%basePath%/lib"  "%basePath%/publishHouse/electron/src" /Y
copy   "%basePath%/lib"  "%basePath%/publishHouse/ionic/www/js" /Y
copy "%basePath%/lib/image"  "%basePath%/publishHouse/ionic/img"
copy "%basePath%/lib/image"  "%basePath%/publishHouse/electron/images"

cd ./publishHouse/ionic
ionic build android
cd ../..

cd ./publishHouse/electron
electron-packager .
cd ../..


