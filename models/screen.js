import lodash from "lodash"
import { fetch } from "fetch";
import { stringify } from 'query-string';

export default class Screen {
  constructor(params) {
    this.id = params.id;
    this.name = params.name;
    this.website = params.website;
    this.thumb = params.thumb;
  }

  async setOnTv(tvNo) {
    try {
      await fetch('http://172.20.0.29:8080/tv/' + tvNo, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: this.website,
        })
      })
      await this.refreshOnTv(tvNo)
    } catch (e) {
      console.log(e);
    }
  }

  async refreshOnTv(tvNo) {
    try {
      await fetch('http://172.20.0.29:8080/tv-reload/' + tvNo)
    } catch (e) {
      console.log(e);
    }
  }
}
