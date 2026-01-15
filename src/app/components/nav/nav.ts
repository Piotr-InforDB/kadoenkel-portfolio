import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {

  private router = inject(Router)


  async openPage(page: string){
    await this.router.navigate([page]);
  }


}
