import lodash from "lodash"
import { fetch } from "fetch";
import { DOMParser } from 'xmldom';
import { select } from 'xpath';
import { stringify } from 'query-string';
import Stream from "../models/stream"
import { observable } from "mobx"

const predefined = [
  new Stream({id: 1, name: "Yodeling", genre: "Funny", url: "https://dl.dropboxusercontent.com/s/mpht1mvcw8pxotl/National%20Switzerland%20%20Anthem-%20Yodeling.mp3"}),
  new Stream({id: 2, name: "Jazz24", genre: "Jazz", url: "http://icy1.abacast.com:80/kplu-jazz24aac-64"}),
  new Stream({id: 3, name: "Friday Songs Compilation", genre: "Funny", url: "https://dl.dropboxusercontent.com/u/1298391/sounds/friday_vol1.mp3"}),
  new Stream({id: 4, name: "Piosenki z lektorem Radia Zet", genre: "Funny", url: "https://dl.dropboxusercontent.com/u/1298391/sounds/piosenki_z_lektorem.mp3"}),
];

class StreamsStore {
  @observable searchResults = [];
  @observable isWorking = false

  constructor() {
    this.predefined = predefined;
  }

  async search(query) {
    try {
      this.isWorking = true
      let params = {
        status: "active",
        search: query,
        pos: 0,
        reset_pos: 0,
      }

      var response = await fetch('http://www.radiosure.com/rsdbms/search.php?' + stringify(params))
      var responseText = await response.text()
      this.searchResults = this.parseRadiosureResponse(responseText)
      this.isWorking = false
    } catch (e) {
      this.isWorking = false
      console.log(e);
    }
  }

  parseRadiosureResponse(response) {
    var doc = new DOMParser({errorHandler: {}}).parseFromString(response)
    var nodes = select("//a[contains(@href, 'details.php')]", doc)
    return this.searchResults = nodes.map((n) => {
      return new Stream({
        id: n.attributes[0].nodeValue,
        name: n.textContent,
        genre: n.parentNode.parentNode.childNodes[3].textContent,
        radiosure_page: ("http://www.radiosure.com/rsdbms/" + n.attributes[0].nodeValue),
      })
    })
  }
}

const streamsStore = new StreamsStore();
export default streamsStore
