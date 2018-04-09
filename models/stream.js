import PlayUrl from '../actions/streams/play_url';

export default class Stream {
  constructor(params) {
    this.id = params.id;
    this.name = params.name;
    this.genre = params.genre;
    this.url = params.url;
  }

  play = async () => {
    await PlayUrl.run({ url: this.url });
  }
}
