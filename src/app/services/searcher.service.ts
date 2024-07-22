import { Injectable } from '@angular/core';
import { Obj } from '../Obj';

@Injectable({
  providedIn: 'root'
})
export class SearcherService {

  constructor() { }
  searchSort(search : string, obj: Obj[], mode: number, filtered: boolean, altObj: Obj[]) {
    let searchSort;
    console.log(filtered);
    if (!filtered) {
      searchSort = obj; 
      console.log("normal search");
    }
    else {
      searchSort = altObj;
      console.log("altSearch");
    }
    console.log(searchSort);

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
