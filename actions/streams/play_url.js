import { sample, startsWith } from 'lodash';
import BaseAction from '../base_action';
import GetUrlsFromRadiosurePage from './get_urls_from_radiosure_page';
import GetStreamUrlsFromPlaylistUrl from './get_stream_urls_from_playlist_url';

export default class PlayUrl extends BaseAction {
  run = async ({ url }) => {
    if (startsWith(url, 'http://www.radiosure.com')) {
      await this.playRadiosure(url);
    } else if (/\.(pls|m3u|asx)$/gi.exec(url)) {
      await this.playPlaylistUrl(url);
    } else {
      await this.playStreamUrl(url);
    }
  }

  playRadiosure = async (radiosurePageUrl) => {
    const urls = (await GetUrlsFromRadiosurePage.run({ radiosurePageUrl })).result;
    const url = this.autoChooseUrl(urls.toJS());
    this.run({ url });
  }

  playPlaylistUrl = async (playlistUrl) => {
    const urls = (await GetStreamUrlsFromPlaylistUrl.run({ playlistUrl })).result;
    const url = this.autoChooseUrl(urls.toJS());
    this.playStreamUrl(url);
  }

  playStreamUrl = async (streamUrl) => {
    await fetch('http://172.20.0.35:8080/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        volume: 80,
        address: streamUrl,
      }),
    });
  }

  autoChooseUrl = urlsArray =>
    sample(urlsArray)
}
