import {Component, inject, OnInit} from '@angular/core';
import {ProjectsService} from "../../services/projects.service";
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio implements OnInit{
  public projects_service = inject(ProjectsService);
  public navigation_service = inject(NavigationService);

  ngOnInit() {
    this.projects_service.loadProjects();
  }

}
