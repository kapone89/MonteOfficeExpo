import React from 'react';
import { StyleProvider } from 'native-base';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import Expo from 'expo';
import getTheme from './native-base-theme/components';
import montePlatform from './native-base-theme/variables/monte_platform';
import MonteOffice from './components/app';

@observer
export default class App extends React.Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({ Roboto: require('native-base/Fonts/Roboto.ttf'), Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf') });
    this.fontsLoaded = true;
  }

  @observable fontsLoaded = false

  render() {
    return (
      this.fontsLoaded &&
        <StyleProvider style={getTheme(montePlatform)}>
          <MonteOffice />
        </StyleProvider>
    );
  }
}
