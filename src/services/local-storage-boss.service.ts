import { Injectable } from '@angular/core';
import { Obj } from '../assets/Obj';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageBossService {

  constructor() { }
  currentItems: Obj[] = [];

  getCurrent() {
    if (localStorage.getItem("data")) {
      let raw: string = localStorage.getItem("data")!;
      this.currentItems = JSON.parse(raw); 
    }
  }

  update() {
    localStorage.setItem("data", JSON.stringify(this.currentItems));
    this.getCurrent();
  }

  sync() {
    return this.currentItems;
  }

  add(obj: Obj) {
    this.currentItems.push(obj);
    this.update();
  }

  remove(obj: Obj) {
    for (let index = 0; index < this.currentItems.length; index++) {
      if (this.currentItems[index].courseCode == obj.courseCode) {
        this.currentItems.splice(index, 1);
      }
    }
    this.update()
  }
}
