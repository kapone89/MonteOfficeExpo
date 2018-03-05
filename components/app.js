import React, { Component } from 'react';
import { observer } from "mobx-react/native"
// import router from "../stores/router"
import { Platform, StatusBar, BackAndroid } from "react-native"
import { Root } from "native-base";
import Navigator from './routes';

if (Platform.OS === 'android') {
  BackAndroid.addEventListener('hardwareBackPress', function() {
    return router.back();
  });
}

@observer
export default class MonteOffice extends Component {

  render() {
    // const CurrentRoute = router.currentComponent
    return (
      <Root>
        <Navigator/>
      </Root>
    );
  }
}
