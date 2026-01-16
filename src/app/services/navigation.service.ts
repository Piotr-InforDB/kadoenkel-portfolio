import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class NavigationService {

  private router = inject(Router);

  public async openPage(page: string){
    await this.router.navigate([page]);
  }

}
