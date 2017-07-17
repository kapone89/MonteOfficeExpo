import { observable } from "mobx";
import { at } from "lodash";

export default class BaseAction {
  @observable error = null;
  @observable state = "idle";

  // @observable result = []; SAMPLE

  // SAMPLE
  // run = async () => {
  //   this.result = await something();
  //   this.state = "success";
  // }

  onError = (error) => {
    this.error = error;
  }

  take = (...attrs) => {
    return at(this, attrs);
  }

  static async run(params) {
    const action = new this();
    await action.run(params);
    return action;
  }

  static async runFailsafe(params) {
    const action = new this();
    try {
      await action.run(params);
    } catch (e) {
      action.onError(e);
    }
    return action;
  }

  static runAsync(params) {
    const action = new this();
    console.log(this, action);
    action.run(params).catch(action.onError);
    return action;
  }
}
