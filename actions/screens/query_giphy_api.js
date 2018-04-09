import { observable } from 'mobx';
import { stringify } from 'query-string';
import BaseAction from '../base_action';
import Screen from '../../models/screen';

export default class QueryGiphyApi extends BaseAction {
  @observable result = [];

  run = async ({ query }) => {
    const params = { q: query, api_key: 'dc6zaTOxFJmzC' };
    const response = await fetch(`http://api.giphy.com/v1/gifs/search?${stringify(params)}`);
    const rawResult = await response.json();
    this.result = this.parseGiphyResponse(rawResult);
  }

  parseGiphyResponse = data => data.data.map(img => new Screen({
    id: img.id,
    name: img.slug,
    thumb: img.images.downsized_still.url,
    website: `http://max.kapone89.ml/#${img.images.original.url}`,
  }))
}
