import BaseAction from "../base_action";
import { observable } from "mobx"
import { DOMParser } from 'xmldom';
import { select } from 'xpath';
import { map } from "lodash";

export default class GetUrlsFromRadiosurePage extends BaseAction {
  @observable result = [];

  run = async ({radiosurePageUrl}) => {
    this.state = "working"

    var response = await fetch(radiosurePageUrl)
    var responseText = await response.text()
    var doc = new DOMParser({errorHandler: {}}).parseFromString(responseText);
    var nodes = select("//tr[contains(.//td, 'Source ')]//a", doc);
    this.result = map(nodes, "textContent").filter((x) => {return x.length > 4});

    this.state = "success";
  }
}
