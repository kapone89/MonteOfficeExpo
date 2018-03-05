import React, { Component } from 'react';
import { observer } from "mobx-react/native"
import { Platform, StatusBar, BackAndroid } from "react-native"
import { Root } from "native-base";
import Navigator from './routes';

// if (Platform.OS === 'android') {
//   BackAndroid.addEventListener('hardwareBackPress', function() {
//     return router.back();
//   });
// }

@observer
export default class MonteOffice extends Component {

  render() {
    return (
      <Root>
        <Navigator/>
      </Root>
    );
  }
}
