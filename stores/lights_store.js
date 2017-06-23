import lodash from "lodash"
import { fetch } from "fetch";
import { observable } from "mobx"
import { stringify } from 'query-string';
import Light from "../models/light"

const kitchenLampColors = [
  {
    "name": "Red",
    "code": "rgba(215, 44, 44, 0.7)",
    "id": 1
  }, {
    "name": "White cold",
    "code": "white",
    "id": 2,
    "inverse_text": true
  }, {
    "name": "White warm",
    "code": "rgba(255, 244, 229, 1)",
    "id": 3,
    "inverse_text": true
  }, {
    "name": "Green",
    "code": "rgba(0, 255, 0, 0.7)",
    "id": 4
  }, {
    "name": "Blue",
    "code": "rgba(0, 0, 255, 0.7)",
    "id": 5
  }, {
    "name": "Purple",
    "code": "rgba(209, 103, 196, 0.7)",
    "id": 6
  }, {
    "name": "Sky",
    "code": "rgba(95, 127, 246, 0.7)",
    "id": 7
  }
]

class LightsStore {
  @observable lights = [];
  @observable isWorking = false;

  constructor() {
    this.kitchenLampColors = kitchenLampColors;
  }

  async reload() {
    try {
      this.isWorking = true
      var response = await fetch('http://172.20.0.29:8080/lights')
      var responseJson = await response.json()
      this.lights = responseJson.map((light) => {
        return new Light({id: light.id, description: light.description, state: light.state})
      })
      this.isWorking = false
    } catch (e) {
      this.isWorking = false
      console.log(e);
    }
  }

  async turnOffAll() {
    try {
      await fetch('http://172.20.0.29:8080/turn_off')
    } catch (e) {
      console.log(e);
    }
  }

  async turnOnCommon() {
    try {
      var common = [23, 8, 6, 5, 24, 25, 9, 4, 10];
      await this.reload()
      var turnedOff = lodash.reject(this.lights, "state")
      for (let light of turnedOff) {
        if (lodash.includes(common, light.id)) {
          await light.toggle()
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async setKitchenLampColor(colorId) {
    try {
      await fetch('http://172.20.0.29:8080/kitchen/' + colorId)
    } catch (e) {
      console.log(e);
    }
  }
}

const lightsStore = new LightsStore();
export default lightsStore
