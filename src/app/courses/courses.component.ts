import { Component } from '@angular/core';
import { dataFetcher } from "../services/data-fetcher.service";
import { SorterService } from '../services/sorter.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Obj } from '../Obj';
import { SearcherService } from '../services/searcher.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  content: Obj[] = [];
  contentArchive: Obj[] = [];
  filteredItems: Obj[] = [];
  options: number = 0;
  subjects: string[] = [];
  filter: number = 9999;

  formHandle = new FormGroup({
    input: new FormControl("", Validators.required)
  })
  
  constructor(private dataHandler : dataFetcher, private sorter : SorterService, private searcher : SearcherService) {}

  ngOnInit() {
    this.dataHandler.getData().subscribe((data) => {
      this.content = data;
      this.contentArchive = this.content;
    });
    for (let index = 0; index < this.content.length; index++) {
      let match = false;
      for (let yndex = 0; yndex < this.subjects.length; yndex++) {
        if (this.content[index].subject == this.subjects[yndex]) {
          match = true;
        }
      }
      if (match == false) {
        this.subjects.push(this.content[index].subject);
      }
    }
  }

  sort(num: number){
    this.content = this.sorter.simpleSort(num, this.content);
    console.log("ran sort");
  }

  search(){
    console.log(this.filter);
    if (this.filter != 9999) {
      console.log(this.filter)
      this.content = this.filteredItems;
      this.content = this.searcher.searchSort(this.formHandle.value.input!,  this.contentArchive, this.options, true, this.content);
    }
    else {
      console.log("ran");
      this.content = this.contentArchive;
      this.content = this.searcher.searchSort(this.formHandle.value.input!,  this.contentArchive, this.options, false, this.content);
    }
  }

  add(obj: any) {
    console.log(obj);
  }

  filterSearch() {
    this.filteredItems = [];
    this.content = this.contentArchive;
    console.log(this.content.length);
    for (let i = 0; i < this.content.length; i++) {
      if (this.content[i].subject == this.subjects[this.filter]) {
        this.filteredItems.push(this.content[i]);
      }
    }
    this.content = this.filteredItems;
  }

}
