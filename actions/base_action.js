import { observable } from "mobx"

export default class BaseAction {
  @observable state = "initial";
  // @observable result = []; SAMPLE

  // SAMPLE
  // run = async () => {
  //   this.result = await something();
  //   this.state = "success";
  // }

  runSync = async () => {
    await this.run();
    return this;
  }

  runAsync = () => {
    this.run();
    return this;
  }
}
