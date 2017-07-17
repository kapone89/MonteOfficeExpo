import BaseAction from "../base_action";
import { observable } from "mobx"
import { stringify } from 'query-string';
import { fetch } from "fetch";
import { DOMParser } from 'xmldom';
import { select } from 'xpath';
import Stream from "../../models/stream"

export default class QueryRadiosureApi extends BaseAction {
  @observable result = [];

  run = async ({query}) => {
    this.state = "working"

    let params = {
      status: "active",
      search: query,
      pos: 0,
      reset_pos: 0,
    }

    var response = await fetch('http://www.radiosure.com/rsdbms/search.php?' + stringify(params))
    var responseText = await response.text()
    this.result = this.parseRadiosureResponse(responseText);

    this.state = "success";
  }

  parseRadiosureResponse = (response) => {
    var doc = new DOMParser({errorHandler: {}}).parseFromString(response)
    var nodes = select("//a[contains(@href, 'details.php')]", doc)
    return this.searchResults = nodes.map((n) => {
      return new Stream({
        id: n.attributes[0].nodeValue,
        name: n.textContent,
        genre: n.parentNode.parentNode.childNodes[3].textContent,
        url: ("http://www.radiosure.com/rsdbms/" + n.attributes[0].nodeValue),
      })
    })
  }
}
