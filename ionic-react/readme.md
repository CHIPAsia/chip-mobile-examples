<div style="display:flex;align-items:center;justify-content:center;gap:10px">
  <a href="https://ionicframework.com/docs/react">
    <img
        alt="ReactJS"
        src="https://img.shields.io/badge/ionic-%233880FF.svg?style=for-the-badge&logo=ionic&logoColor=white"
        width="150"
        style="background-color:#3880FF;padding:2px;border-radius:5px">
  </a>
  <span style="font-size:50px;font-weight:bold;align-items:center;justify-content:center;"> & </span>
  <a href="https://react.dev/">
    <img
      alt="ReactJS"
      src="https://img.shields.io/badge/react-%23000000.svg?style=for-the-badge&logo=react&logoColor=#FF00FF"
      width="150"
      style="background-color:#000000;padding:2px;border-radius:5px">
  </a>
</div>

---

<div style="display:flex;align-items:center;justify-content:center;gap:10px">
  <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
    <b>Preview</b>
    <img src="../docs/videos/sample-ionic-react.gif" width="150" />
  </div>
</div>

### Requirements
Make sure you have following tools installed:
1. `yarn` or `npm`
2. `node` version `>= 18.x.x`
3. `ionic` version `>= 7.x.x`

## Plugins
1. `cordova-plugin-inappbrowser`
2. `capacitor`
3. `typescript`

## Run example
1. Run [api](./api) on your local. 
    - Follow it's instructions on `readme` to run.
2. Run ionic server:
    ```bash
    yarn dev
    or 
    npm run dev
    ``` 
3. Run on simulator/device:
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
