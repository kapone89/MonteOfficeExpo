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
import Toast, { ToastElement } from "../services/toast";

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
      try {
        await stream.play();
        Toast.show('Done!');
      } catch (e) {
        Toast.show('Error!');
      }
    }

    render() {
        const isWorking = streamsStore.state === "running";
        return (
          <Container>
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
                  isWorking && <Spinner color="#f95346"/>
                }

                {
                  !isWorking && <List>
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
             <ToastElement />
            </Container>
        );
    }
}
