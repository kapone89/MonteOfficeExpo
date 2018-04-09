import { TabNavigator, StackNavigator } from 'react-navigation';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';

import icon from '../services/icon';

import NowPlaying from './now_playing';
import StreamsSearch from './streams_search';
import ImagesSearch from './images_search';
import PredefinedScreens from './predefined_screens';
import ScreenPreview from './screen_preview';
import LightsSwitcher from './lights_switcher';
import RoomsStatus from './rooms_status';
import KitchenLamp from './kitchen_lamp';
import RoomCalendar from './room_calendar';

const tabsIcons = {
  NowPlaying: icon('musical-notes'),
  PredefinedScreens: icon('desktop'),
  LightsSwitcher: icon('flash'),
  RoomsStatus: icon('contacts'),
};

const TabsStack = TabNavigator(
  {
    NowPlaying: { screen: NowPlaying, navigationOptions: { title: 'Toilet', showTab: false } },
    PredefinedScreens: { screen: PredefinedScreens, navigationOptions: { title: 'TVs' } },
    LightsSwitcher: { screen: LightsSwitcher, navigationOptions: { title: 'Lights' } },
    RoomsStatus: { screen: RoomsStatus, navigationOptions: { title: 'Rooms' } },
  },
  {
    initialRouteName: 'NowPlaying',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        return <Ionicons name={tabsIcons[routeName]} color={tintColor} size={25} />;
      },
    }),
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      activeTintColor: 'red',
      activeBackgroundColor: '#ffffff',
      inactiveTintColor: '#000000',
      inactiveBackgroundColor: '#ffffff',
      style: {
        backgroundColor: '#ffffff',
      },
    },
    swipeEnabled: true,
    animationEnabled: true,
  },
);


const RootStack = StackNavigator({
  Tabs: { screen: TabsStack },
  StreamsSearch: { screen: StreamsSearch },
  ImagesSearch: { screen: ImagesSearch },
  ScreenPreview: { screen: ScreenPreview },
  KitchenLamp: { screen: KitchenLamp },
  RoomCalendar: { screen: RoomCalendar },
}, {
  mode: 'modal',
  headerMode: 'none',
});

export default RootStack;
