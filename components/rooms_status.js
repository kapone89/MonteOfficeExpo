import React, { Component } from 'react';
import { View } from "react-native"
import { observer } from "mobx-react/native"
import { Container, Header, Content, Footer, Title, Icon, Button, Spinner, Card, CardItem, Text, Left, Right, Body } from 'native-base';
import { Button as RneButton } from 'react-native-elements'
import roomsStore from "../stores/rooms_store"
import { List, Item, ItemContent, ItemText, Toggle } from "carbon-native"
import icon from '../services/icon'
import Toast from "../services/toast";

const rooms_colors = [
  "",
  "#FF851B", // orange
  "#2ECC40", // green
  "#B10DC9", // kebab
  "#0074D9", // blue
  "#FF4136", // red
  "#7FDBFF", // fish tank
]

@observer
export default class RoomsStatus extends Component {
  componentDidMount(){
    roomsStore.reload()
  }

  onRoomClick(room) {
    roomsStore.selectRoom(room)
    this.props.navigation.navigate('RoomCalendar')
  }

  render(){
    return (
      <Container>
          <Header>
              <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                    <Icon name={icon('arrow-back')} />
                </Button>
              </Left>

              <Body>
                <Title>Rooms status</Title>
              </Body>

              <Right>
                <Button transparent onPress={roomsStore.reload} >
                    <Icon name={icon('refresh')} />
                </Button>
              </Right>
          </Header>

          <Content>
            <Text>Available</Text>

            <View>
              {
                roomsStore.isWorking && <Spinner color="#f95346"/>
              }
              {
                !roomsStore.isWorking && roomsStore.availableRooms.map((room) => {
                  return (
                    <RneButton
                      key={room.id}
                      title={room.description}
                      backgroundColor={rooms_colors[room.id]}
                      onPress={() => this.onRoomClick(room)}
                    />
                  )
                })
              }
              {
                !roomsStore.isWorking && roomsStore.availableRooms.length == 0 &&
                <Text>All rooms are occupied at the moment</Text>
              }
            </View>

            <Text>Occupied</Text>

            <View>
              {
                roomsStore.isWorking && <Spinner color="#f95346"/>
              }
              {
                !roomsStore.isWorking && roomsStore.occupiedRooms.map((room) => {
                  return (
                    <RneButton
                      key={room.id}
                      title={room.description}
                      backgroundColor="gray"
                      onPress={() => this.onRoomClick(room)}
                    />
                  )
                })
              }
              {
                !roomsStore.isWorking && roomsStore.occupiedRooms.length == 0 &&
                <Text>All rooms are available</Text>
              }
            </View>
          </Content>
      </Container>
    )
  }
}
