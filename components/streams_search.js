import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import { Container, Header, Content, Icon, Input, Button, Spinner, Text, Item } from 'native-base';
import { Item as CnItem, ItemIcon, ItemContent, ItemText, Note, List } from 'carbon-native';
import streamsStore from '../stores/streams_store';
import icon from '../services/icon';
import Toast from '../services/toast';

@observer
export default class StreamsSearch extends Component {
  searchStreamsDelayed = (query) => {
    clearTimeout(this.streamsSearchTimeout);
    this.streamsSearchTimeout = setTimeout(() => {
      streamsStore.search(query);
    }, 1000);
  }

  play = async (stream) => {
    Toast.show('Wait...');
    try {
      await stream.play();
      Toast.show('Done!');
    } catch (e) {
      Toast.show('Error!');
    }
  }

  render = () => {
    const isWorking = streamsStore.state === 'running';
    return (
      <Container style={{ backgroundColor: '#ffffff' }}>
        <Header searchBar rounded>
          <Item>
            <Icon active name={icon('search')} />
            <Input placeholder="Find radio online" onChangeText={x => this.searchStreamsDelayed(x)} />
            <Icon active name={icon('musical-notes')} />
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
            !isWorking &&
              <List>
                {
                  streamsStore.searchResults.map(stream => (
                    <CnItem key={stream.id} onPress={() => { this.play(stream); }}>
                      <ItemIcon>
                        <Icon name={icon('play')} />
                      </ItemIcon>
                      <ItemContent>
                        <ItemText>{stream.name}</ItemText>
                        <Note>{stream.genre}</Note>
                      </ItemContent>
                    </CnItem>
                    ))
                }
              </List>
           }
        </Content>
      </Container>
    );
  }
}
