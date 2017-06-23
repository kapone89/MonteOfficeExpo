import lodash from "lodash"
import { fetch } from "fetch";
import { DOMParser } from 'xmldom';
import { select } from 'xpath';
import { stringify } from 'query-string';
import playlistParser from "playlist-parser"

export default class Stream {
  constructor(params) {
    this.id = params.id;
    this.name = params.name;
    this.genre = params.genre;
    this.url = params.url;
    this.radiosure_page = params.radiosure_page;
  }

  async play() {
    if (this.url) {
      await this.playUrl(this.url)
    } else {
      await this.playRadiosure(this.radiosure_page)
    }
  }

  async playUrl(streamUrl) {
    try {
      await fetch('http://172.20.0.35:8080/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          volume: 80,
          address: streamUrl,
        })
      })
    } catch (e) {
      console.log(e);
    }
  }

  async playRadiosure(radiosurePage) {
    try {
      var response = await fetch(radiosurePage)
      var responseText = await response.text()
      var doc = new DOMParser({errorHandler: {}}).parseFromString(responseText);
      var nodes = select("//tr[contains(.//td, 'Source ')]//a", doc);
      var streamUrls = lodash.map(nodes, "textContent").filter((x) => {return x.length > 4})
      await this.autoChooseStream(streamUrls)
    } catch (e) {
      console.log(e);
    }
  }

  async autoChooseStream(streamsArray) {
    await this.playStream(lodash.sample(streamsArray));
  }

  async playStream(streamUrl) {
    var isPlaylist = /\.(pls|m3u|asx)$/gi.exec(streamUrl)
    if (isPlaylist) {
      await this.playPlaylist(streamUrl, isPlaylist[1].toUpperCase())
    } else {
      await this.playUrl(streamUrl)
    }
  }

  async playPlaylist(streamUrl, type) {
    var response = await fetch(streamUrl);
    var responseText = await response.text()
    var results = playlistParser[type].parse(responseText)
    await this.playUrl(lodash.sample(results).file);
  }
}
