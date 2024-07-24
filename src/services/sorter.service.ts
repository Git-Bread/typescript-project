import { Injectable } from '@angular/core';
import { Obj } from '../assets/Obj';

@Injectable({
  providedIn: 'root'
})
export class SorterService {
  constructor() { }
  simpleSort(val : number, obj: Obj[]) {
    let simpleSort = obj;
    switch (val) {
        case 0:
            simpleSort.sort((a,b) => (a.courseCode > b.courseCode) ? 1 : ((b.courseCode > a.courseCode) ? -1 : 0));
            break;
        case 2:
            simpleSort.sort((a,b) => (a.level > b.level) ? 1 : ((b.level > a.level) ? -1 : 0));
            break;
        case 3:
          simpleSort.sort((a,b) => (a.progression > b.progression) ? 1 : ((b.progression > a.progression) ? -1 : 0));
          break;
        case 4:
            simpleSort.sort((a,b) => (a.courseName > b.courseName) ? 1 : ((b.courseName > a.courseName) ? -1 : 0));
            break;
        case 5:
          simpleSort.sort((a,b) => (a.points < b.points) ? 1 : ((b.points < a.points) ? -1 : 0));
          break;
        case 7:
          simpleSort.sort((a,b) => (a.subject > b.subject) ? 1 : ((b.subject > a.subject) ? -1 : 0));
          break;
    }
    return simpleSort;
  }
}
