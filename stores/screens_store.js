import lodash from "lodash"
import Screen from "../models/screen"
import { observable } from "mobx"
import { stringify } from 'query-string';
import QueryGiphyApi from "../actions/screens/query_giphy_api";

const predefined = [
  new Screen({id: 1, name: "cdos.png", website: "http://max.kapone89.ml/#https://raw.githubusercontent.com/kapone89/MonteOfficeExpo/static/screen/cdos.png" }),
  new Screen({id: 2, name: "cdos_2.png", website: "http://max.kapone89.ml/#https://raw.githubusercontent.com/kapone89/MonteOfficeExpo/static/screen/cdos_2.png" }),
  new Screen({id: 3, name: "monte.png", website: "http://max.kapone89.ml/#https://raw.githubusercontent.com/kapone89/MonteOfficeExpo/static/screen/monte.png" }),
  new Screen({id: 4, name: "monte_dark.png", website: "http://max.kapone89.ml/#https://raw.githubusercontent.com/kapone89/MonteOfficeExpo/static/screen/monte_dark.png" }),
  new Screen({id: 5, name: "monte_red.png", website: "http://max.kapone89.ml/#https://raw.githubusercontent.com/kapone89/MonteOfficeExpo/static/screen/monte_red.png" }),
  new Screen({id: 6, name: "monte_red_2.png", website: "http://max.kapone89.ml/#https://raw.githubusercontent.com/kapone89/MonteOfficeExpo/static/screen/monte_red_2.png" }),
  new Screen({id: 7, name: "wifi.png", website: "http://max.kapone89.ml/#https://raw.githubusercontent.com/kapone89/MonteOfficeExpo/static/screen/wifi.png" }),
  new Screen({id: 8, name: "wifi_dark.png", website: "http://max.kapone89.ml/#https://raw.githubusercontent.com/kapone89/MonteOfficeExpo/static/screen/wifi_dark.png" }),
  new Screen({id: 9, name: "Classic Programmers Paintings", website: "http://cpp.kapone89.ml" }),
]

class ScreensStore {
  @observable chosenScreen = null;
  @observable searchResults = []
  @observable state = "idle";

  constructor() {
    this.predefined = predefined
  }

  search = (query) => {
    QueryGiphyApi.runAsync({query}).react((action) => {
      [this.searchResults, this.state] = action.take("result", "state");
    });
  }

  selectScreen(screen) {
    this.chosenScreen = screen;
  }
}

const screensStore = new ScreensStore();
export default screensStore
