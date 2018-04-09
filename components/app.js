import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import { Root } from 'native-base';
import Navigator from './routes';

@observer
export default class MonteOffice extends Component {
  render() {
    return (
      <Root>
        <Navigator />
      </Root>
    );
  }
}
