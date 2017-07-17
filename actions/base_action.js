import { observable, autorun } from "mobx";
import { at } from "lodash";

export default class BaseAction {
  @observable error = null;
  @observable state = "idle";
  @observable reactionCallback = null;

  // @observable result = []; SAMPLE

  // SAMPLE
  // run = async () => {
  //   this.result = await something();
  //   this.state = "success";
  // }

  onError = (error) => {
    console.log(error);
    this.error = error;
    this.state = "failed";
  }

  take = (...attrs) => {
    return at(this, attrs);
  }

  react = (callback) => {
    autorun(() => callback(this));
  }

  static async run(params) {
    const action = new this();
    action.state = "running";
    await action.run(params);
    action.state = "success";
    return action;
  }

  static async runFailsafe(params) {
    const action = new this();
    try {
      action.state = "running";
      await action.run(params);
      action.state = "success";
    } catch (e) {
      action.onError(e);
    }
    return action;
  }

  static runAsync(params) {
    const action = new this();
    action.state = "running";
    action.run(params).then(() => {
      action.state = "success";
    }).catch(action.onError);
    return action;
  }
}
