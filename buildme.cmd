//ionic build && rd /s /q "android" && npx cap add android && npx cap copy && npx cap open android
npm install @capacitor/android
npm install @capacitor/ios
sudo npm add global cordova-res --unsafe-perm
npm add capacitor-resources
npm add cordova-res --unsafe-perm

=> Appending nvm source string to /Users/andrewsolan/.zshrc
=> Appending bash_completion source string to /Users/andrewsolan/.zshrc
=> You currently have modules installed globally with `npm`. These will no
=> longer be linked to the active version of Node when you install a new node
=> with `nvm`; and they may (depending on how you construct your `$PATH`)
=> override the binaries of modules installed with `nvm`:

/usr/local/lib
├── @ionic/cli@6.16.1
├── capacitor-resources@2.0.5
├── cordova-res@0.15.3
├── n@7.1.0

//npx cap init

ionic build
npx cap add android
npx cap copy
capacitor-resources
//cordova-res android --skip-config --copy
npx cap open android

ionic build && npx cap add android && npx cap copy && capacitor-resources && cordova-res android --skip-config --copy && npx cap open android

npx cap add ios
npx cap sync ios
npx cap open ios



