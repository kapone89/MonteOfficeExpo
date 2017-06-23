import React, { Component } from 'react';
import { observer } from "mobx-react/native"
import { Container, Header, Content, Footer, Title, Icon, InputGroup, Input, Button, Grid, Col, Spinner, Text, Left, Right, Body } from 'native-base';
import { TouchableHighlight } from "react-native"
import { Item, ItemIcon, ItemContent, ItemText, Note, List } from "carbon-native"
import IosTabs from "./ios_tabs";
import { SearchBar } from 'react-native-elements'
import streamsStore from "../stores/streams_store"
import router from "../stores/router"
import icon from '../services/icon'
import Toast from 'react-native-simple-toast';

@observer
export default class StreamsSearch extends Component {
    searchStreamsDelayed(query) {
      clearTimeout(this.streamsSearchTimeout);
      this.streamsSearchTimeout = setTimeout(() => {
        streamsStore.search(query)
      }, 1000);
    }

    async play(stream) {
      Toast.show('Wait...');
      await stream.play();
      Toast.show('Done!');
    }

    render() {
        return (
          <Container theme={this.props.theme}>
              <Header searchBar rounded>
                <Body>
                  <InputGroup>
                      <Icon name={icon('search')} />
                      <Input placeholder="Find radio online" onChangeText={(x) => this.searchStreamsDelayed(x)} />
                      <Icon name={icon('musical-notes')} />
                  </InputGroup>
                </Body>
                <Button transparent onPress={router.back}>
                    <Text>Back</Text>
                </Button>
              </Header>

              <Content keyboardShouldPersistTaps="always">
                {
                  streamsStore.isWorking && <Spinner color="#f95346"/>
                }

                {
                  !streamsStore.isWorking && <List>
                    {
                      streamsStore.searchResults.map((stream) => {
                        return (
                          <Item key={stream.id} onPress={() => { this.play(stream) }}>
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
                }
              </Content>

              <Footer >
                 <IosTabs/>
             </Footer>
            </Container>
        );
    }
}
