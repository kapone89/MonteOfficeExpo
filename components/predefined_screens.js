import React, { Component } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react/native';
import { Container, Header, Content, Button, Icon, Title, List, ListItem, Text, Left, Right, Body } from 'native-base';
import ScreenThumbnail from './screen_thumbnail';
import screensStore from '../stores/screens_store';
import icon from '../services/icon';

@observer
export default class PredefinedScreens extends Component {
  render = () => (
    <Container style={{ backgroundColor: '#ffffff' }}>
      <Header>
        <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name={icon('arrow-back')} />
          </Button>
        </Left>

        <Body>
          <Title>Predefined screens</Title>
        </Body>

        <Right>
          <Button transparent onPress={() => { this.props.navigation.navigate('ImagesSearch'); }}>
            <Icon name={icon('search')} />
          </Button>
        </Right>
      </Header>

      <Content>


        <List>
          {
                    screensStore.predefined.map(screen => (
                      <View key={screen.id}>
                        <ListItem >
                          <Text>{screen.name}</Text>

                        </ListItem>
                        <ScreenThumbnail thumb screen={screen} size={1} onPress={() => { screensStore.selectScreen(screen); this.props.navigation.navigate('ScreenPreview'); }} />
                      </View>
                      ))
                  }
        </List>
      </Content>
    </Container>
  )
}
