import { observable } from 'mobx';
import { stringify } from 'query-string';
import { DOMParser } from 'xmldom';
import { select } from 'xpath';
import BaseAction from '../base_action';
import Stream from '../../models/stream';

export default class QueryRadiosureApi extends BaseAction {
  @observable result = [];

  run = async ({ query }) => {
    const params = {
      status: 'active',
      search: query,
      pos: 0,
      reset_pos: 0,
    };

    const response = await fetch(`http://www.radiosure.com/rsdbms/search.php?${stringify(params)}`);
    const responseText = await response.text();
    this.result = this.parseRadiosureResponse(responseText);
  }

  parseRadiosureResponse = (response) => {
    const doc = new DOMParser({ errorHandler: {} }).parseFromString(response);
    const nodes = select("//a[contains(@href, 'details.php')]", doc);
    this.searchResults = nodes.map(n => new Stream({
      id: n.attributes[0].nodeValue,
      name: n.textContent,
      genre: n.parentNode.parentNode.childNodes[3].textContent,
      url: (`http://www.radiosure.com/rsdbms/${n.attributes[0].nodeValue}`),
    }));
    return this.searchResults;
  }
}
