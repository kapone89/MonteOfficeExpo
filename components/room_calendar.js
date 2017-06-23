import React, { Component } from 'react';
import { WebView, TouchableOpacity, View } from "react-native"
import { observer } from "mobx-react/native"
import { observable } from "mobx"
import { Container, Header, Content, Footer, Button, Icon, Title, Text, Grid, Col, Row, Left, Right, Body } from 'native-base';
import IosTabs from "./ios_tabs";
import roomsStore from "../stores/rooms_store"
import router from "../stores/router"
import icon from '../services/icon'
import Toast from 'react-native-simple-toast';

@observer
export default class RoomCalendar extends Component {
    @observable calHeight = 0;

    componentDidMount() {
      console.log(roomsStore);
    }
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
                  <Title>{roomsStore.chosenRoom.description} room calendar</Title>
                </Body>

                <Right />
              </Header>

              <Content onLayout={(event) => { this.calHeight = event.nativeEvent.layout.height }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <WebView source={{uri: roomsStore.chosenRoom.getCalendarUri()}} style={{height: this.calHeight}}/>
                </View>
              </Content>

              <Footer >
                 <IosTabs/>
             </Footer>
          </Container>
        );
    }
}
