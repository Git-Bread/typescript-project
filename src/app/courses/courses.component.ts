import { Component } from '@angular/core';
import { dataFetcher } from "../services/data-fetcher.service";
import { SorterService } from '../services/sorter.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Obj } from '../Obj';
import { SearcherService } from '../services/searcher.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  content: Obj[] = [];
  contentArchive: Obj[] = [];

  formHandle = new FormGroup({
    input: new FormControl("", Validators.required)
  })
  
  constructor(private dataHandler : dataFetcher, private sorter : SorterService, private searcher : SearcherService) {}

  ngOnInit() {
    this.dataHandler.getData().subscribe((data) => {
      this.content = data;
      this.contentArchive = this.content;
    });
  }

  sort(num: number){
    this.content = this.sorter.simpleSort(num, this.content);
    console.log("ran sort");
  }

  search(){
    this.content = this.searcher.searchSort(this.formHandle.value.input!,  this.contentArchive);
  }
}
