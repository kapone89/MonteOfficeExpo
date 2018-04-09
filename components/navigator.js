import { StackNavigator } from 'react-navigation';

import NowPlaying from './now_playing';
import StreamsSearch from './streams_search';
import ImagesSearch from './images_search';
import PredefinedScreens from './predefined_screens';
import ScreenPreview from './screen_preview';
import LightsSwitcher from './lights_switcher';
import RoomsStatus from './rooms_status';
import KitchenLamp from './kitchen_lamp';
import RoomCalendar from './room_calendar';


const Navigator = StackNavigator(
  {
    '/': { screen: NowPlaying },
    '/streams_search': { screen: StreamsSearch },
    '/images_search': { screen: ImagesSearch },
    '/predefined_screens': { screen: PredefinedScreens },
    '/screen_preview': { screen: ScreenPreview },
    '/lights_switcher': { screen: LightsSwitcher },
    '/rooms_status': { screen: RoomsStatus },
    '/kitchen_lamp': { screen: KitchenLamp },
    '/room_calendar': { screen: RoomCalendar },
  },
  {
    initialRouteName: '/',
    headerMode: 'none',
  },
);

export default Navigator;
