import {Injectable, signal} from '@angular/core';

export interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  images: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {

  public projects = signal<PortfolioProject[]>([]);

  public loadProjects(){
    return new Promise<void>(resolve => {
      fetch('projects.json')
        .then(response => response.json())
        .then(data => {
          this.projects.set(data as PortfolioProject[]);
          resolve()
        });
    });

  }

}
