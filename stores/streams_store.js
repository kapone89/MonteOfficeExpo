import { observable } from 'mobx';
import Stream from '../models/stream';
import QueryRadiosureApi from '../actions/streams/query_radiosure_api';

const predefined = [
  new Stream({
    id: 1, name: 'Yodeling', genre: 'Funny', url: 'https://dl.dropboxusercontent.com/s/mpht1mvcw8pxotl/National%20Switzerland%20%20Anthem-%20Yodeling.mp3',
  }),
  new Stream({
    id: 2, name: 'Jazz24', genre: 'Jazz', url: 'http://icy1.abacast.com:80/kplu-jazz24aac-64',
  }),
  new Stream({
    id: 3, name: 'Friday Songs Compilation', genre: 'Funny', url: 'https://dl.dropboxusercontent.com/u/1298391/sounds/friday_vol1.mp3',
  }),
  new Stream({
    id: 4, name: 'Piosenki z lektorem Radia Zet', genre: 'Funny', url: 'https://dl.dropboxusercontent.com/u/1298391/sounds/piosenki_z_lektorem.mp3',
  }),
];

class StreamsStore {
  @observable searchResults = [];
  @observable state = 'idle';

  constructor() {
    this.predefined = predefined;
  }

  search = (query) => {
    QueryRadiosureApi.runAsync({ query }).react((action) => {
      [this.searchResults, this.state] = action.take('result', 'state');
    });
  }
}

const streamsStore = new StreamsStore();
export default streamsStore;
