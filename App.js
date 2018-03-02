import React from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  StyleProvider
} from 'native-base';
import {observer} from "mobx-react/native"
import {observable} from "mobx";
import getTheme from './native-base-theme/components';
import monte from './native-base-theme/variables/monte';
import MonteOffice from './components/app';

@observer
export default class App extends React.Component {
  @observable fontsLoaded = false

  async componentWillMount() {
    await Expo.Font.loadAsync({'Roboto': require('native-base/Fonts/Roboto.ttf'), 'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')});
    this.fontsLoaded = true
  }

  render() {
    return (this.fontsLoaded && <StyleProvider style={getTheme(monte)}>
      <MonteOffice />
    </StyleProvider>);
  }
}
