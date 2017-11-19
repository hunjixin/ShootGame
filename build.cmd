node node_modules/webpack/bin/webpack.js
echo "build success"

set basePath=%cd%

copy   "%basePath%/lib"  "%basePath%/publishHouse/electron/src" /Y
copy   "%basePath%/lib"  "%basePath%/publishHouse/ionic/www/js" /Y
copy "%basePath%/lib/image"  "%basePath%/publishHouse/ionic/www/img" /Y
copy "%basePath%/lib/image"  "%basePath%/publishHouse/electron/images" /Y

cd ./publishHouse/ionic
ionic build android
cd ../..

cd ./publishHouse/electron
electron-packager .  --electron-version=1.7.9 --no-prune
cd ../..


