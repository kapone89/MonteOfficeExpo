import { observable } from "mobx"
import { fetch } from "fetch";

class NowPlayingStore {
  @observable nowPlayingUrl = null;
  @observable nowPlayingName = null;
  @observable isWorking = false;
  @observable volume = 80;

  constructor() {
    this.streamDataTmp = null;
  }

  async reload() {
    try {
      this.isWorking = true
      var response = await fetch('http://172.20.0.35:8080/')
      var responseJson = await response.json()
      this.nowPlayingUrl = responseJson.address;
      this.volume = responseJson.volume;
      this.nowPlayingName = await this.fetchStreamMeta(responseJson.address)
      this.isWorking = false
    } catch (e) {
      this.isWorking = false
      console.log(e);
    }
  }

  fetchStreamMeta(address) {
    return new Promise((resolve, reject) => {
      this.streamDataTmp = new XMLHttpRequest();
      this.streamDataTmp.open('GET', address);
      this.streamDataTmp.send()
      setTimeout(() => {
        var name = this.streamDataTmp.getResponseHeader("icy-name");
        var result = name ? name : "File"
        this.streamDataTmp.abort()
        resolve(result)
      }, 500);
    })
  }

  async changeVolume(newVolume) {
    try {
      await fetch('http://172.20.0.35:8080/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          volume: newVolume,
          address: this.nowPlayingUrl,
        })
      })
    } catch (e) {
      console.log(e);
    }
  }


}

const nowPlayingStore = new NowPlayingStore();
export default nowPlayingStore
