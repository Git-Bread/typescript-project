import { afterNextRender, Component } from '@angular/core';
import { dataFetcher } from "../../services/data-fetcher.service"
import { SorterService } from '../../services/sorter.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Obj } from '../../assets/Obj';
import { SearcherService } from '../../services/searcher.service';
import { LocalStorageBossService } from "../../services/local-storage-boss.service"

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
  mobile: boolean = false;
  storedMatches: string[] = [];

  //form setup
  formHandle = new FormGroup({
    input: new FormControl("", Validators.required)
  })
  
  constructor(private dataHandler : dataFetcher, private sorter : SorterService, private searcher : SearcherService, private localStorageBoss : LocalStorageBossService) {

    //depreciated tech, implemented to be able to split one row into two for better mobile compatability, will not work unless the html table structure is thrown out the window.
    //since rows seem to be hardlocked, pity i wasted some time ;(
    //kept it for proof of concept, when worked togheter with *ngIf you can dynamicly filter or change html
    afterNextRender(() => {
      if (window.screen.width < 600) { // 768px portrait
        this.mobile = true;
        console.log('window.innerHeight', window.innerHeight);
      }
    })
  }

  //due to loading shenanigans
  ngAfterContentInit() {
    setTimeout(() => {
      this.getStorage();
    }, 300);
  }


  //initial data import and category identification
  ngOnInit() {
    //gets the data via datahandler service
    this.dataHandler.getData().subscribe((data) => {
      this.content = data;
      this.contentArchive = this.content;

      //runs when data is fetched to get all categories in separate array, not the most elegant but im out of ideas
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
    });
  }

  //calls the sorting service on searchbar change
  sort(num: number){
    this.content = this.sorter.simpleSort(num, this.content);
  }

  //calls the search service, it also need to know if a filter is being used to narrow down the search. The default value of "no-filter" is 9999 since i had trouble getting it to
  //0 without messing up the for loop to populate the table. 
  search(){
    //makes current content equal to inital content or filtered content to reset everything so that the search dosent exclude previus "non-searches"
    if (this.filter != 9999) {
      this.content = this.filteredItems;

      //searchtext - initial data - option number for sort filters - filtered/no filter - current data
      this.content = this.searcher.searchSort(this.formHandle.value.input!,  this.contentArchive, this.options, true, this.content);
    }
    else {
      this.content = this.contentArchive;
      this.content = this.searcher.searchSort(this.formHandle.value.input!,  this.contentArchive, this.options, false, this.content);
    }
  }

  //filters the current table and returns the filtered items
  filterSearch() {
    this.filteredItems = [];
    this.content = this.contentArchive;
    for (let i = 0; i < this.content.length; i++) {
      if (this.content[i].subject == this.subjects[this.filter]) {
        this.filteredItems.push(this.content[i]);
      }
    }
    this.content = this.filteredItems;
  }

  //adds to local host
  localAdd(obj : Obj) {
    this.localStorageBoss.add(obj);
    this.getStorage();
  }

  //removes from localhost
  localRemove(obj : Obj) {
    this.localStorageBoss.remove(obj);
    this.getStorage();
  }

  //gets current local storage entries and finds them in the content list and changes their property to marked so the html can distinguish them
  getStorage() {
    let storedItems: Obj[] = []; 
    storedItems = this.localStorageBoss.sync();
    for (let index = 0; index < this.content.length; index++) {
      let match = false;
      for (let yndex = 0; yndex < storedItems.length; yndex++) {
        if (this.content[index].courseCode == storedItems[yndex].courseCode) {
          match = true;
        }
      }
      if (match == true) {
        this.content[index].match = true;
      }
      else {
        this.content[index].match = false;
      }
    }
  }
}
