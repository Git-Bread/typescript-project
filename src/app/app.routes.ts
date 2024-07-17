import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component'
import { SchemaComponent } from './schema/schema.component';

export const routes: Routes = [
    {path: "", component: CoursesComponent},
    {path: "schema", component: SchemaComponent}
];
