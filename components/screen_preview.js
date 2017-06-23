import React, { Component } from 'react';
import { WebView, TouchableOpacity } from "react-native"
import { observer } from "mobx-react/native"
import { Container, Header, Content, Footer, Button, Icon, Title, Text, Grid, Col, Row, Left, Right, Body } from 'native-base';
import IosTabs from "./ios_tabs";
import ScreenThumbnail from "./screen_thumbnail"
import screensStore from "../stores/screens_store"
import { Button as RneButton } from 'react-native-elements'
import router from "../stores/router"
import icon from '../services/icon'
import Toast from 'react-native-simple-toast';

@observer
export default class ScreenPreview extends Component {
    async setOnTv(tvNo) {
      Toast.show('Wait...');
      await screensStore.chosenScreen.setOnTv(tvNo)
      Toast.show('Done!');
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
                    <Title>Screen preview</Title>
                  </Body>

                  <Right />
              </Header>

              <Content>
                <ScreenThumbnail size={1} screen={screensStore.chosenScreen} />

                <Grid style={{marginTop: 10, height: 170}}>
                  <Row>
                    <Col>
                      <RneButton small borderRadius={5} backgroundColor="#1ec08b" title="Screen #1" onPress={() => {this.setOnTv(1)}} />
                    </Col>
                    <Col>
                      <RneButton small borderRadius={5} backgroundColor="#1ec08b" title="Screen #2" onPress={() => {this.setOnTv(2)}} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <RneButton small borderRadius={5} backgroundColor="#1ec08b" title="Screen #3" onPress={() => {this.setOnTv(4)}} />
                    </Col>
                    <Col>
                      <RneButton small borderRadius={5} backgroundColor="#1ec08b" title="Screen #4" onPress={() => {this.setOnTv(3)}} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <RneButton small borderRadius={5} backgroundColor="#1ec08b" title="The BIG one" onPress={() => {this.setOnTv(5)}} />
                    </Col>
                  </Row>
                </Grid>
              </Content>

              <Footer >
                 <IosTabs/>
             </Footer>
          </Container>
        );
    }
}
