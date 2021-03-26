# react_native

## camera

### expo-camera

__installation__ : `expo install expo-camera`

__API__ : `import {Camera} from 'expo-camera';`

__static methods__

1. `Camera.isAvailableAsync()`

   - boolean

   - web only use

   - check whether the current device has a camera

   - this is useful for web and simulators cases

   - this isn't influenced by the permission API ( all platforms ) or HTTP usage(in the browser)

   - you will still need to check if the native permission has been accepted.

     ```react
     import { Camera } from 'expo-camera';
     if(await Camera.isAvailbleAsync()){
     
     }
     ```

2. `Camera.getAvailableCameraTypesAsync()`

   - string[]

   - returns a list of camera types `front`, `back`

   - this is useful for desktop browsers which only have front-facing cameras

     ```react
     import {Camera} from 'expo=camera';
     
     const types =await Camera.getAvailableCameraTypesAsync();
     ```

     





https://docs.expo.io/versions/latest/sdk/camera/