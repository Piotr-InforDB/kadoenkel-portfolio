import {Component, effect, HostListener, inject, OnInit, signal, untracked} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PortfolioProject, ProjectsService} from "../../services/projects.service";


@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project implements OnInit{

  private route = inject(ActivatedRoute);
  private projects_service = inject(ProjectsService);

  public project = signal<PortfolioProject | null>(null);
  public columns = signal<string[][]>([])
  public column_width = signal<number>(0)

  public images_heights: Record<string, number> = {};

  constructor() {
    // effect(() => {
    //   this.projects_service.projects();
    //   untracked(() => {
    //     this.init();
    //   })
    // })
  }

  async ngOnInit() {
    await this.init();
  }
  async init(){
    const id = this.route.snapshot.params['id'];

    await this.projects_service.loadProjects();
    const project = this.projects_service.projects().find(project => project.id === Number(id)) || null;
    this.project.set(project);

    console.log(this.project())

    const columns_changed = this.calculateColumns();
    if(columns_changed){
      await this.calculateImages();
    }
  }

  private calculateColumns(): boolean{
    let columns = [];

    for(let i = 0; i < Math.ceil(Math.round(window.innerWidth / 500)); i++){
      columns.push([]);
    }

    this.column_width.set(Math.round(window.innerWidth / columns.length));

    if(this.columns().length !== columns.length){
      this.columns.set(columns);
      return true;
    }

    return false;
  }
  private async calculateImages(){
    if(!this.project()){
      return;
    }

    console.log(this.project());

    //Iterate through all paths, and keep placing them in the smallest column
    for(const path of this.project()!.images){
      let smallest_column_index = 0;
      let smallest_column_height = Infinity;

      for(let i = 0; i < this.columns().length; i++){
        let column_size = await this.getColumnHeight(this.columns()[i]);
        if(column_size < smallest_column_height){
          smallest_column_height = column_size;
          smallest_column_index = i;
        }
      }

      this.columns().at(smallest_column_index)?.push(path);
    }

  }

  private async getColumnHeight(column: string[]): Promise<number>{
    let total = 0;
    for(const path of column){
      total += await this.getImageHeight(path);
    }
    return total;

  }
  private getImageHeight(path: string): Promise<number>{
    return new Promise((resolve, reject) => {
      if(this.images_heights[path]){
        resolve(this.images_heights[path]);
        return;
      }

      const img = new Image();
      img.src = path;
      img.onload = () => {
        this.images_heights[path] = (img.height / img.width) * this.column_width();
        resolve((img.height / img.width) * this.column_width());
      };
      img.onerror = (err) => {
        reject(err);
      };
    });
  }

  @HostListener('window:resize')
  async onResize() {
    await this.init()
  }
}
