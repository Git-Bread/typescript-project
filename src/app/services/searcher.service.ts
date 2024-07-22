import { Injectable } from '@angular/core';
import { Obj } from '../Obj';

@Injectable({
  providedIn: 'root'
})
export class SearcherService {

  constructor() { }
  searchSort(search : string, obj: Obj[]) {
    let searchSort = obj;
    console.log(search);
    searchSort = searchSort.filter((a) => 
    a.courseCode.toLowerCase().includes(search.toLowerCase()) ||  
    a.level.toLowerCase().includes(search.toLowerCase()) ||
    a.progression.toLowerCase().includes(search.toLowerCase()) ||
    a.courseName.toLowerCase().includes(search.toLowerCase()) ||
    a.points.toString().includes(search.toLowerCase()) ||
    a.subject.toString().includes(search.toLowerCase()));
    return searchSort;
  }
}
