import { fetch } from "fetch";
import { observable } from "mobx"
import lodash from "lodash"
import autobind from "autobind-decorator"

@autobind
export default class Light {
  @observable state = false;

  constructor(params) {
    this.id = params.id;
    this.description = params.description;
    this.state = params.state;
  }

  async toggle() {
    try {
      this.state = !this.state;
      await fetch('http://172.20.0.29:8080/toggle/' + this.id)
      // await this.reloadState()
    } catch (e) {
      console.log(e);
    }
  }

  // doesn't work. maybe request is too quick
  async reloadState() {
    try {
      var response = await fetch('http://172.20.0.29:8080/lights')
      var responseJson = await response.json()
      this.state = lodash.find(responseJson, {id: this.id}).state;
    } catch (e) {
      console.log(e);
    }
  }
}
