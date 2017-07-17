import lodash from "lodash"
import { fetch } from "fetch";
import Screen from "../models/screen"
import { observable } from "mobx"
import { stringify } from 'query-string';
import QueryGiphyApi from "../actions/screens/query_giphy_api";

const predefined = [
  new Screen({id: 1, name: "wifi credentials", website: "http://freakone.pl/monte/wifi.html" }),
  new Screen({id: 2, name: "instafeed", website: "http://freakone.pl/monte/4.html" }),
  new Screen({id: 3, name: "Classic Programmers Paintings", website: "http://cpp.kapone89.ml" }),
  new Screen({id: 4, name: "monte logo", website: "http://jsbin.com/wokovo", thumb: "http://i.imgur.com/P9zGgt0.png" }),
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
