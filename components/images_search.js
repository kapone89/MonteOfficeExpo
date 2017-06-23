import React, { Component } from 'react';
import { WebView, TouchableOpacity, View } from "react-native"
import { observer } from "mobx-react/native"
import { Container, Header, Content, Footer, Button, Icon, Title, List, ListItem, Text, Spinner, Input, InputGroup, Left, Right, Body } from 'native-base';
import IosTabs from "./ios_tabs";
import { SearchBar } from 'react-native-elements'
import screensStore from "../stores/screens_store"
import ScreenThumbnail from "./screen_thumbnail"
import Screen from "../models/screen"
import lodash from "lodash"
import router from "../stores/router"
import icon from '../services/icon'

@observer
export default class ImagesSearch extends Component {
    searchImagesDelayed(query) {
      clearTimeout(this.imagesSearchTimeout);
      this.imagesSearchTimeout = setTimeout(() => {
        screensStore.search(query)
      }, 1000);
    }

    render() {
        var screen = new Screen({ name: "Classic Programmers Paintings", website: "http://cpp.kapone89.ml" })
        return (
          <Container theme={this.props.theme}>
              <Header searchBar rounded>
                <Body>
                  <InputGroup>
                      <Icon name={icon('search')} />
                      <Input placeholder="Find GIFs online" onChangeText={(x) => this.searchImagesDelayed(x)} />
                  </InputGroup>
                </Body>
                <Button transparent onPress={router.back}>
                    <Text>Back</Text>
                </Button>
              </Header>

              <Content keyboardShouldPersistTaps="always">
                {
                  screensStore.isWorking && <Spinner color="#f95346"/>
                }

                {
                  !screensStore.isWorking && lodash.chunk(screensStore.searchResults, 3).map((chunk) => {
                    return (
                      <View key={chunk[0].id} style={{flex: 1, flexDirection: 'row'}}>
                        {
                          chunk.map((screen) => {
                            return (
                              <ScreenThumbnail
                                thumb
                                key={screen.id}
                                screen={screen}
                                size={0.333}
                                onPress={() => { screensStore.selectScreen(screen); router.go("/screen_preview") }}
                              />
                            )
                          })
                        }
                      </View>
                    )
                  })
                }
              </Content>

              <Footer >
                 <IosTabs/>
             </Footer>
          </Container>
        );
    }
}
