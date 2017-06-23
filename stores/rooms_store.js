import lodash from "lodash"
import { fetch } from "fetch";
import { observable, computed } from "mobx"
import autobind from "autobind-decorator"
import Room from "../models/room"

@autobind
class RoomsStore {
  @observable rooms = [];
  @observable isWorking = false;
  @observable chosenRoom = null;

  @computed get availableRooms() {
    return lodash.reject(this.rooms, "occupied")
  }

  @computed get occupiedRooms() {
    return lodash.filter(this.rooms, "occupied")
  }

  async reload() {
    try {
      this.isWorking = true
      var response = await fetch('http://172.20.0.29:8080/move')
      var responseJson = await response.json()
      this.rooms = responseJson.map((room) => {
        return new Room({id: room.id, description: room.description, last_detection : room.last_detection  })
      })
      this.isWorking = false
    } catch (e) {
      this.isWorking = false
      console.log(e);
    }
  }

  selectRoom(room) {
    this.chosenRoom = room;
    console.log(this.chosenRoom);
  }
}

const roomsStore = new RoomsStore();
export default roomsStore
