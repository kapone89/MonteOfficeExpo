import React, { Component } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react/native';
import lodash from 'lodash';
import { Container, Header, Content, Button, Icon, Text, Spinner, Input, Item } from 'native-base';
import screensStore from '../stores/screens_store';
import ScreenThumbnail from './screen_thumbnail';
import icon from '../services/icon';

@observer
export default class ImagesSearch extends Component {
  searchImagesDelayed = (query) => {
    clearTimeout(this.imagesSearchTimeout);
    this.imagesSearchTimeout = setTimeout(() => {
      screensStore.search(query);
    }, 1000);
  }

  render = () => {
    const isWorking = screensStore.state === 'running';
    return (
      <Container style={{ backgroundColor: '#ffffff' }}>
        <Header searchBar rounded>
          <Item>
            <Icon active name={icon('search')} />
            <Input placeholder="Find GIFs online" onChangeText={x => this.searchImagesDelayed(x)} />
          </Item>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Text>Back</Text>
          </Button>
        </Header>

        <Content keyboardShouldPersistTaps="always">
          {
                  isWorking && <Spinner color="#f95346" />
                }

          {
                  !isWorking && lodash.chunk(screensStore.searchResults, 3).map(chunk => (
                    <View key={chunk[0].id} style={{ flex: 1, flexDirection: 'row' }}>
                      {
                          chunk.map(screen => (
                            <ScreenThumbnail
                              thumb
                              key={screen.id}
                              screen={screen}
                              size={0.333}
                              onPress={() => { screensStore.selectScreen(screen); this.props.navigation.navigate('ScreenPreview'); }}
                            />
                            ))
                        }
                    </View>
                    ))
                }
        </Content>
      </Container>
    );
  }
}
