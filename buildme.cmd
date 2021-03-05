//ionic build && rd /s /q "android" && npx cap add android && npx cap copy && npx cap open android

ionic build
npx cap add android
npx cap copy
capacitor-resources
cordova-res android --skip-config --copy
npx cap open android


