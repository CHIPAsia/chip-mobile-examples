<div align="center">
  <a href="https://ionicframework.com/docs/react">
    <img
        alt="ReactJS"
        src="https://img.shields.io/badge/ionic-%233880FF.svg?style=for-the-badge&logo=ionic&logoColor=white"
        width="150"
        style="background-color:#3880FF;padding:2px;border-radius:5px;">
  </a><img src="https://img.shields.io/badge/+-%23FFFFFF.svg?style=for-the-badge" width="50" />
  <a href="https://react.dev/">
    <img
      alt="ReactJS"
      src="https://img.shields.io/badge/react-%23000000.svg?style=for-the-badge&logo=react&logoColor=#FF00FF"
      width="150"
      style="background-color:#000000;padding:2px;border-radius:5px">
  </a>
</div>

---

<div align="center">
  <div>
    <img src="../docs/videos/sample-ionic-react.gif" width="150" />
  </div>
  <b>Preview</b>
</div>

### Requirements
Make sure you have following tools installed:
1. `yarn` or `npm`
2. `node` version `>= 18.x.x`
3. `ionic` version `>= 7.x.x`, you can refer to [ionic website](https://ionicframework.com/docs/cli) for installation
 
Note: Make sure you have basic knowledge on mobile app development.

## Plugins
1. `cordova-plugin-inappbrowser`
2. `capacitor`
3. `typescript`

## Run example
1. Run [api](./api) on your local.
    - `cd api` to navigate to `api` folder.
    - Follow its instructions on `readme` to run on your local machine.
    - This API service needed to be up and running before you run the example app.
2. Run on simulator/device:
    ```bash
    // iOS:
    yarn run:ios
    or 
    npm run run:ios

    // Android:
    yarn run:android
    or 
    npm run run:android
    ```

## Troubleshoots
### Android
1. Make sure your have the emulator installed
2. If you encounter an error like this
    ```
    GET http://localhost:7001/ net::ERR_CONNECTION_REFUSED
    ```
    you need to run to forward the port to the host machine (which is your local machine):
    ```
    adb reverse tcp:7001 tcp:7001
    ```

### iOS
1. Make sure your have installed XCode, cocoapods.
2. If you encounter an error like this
    ```
    [ERROR] No devices or emulators found
    ```
    make sure when you run this command, you received list of simulators that available:
    ```
    xcrun simctl list
    ```
    if you are not, you need to set up on your XCode.
3.  If you encounter an error like this, open your XCode to update your iOS simulator
    ```
    CoreSimulator is out of date.
    ```
4. If you encounter an error like this
    ```
    error: unable to open configuration settings file
    ```
    please make sure you've installed cocoapods and your **pods** installations are success.
