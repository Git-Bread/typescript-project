import { Component } from '@angular/core';
import { dataFetcher } from "../services/data-fetcher.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Obj } from '../Obj';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  content: Obj[] = [];

  formHandle = new FormGroup({
    input: new FormControl("", Validators.required)
  })
  
  constructor(private dataHandler : dataFetcher) {}

  ngOnInit() {
    this.dataHandler.getData().subscribe((data) => {
      this.content = data;
    });
  }
}
