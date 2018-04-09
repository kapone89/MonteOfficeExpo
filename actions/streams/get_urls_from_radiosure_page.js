import { observable } from 'mobx';
import { DOMParser } from 'xmldom';
import { select } from 'xpath';
import { map } from 'lodash';
import BaseAction from '../base_action';

export default class GetUrlsFromRadiosurePage extends BaseAction {
  @observable result = [];

  run = async ({ radiosurePageUrl }) => {
    const response = await fetch(radiosurePageUrl);
    const responseText = await response.text();
    const doc = new DOMParser({ errorHandler: {} }).parseFromString(responseText);
    const nodes = select("//tr[contains(.//td, 'Source ')]//a", doc);
    this.result = map(nodes, 'textContent').filter(x => x.length > 4);
  }
}
