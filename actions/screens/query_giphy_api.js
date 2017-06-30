import BaseAction from "../base_action";
import { observable } from "mobx"

export default class QueryGiphyApi extends BaseAction {
  @observable result = [];

  constructor({query}) {
    super();
    this.query = query;
  }

  run = async () => {
    try {
      const params = {q: this.query, api_key: "dc6zaTOxFJmzC"}
      this.state = "working";
      const response = await fetch('http://api.giphy.com/v1/gifs/search?' + stringify(params))
      this.result = await response.json()
      this.state = "success";
    } catch (e) {
      this.state = "error";
    }
  }
}
