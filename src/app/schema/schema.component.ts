import { Component } from '@angular/core';
import { LocalStorageBossService } from '../../services/local-storage-boss.service';
import { Obj } from '../../assets/Obj';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearcherService } from '../../services/searcher.service';
import { SorterService } from '../../services/sorter.service';
import { dataFetcher } from '../../services/data-fetcher.service';

@Component({
  selector: 'app-schema',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './schema.component.html',
  styleUrl: './schema.component.css'
})
export class SchemaComponent {
  savedCourses: Obj[] = [];
  contentArchive: Obj[] = [];

  //form setup
  formHandle = new FormGroup({
    input: new FormControl("", Validators.required)
  })

  constructor(private localStorageBoss : LocalStorageBossService, private searcher : SearcherService, private sorter : SorterService, private dataHandler : dataFetcher) {}


  ngOnInit() {
    this.localStorageBoss.getCurrent();
    this.savedCourses = this.localStorageBoss.sync(); 
  }

  search() {
    this.savedCourses = this.contentArchive;
    this.savedCourses = this.searcher.searchSort(this.formHandle.value.input!,  this.contentArchive, 0, false, this.contentArchive);
  }

  remove(obj: Obj) {
    this.localStorageBoss.remove(obj);
  }

  sort(num: number){
    this.savedCourses = this.sorter.simpleSort(num, this.savedCourses);
  }

  //removes from localhost
  localRemove(obj : Obj) {
    this.localStorageBoss.remove(obj);
    this.savedCourses = this.localStorageBoss.sync(); 
  }
}
