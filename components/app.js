import React, { Component } from 'react';
import { observer } from "mobx-react/native"
import router from "../stores/router"
import { Platform, StatusBar } from "react-native"
import { Root } from "native-base";

@observer
export default class MonteOffice extends Component {

    render() {
        const CurrentRoute = router.currentComponent
        return (
          <Root>
            <CurrentRoute />
          </Root>
        );
    }
}
