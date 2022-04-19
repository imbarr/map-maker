import { IconsList } from './constants/icons';
export class State {
  constructor() {
    this.filteredMarkers = [];
    this.tags = [];
    this.selectedTags = [];
    this.icons = [...IconsList];
    this.pageStates = [];
  }

  addNewTags(tags) {
    let newTags = tags.filter(t => !this.tags.includes(t));
    this.tags.push(...newTags);
    this.tags.sort();
  }

}