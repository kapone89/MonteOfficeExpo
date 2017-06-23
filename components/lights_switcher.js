import React, { Component } from 'react';
import { observer } from "mobx-react/native"
import { Container, Header, Content, Footer, Title, Icon, Button, Spinner, Col, Row, Grid, Left, Right, Body} from 'native-base';
import { Button as RneButton } from 'react-native-elements'
import IosTabs from "./ios_tabs";
import lightsStore from "../stores/lights_store"
import { List, Item, ItemContent, ItemText, Toggle, Badge } from "carbon-native"
import router from "../stores/router"
import icon from '../services/icon'
import Toast from 'react-native-simple-toast';

@observer
export default class LightsSwitcher extends Component {
  componentDidMount(){
    lightsStore.reload()
  }

  async turnOnCommon() {
    Toast.show('Wait...');
    await lightsStore.turnOnCommon()
    Toast.show('Done!');
  }

  async turnOffAll() {
    Toast.show('Wait...');
    await lightsStore.turnOffAll()
    Toast.show('Done!');
  }

  render(){
    return (
      <Container theme={this.props.theme}>
          <Header>
              <Left>
                <Button transparent onPress={router.back}>
                    <Icon name={icon('arrow-back')} />
                </Button>
              </Left>

              <Body>
                <Title>Lights</Title>
              </Body>

              <Right>
                { lightsStore.isWorking &&
                  <Button transparent>
                      <Spinner color="white"/>
                  </Button>
                }
              </Right>
          </Header>

          <Content>
            <Grid style={{marginTop: 10, marginBottom: 15}}>
              <Row>
                <Col>
                  <RneButton small borderRadius={5} backgroundColor="#2ECC40" title="Turn ON common" onPress={this.turnOnCommon} />
                </Col>
                <Col>
                  <RneButton small borderRadius={5} backgroundColor="#FF4136" title="Turn OFF all" onPress={this.turnOffAll} />
                </Col>
              </Row>
            </Grid>

            <List>
              <Item onPress={() => router.go("/kitchen_lamp")}>
                <ItemContent>
                  <ItemText>Kitchen lamp</ItemText>
                  <Badge text="Choose color" color="primary" />
                </ItemContent>
              </Item>
              {
                lightsStore.lights.map((light) => {
                  return (
                    <Item key={light.id}>
                      <ItemContent>
                        <ItemText>{light.description}</ItemText>
                        <Toggle
                          color="danger"
                          onValueChange={light.toggle}
                          value={light.state}
                        />
                      </ItemContent>
                    </Item>
                  )
                })
              }
            </List>
          </Content>

          <Footer >
             <IosTabs/>
         </Footer>
      </Container>
    )
  }
}
