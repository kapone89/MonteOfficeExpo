import { observable } from 'mobx';
import { map } from 'lodash';
import playlistParser from 'playlist-parser';
import BaseAction from '../base_action';

export default class GetStreamUrlsFromPlaylistUrl extends BaseAction {
  @observable result = [];

  run = async ({ playlistUrl }) => {
    const extension = /\.(pls|m3u|asx)$/gi.exec(playlistUrl)[1];
    const response = await fetch(playlistUrl);
    const responseText = await response.text();
    const rawResults = playlistParser[extension.toUpperCase()].parse(responseText);
    this.results = map(rawResults, 'file');
  }
}
