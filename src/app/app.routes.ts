import { Routes } from '@angular/router';
import {Home} from "./components/home/home";
import {Portfolio} from "./components/portfolio/portfolio";
import {Contact} from "./components/contact/contact";

export const routes: Routes = [
  { path: 'portfolio', component: Portfolio },
  { path: 'contact', component: Contact },
  { path: '', component: Home },
];
