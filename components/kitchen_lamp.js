import React, { Component } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react/native';
import { Container, Header, Content, Title, Icon, Button, Left, Right, Body } from 'native-base';
import { Button as RneButton } from 'react-native-elements';
import icon from '../services/icon';
import Toast from '../services/toast';
import lightsStore from '../stores/lights_store';

@observer
export default class KitchenLamp extends Component {
  setColor = async (colorId) => {
    Toast.show('Wait...');
    await lightsStore.setKitchenLampColor(colorId);
    Toast.show('Done!');
  }

  render = () => (
    <Container style={{ backgroundColor: '#ffffff' }}>
      <Header>
        <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name={icon('arrow-back')} />
          </Button>
        </Left>

        <Body>
          <Title>Kitchen lamp color</Title>
        </Body>

        <Right />
      </Header>

      <Content>
        <View style={{ marginTop: 10 }}>
          {
              lightsStore.kitchenLampColors.map(color => (
                <RneButton
                  key={color.id}
                  title={color.name}
                  backgroundColor={color.code}
                  color={color.inverse_text ? 'black' : 'white'}
                  onPress={() => this.setColor(color.id)}
                />
                ))
            }
        </View>
      </Content>
    </Container>
  )
}
