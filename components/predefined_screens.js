import React, { Component } from 'react';
import { View } from "react-native"
import { observer } from "mobx-react/native"
import { Container, Header, Content, Footer, Button, Icon, Title, List, ListItem, Text, Left, Right, Body } from 'native-base';
import IosTabs from "./ios_tabs";
import router from '../stores/router';
import ScreenThumbnail from "./screen_thumbnail"
import Screen from "../models/screen"
import screensStore from "../stores/screens_store"
import icon from '../services/icon'

@observer
export default class PredefinedScreens extends Component {
    render() {
        return (
          <Container theme={this.props.theme}>
              <Header>
                  <Left>
                    <Button transparent onPress={router.back}>
                        <Icon name={icon('arrow-back')} />
                    </Button>
                  </Left>

                  <Body>
                    <Title>Predefined screens</Title>
                  </Body>

                  <Right>
                    <Button transparent onPress={() => { router.go("/images_search") }}>
                        <Icon name={icon('search')} />
                    </Button>
                  </Right>
              </Header>

              <Content>


                <List>
                  {
                    screensStore.predefined.map((screen) => {
                      return (
                        <View key={screen.id}>
                          <ListItem >
                              <Text>{screen.name}</Text>

                          </ListItem>
                          <ScreenThumbnail thumb screen={screen} size={1} onPress={() => { screensStore.selectScreen(screen); router.go("/screen_preview") }} />
                        </View>
                      )
                    })
                  }
                </List>
              </Content>

              <Footer >
                 <IosTabs/>
             </Footer>
          </Container>
        );
    }
}
