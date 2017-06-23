import React, { Component } from 'react';
import { observer } from "mobx-react/native"
import router from "../stores/router"
import monte_theme from "../themes/monte_theme"
import { Platform, StatusBar } from "react-native"
import { Font } from 'expo';

@observer
export default class MonteOffice extends Component {
  componentDidMount() {
    Font.loadAsync({
        'Roboto_medium': require('../assets/fonts/Roboto_medium.ttf'),
        'Roboto': require('../assets/fonts/Roboto.ttf'),
      });
    }

    render() {
        if ( Platform.OS === 'ios' ) {
          StatusBar.setBarStyle('light-content');
        } else {
          StatusBar.setBackgroundColor('#d6493e');
        }

        const CurrentRoute = router.currentComponent
        return (
          <CurrentRoute theme={monte_theme}/>
        );
    }
}
