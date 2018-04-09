import { observable } from 'mobx';
import lodash from 'lodash';

export default class Light {
  @observable state = false;

  constructor(params) {
    this.id = params.id;
    this.description = params.description;
    this.state = params.state;
  }

  toggle = async () => {
    try {
      this.state = !this.state;
      await fetch(`http://172.20.0.29:8080/toggle/${this.id}`);
      // await this.reloadState()
    } catch (e) {
      console.log(e);
    }
  }

  // doesn't work. maybe request is too quick
  reloadState = async () => {
    try {
      const response = await fetch('http://172.20.0.29:8080/lights');
      const responseJson = await response.json();
      this.state = lodash.find(responseJson, { id: this.id }).state;
    } catch (e) {
      console.log(e);
    }
  }
}
