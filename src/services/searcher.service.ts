import { Injectable } from '@angular/core';
import { Obj } from '../assets/Obj';

@Injectable({
  providedIn: 'root'
})

//crude search service, works on alot of includes and conditionals, might be the best solution but i sure hope not
export class SearcherService {

  constructor() { }
  searchSort(search : string, obj: Obj[], mode: number, filtered: boolean, altObj: Obj[]) {
    let searchSort;

    //sets which object array it will use to search depends on filter mode or not
    if (!filtered) {
      searchSort = obj; 
    }
    else {
      searchSort = altObj;
    }

    //long ugly switch which alot of ||
    switch(mode) {
      case 0:
        searchSort = searchSort?.filter((a) => 
          a.courseCode.toLowerCase().includes(search.toLowerCase()) ||  
          a.level.toLowerCase().includes(search.toLowerCase()) ||
          a.progression.toLowerCase().includes(search.toLowerCase()) ||
          a.courseName.toLowerCase().includes(search.toLowerCase()) ||
          a.points.toString().includes(search.toLowerCase()) ||
          a.subject.toString().includes(search.toLowerCase()));
        break;
      case 1:
        searchSort = searchSort?.filter((a) => 
          a.courseCode.toLowerCase().includes(search.toLowerCase()));
        break;
      case 2:
        searchSort = searchSort?.filter((a) => 
          a.level.toLowerCase().includes(search.toLowerCase()));
        break;
      case 3:
        searchSort = searchSort?.filter((a) => 
          a.progression.toLowerCase().includes(search.toLowerCase()));
        break;
      case 4:
        searchSort = searchSort?.filter((a) => 
          a.courseName.toLowerCase().includes(search.toLowerCase()));
        break;
      case 5:
        //numbers need to be handled diffrently otherwise you will get "30" when you search for "3" since "30" contains a "3"
        searchSort = searchSort?.filter((a) => a.points == parseFloat(search));
        break;
      case 6:
        searchSort = searchSort?.filter((a) => 
          a.subject.toLowerCase().includes(search.toLowerCase()));
        break;
    }
    return searchSort;
  }
}
