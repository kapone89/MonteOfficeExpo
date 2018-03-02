import { StackNavigator } from 'react-navigation';

import NowPlaying from "./now_playing";
import StreamsSearch from "./streams_search";
import ImagesSearch from "./images_search";
import PredefinedScreens from "./predefined_screens";
import ScreenPreview from "./screen_preview";
import LightsSwitcher from "./lights_switcher";
import RoomsStatus from "./rooms_status";
import KitchenLamp from "./kitchen_lamp";
import RoomCalendar from "./room_calendar";

export default StackNavigator({
  "NowPlaying": {screen: NowPlaying},
  "StreamsSearch": {screen: StreamsSearch},
  "ImagesSearch": {screen: ImagesSearch},
  "PredefinedScreens": {screen: PredefinedScreens},
  "ScreenPreview": {screen: ScreenPreview},
  "LightsSwitcher": {screen: LightsSwitcher},
  "RoomsStatus": {screen: RoomsStatus},
  "KitchenLamp": {screen: KitchenLamp},
  "RoomCalendar": {screen: RoomCalendar},
},
{
  initialRouteName: "NowPlaying"
});
