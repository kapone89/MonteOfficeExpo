import BaseAction from "../base_action";
import { observable } from "mobx"
import { DOMParser } from 'xmldom';
import { select } from 'xpath';
import { map } from "lodash";

export default class GetStreamUrlsFromPlaylistUrl extends BaseAction {
  @observable result = [];

  run = async ({playlistUrl}) => {
    this.state = "working"

    const extension = /\.(pls|m3u|asx)$/gi.exec(playlistUrl)[1];
    const response = await fetch(streamUrl);
    const responseText = await response.text()
    const rawResults = playlistParser[extension.toUpperCase()].parse(responseText)
    this.results = map(rawResults, "file");

    this.state = "success";
  }
}
