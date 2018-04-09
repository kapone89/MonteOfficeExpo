import React, { Component } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react/native';
import { Container, Header, Content, Title, Icon, Button, Spinner, Text, Left, Right, Body } from 'native-base';
import { Button as RneButton } from 'react-native-elements';
import roomsStore from '../stores/rooms_store';
import icon from '../services/icon';

const roomsColors = [
  '',
  '#FF851B', // orange
  '#2ECC40', // green
  '#B10DC9', // kebab
  '#0074D9', // blue
  '#FF4136', // red
  '#7FDBFF', // fish tank
];

@observer
export default class RoomsStatus extends Component {
  componentDidMount = () => {
    roomsStore.reload();
  }

  onRoomClick = (room) => {
    roomsStore.selectRoom(room);
    this.props.navigation.navigate('RoomCalendar');
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
                roomsStore.isWorking && <Spinner color="#f95346" />
              }
          {
                !roomsStore.isWorking && roomsStore.availableRooms.map(room => (
                  <RneButton
                    key={room.id}
                    title={room.description}
                    backgroundColor={roomsColors[room.id]}
                    onPress={() => this.onRoomClick(room)}
                  />
                  ))
              }
          {
                !roomsStore.isWorking && roomsStore.availableRooms.length === 0 &&
                <Text>All rooms are occupied at the moment</Text>
              }
        </View>

        <Text>Occupied</Text>

        <View>
          {
                roomsStore.isWorking && <Spinner color="#f95346" />
              }
          {
                !roomsStore.isWorking && roomsStore.occupiedRooms.map(room => (
                  <RneButton
                    key={room.id}
                    title={room.description}
                    backgroundColor="gray"
                    onPress={() => this.onRoomClick(room)}
                  />
                  ))
              }
          {
                !roomsStore.isWorking && roomsStore.occupiedRooms.length === 0 &&
                <Text>All rooms are available</Text>
              }
        </View>
      </Content>
    </Container>
  )
}
