import React, { Component } from 'react';
import { View } from "react-native"
import { observer } from "mobx-react/native"
import { Container, Header, Content, Footer, Button, Title, Spinner, Grid, Col, Card, CardItem, Text, Icon, Left, Right, Body, H1 } from 'native-base';
import { Range } from 'carbon-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Item, ItemIcon, ItemContent, ItemText, Note, List } from "carbon-native"
import IosTabs from "./ios_tabs";
import nowPlayingStore from "../stores/now_playing_store"
import streamsStore from "../stores/streams_store"
import router from "../stores/router"
import icon from '../services/icon'
import Toast from 'react-native-simple-toast';

@observer
export default class NowPlaying extends Component {
    componentDidMount() { nowPlayingStore.reload() }

    changeVolumeDelayed(newVolume) {
      clearTimeout(this.volumeChangeTimeout);
      this.volumeChangeTimeout = setTimeout(() => {
        nowPlayingStore.changeVolume(parseInt(newVolume * 10) * 10);
      }, 1000);
    }

    async playPredefined(stream) {
      Toast.show('Wait...');
      await stream.play();
      Toast.show('Done!');
      await nowPlayingStore.reload()
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
                    <Title>Now playing</Title>
                  </Body>

                  <Right>
                    <Button transparent onPress={() => { router.go("/streams_search") }}>
                        <Icon name={icon('search')} />
                    </Button>
                  </Right>
              </Header>

              <Content>
                <Card>
                    {
                      nowPlayingStore.isWorking && <View>
                        <CardItem header>
                            <Text>Reloading...</Text>
                        </CardItem>

                        <CardItem>
                            <Spinner color="#f95346"/>
                        </CardItem>
                      </View>
                    }

                    {
                      !nowPlayingStore.isWorking && <View>
                        <CardItem header>
                            <Text>Stream info</Text>
                        </CardItem>

                        <CardItem>
                          <Body>
                            <H1>{nowPlayingStore.nowPlayingName}</H1>
                            <Text>{nowPlayingStore.nowPlayingUrl}</Text>
                          </Body>
                        </CardItem>

                        <CardItem header>
                          <Body>
                            <Text>Volume</Text>
                          </Body>
                        </CardItem>

                        <CardItem>
                          <Body>
                            <Range
                              onValueChange={(v) => this.changeVolumeDelayed(v)}
                              value={nowPlayingStore.volume / 100}
                            />
                          </Body>
                        </CardItem>
                      </View>
                    }

                    <View>
                      <CardItem header>
                          <Text>Predefined streams</Text>
                      </CardItem>

                      <List>
                        {
                          streamsStore.predefined.map((stream) => {
                            return (
                              <Item key={stream.id} onPress={() => this.playPredefined(stream)}>
                                <ItemIcon>
                                  <Icon name={icon('play')}/>
                                </ItemIcon>
                                <ItemContent>
                                  <ItemText>{stream.name}</ItemText>
                                  <Note>{stream.genre}</Note>
                                </ItemContent>
                              </Item>
                            )
                          })
                        }
                      </List>
                    </View>
               </Card>
              </Content>

              <Footer >
                 <IosTabs/>
             </Footer>
          </Container>
        );
    }
}
