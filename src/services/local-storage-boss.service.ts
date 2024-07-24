import { Injectable } from '@angular/core';
import { Obj } from '../assets/Obj';

@Injectable({
  providedIn: 'root'
})

//handles all local storage interactions
export class LocalStorageBossService {

  constructor() { }
  currentItems: Obj[] = [];

  //gets current content
  getCurrent() {
    if (localStorage.getItem("data")) {
      let raw: string = localStorage.getItem("data")!;
      this.currentItems = JSON.parse(raw); 
    }
    console.log(this.currentItems);
  }

  //edits the saved entries
  update() {
    localStorage.setItem("data", JSON.stringify(this.currentItems));
    this.getCurrent();
  }

  //Sends all entries
  sync() {
    return this.currentItems;
  }

  //adds entry to list and then adds it to the storage
  add(obj: Obj) {
    this.currentItems.push(obj);
    this.update();
  }

  //removes entry from the list and then updates the storage
  remove(obj: Obj) {
    for (let index = 0; index < this.currentItems.length; index++) {
      if (this.currentItems[index].courseCode == obj.courseCode) {
        this.currentItems.splice(index, 1);
      }
    }
    this.update()
  }
}
