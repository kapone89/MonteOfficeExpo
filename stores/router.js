import { observable, computed } from "mobx"
import lodash from "lodash"
import autobind from "autobind-decorator"

import NowPlaying from "../components/now_playing";
import StreamsSearch from "../components/streams_search";
import ImagesSearch from "../components/images_search";
import PredefinedScreens from "../components/predefined_screens";
import ScreenPreview from "../components/screen_preview";
import LightsSwitcher from "../components/lights_switcher"
import RoomsStatus from "../components/rooms_status"
import KitchenLamp from "../components/kitchen_lamp"
import RoomCalendar from "../components/room_calendar"

const routes = {
  "/": NowPlaying,
  "/streams_search": StreamsSearch,
  "/images_search": ImagesSearch,
  "/predefined_screens": PredefinedScreens,
  "/screen_preview": ScreenPreview,
  "/lights_switcher": LightsSwitcher,
  "/rooms_status": RoomsStatus,
  "/kitchen_lamp": KitchenLamp,
  "/room_calendar": RoomCalendar,
}

@autobind
class Router {
  @observable stack = []

  constructor() {
    this.stack.push("/")
  }

  @computed get currentRoute() {
    return this.stack[this.stack.length - 1]
  }

  @computed get currentComponent() {
    return routes[this.currentRoute]
  }

  go(route) {
    if (this.currentRoute != route) {
      this.stack.push(route);
    }
  }

  back(){
    if (this.stack.length > 1) {
      this.stack.pop()
      return true
    } else {
      return false
    }
  }
}

const router = new Router()
export default router
