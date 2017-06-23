import React, { Component } from 'react';
import { observer } from "mobx-react/native"
import { FooterTab, Button, Icon, Text } from 'native-base';
import router from '../stores/router';
import icon from '../services/icon'

@observer
export default class IosTabs extends Component {
    render() {
        return (
          <FooterTab>
            <Button onPress={() => { router.go("/") }}>
                <Icon name={icon('musical-notes')} />
                <Text>Toilet</Text>
            </Button>
            <Button onPress={() => { router.go("/predefined_screens") }}>
                <Icon name={icon('desktop')} />
                <Text>Screens</Text>
            </Button>
            <Button onPress={() => { router.go("/lights_switcher") }}>
                <Icon name={icon('flash')} />
                <Text>Lights</Text>
            </Button>
            <Button onPress={() => { router.go("/rooms_status") }}>
                <Icon name={icon('contacts')} />
                <Text>Rooms</Text>
            </Button>
          </FooterTab>
        );
      }
    }
