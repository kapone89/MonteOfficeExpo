import React, { Component } from 'react';
import { observer } from "mobx-react/native"
import router from "../stores/router"
// import monte_theme from "../themes/monte_theme"
import { Platform, StatusBar } from "react-native"
import { Font } from 'expo';
import { StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';

@observer
export default class MonteOffice extends Component {

    render() {
        if ( Platform.OS === 'ios' ) {
          StatusBar.setBarStyle('light-content');
        } else {
          StatusBar.setBackgroundColor('#d6493e');
        }

        const CurrentRoute = router.currentComponent
        return (
          <StyleProvider  style={getTheme()}>
            <CurrentRoute />
          </StyleProvider>
        );
    }
}
