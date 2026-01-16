import { Routes } from '@angular/router';
import {Home} from "./components/home/home";
import {Portfolio} from "./components/portfolio/portfolio";
import {Contact} from "./components/contact/contact";
import {Project} from "./components/project/project";

export const routes: Routes = [
  { path: 'portfolio', component: Portfolio },
  { path: 'portfolio/project/:id', component: Project },
  { path: 'contact', component: Contact },
  { path: '', component: Home },
];
