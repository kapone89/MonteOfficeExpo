import React, { Component } from 'react';
import { View } from "react-native"
import { observer } from "mobx-react/native"
import { Container, Header, Content, Footer, Title, Icon, Button, Spinner, Card, CardItem, Text, Left, Right, Body } from 'native-base';
import { Button as RneButton } from 'react-native-elements'
import IosTabs from "./ios_tabs";
import { List, Item, ItemContent, ItemText, Toggle } from "carbon-native"
import router from "../stores/router"
import icon from '../services/icon'
import Toast, { ToastElement } from "../services/toast";
import lightsStore from "../stores/lights_store"

@observer
export default class KitchenLamp extends Component {
  async setColor(colorId) {
    Toast.show('Wait...');
    await lightsStore.setKitchenLampColor(colorId)
    Toast.show('Done!');
  }

  render(){
    return (
      <Container>
          <Header>
            <Left>
              <Button transparent onPress={router.back}>
                  <Icon name={icon('arrow-back')} />
              </Button>
            </Left>

            <Body>
              <Title>Kitchen lamp color</Title>
            </Body>

            <Right />
          </Header>

          <Content>
            <View style={{marginTop: 10}}>
            {
              lightsStore.kitchenLampColors.map((color) => {
                return (
                  <RneButton
                    key={color.id}
                    title={color.name}
                    backgroundColor={color.code}
                    color={color.inverse_text ? "black" : "white"}
                    onPress={() => this.setColor(color.id)}
                  />
                )
              })
            }
            </View>
          </Content>

          <Footer >
             <IosTabs/>
         </Footer>
         <ToastElement />
      </Container>
    )
  }
}
