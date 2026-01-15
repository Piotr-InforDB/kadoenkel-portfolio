import {Component, HostListener, signal} from '@angular/core';

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {

  public paths = signal<string[]>([
    'portfolio/1.jpg',
    'portfolio/2.jpg',
    'portfolio/3.jpg',
    'portfolio/4.jpg',
    'portfolio/5.jpg',
    'portfolio/6.jpg',
    'portfolio/7.jpg',
    'portfolio/8.jpg',
    'portfolio/9.jpg',
    'portfolio/10.jpg',
    'portfolio/11.jpg',
    'portfolio/12.jpg',
    'portfolio/13.jpg',
    'portfolio/14.jpg',
    'portfolio/15.jpg',
    'portfolio/16.jpg',
    'portfolio/17.jpg',
    'portfolio/18.jpg',
    'portfolio/19.jpg',
    'portfolio/20.jpg',
    'portfolio/21.jpg',
    'portfolio/22.jpg',
    'portfolio/23.jpg',
    'portfolio/24.jpg',
    'portfolio/25.jpg',
    'portfolio/26.jpg',
    'portfolio/27.jpg',
  ])
  public images_heights: Record<string, number> = {};

  public columns = signal<string[][]>([])
  public column_width = signal<number>(0)

  async ngOnInit() {
    this.init();
  }
  async init(){
    const columns_changed = this.calculateColumns();
    if(columns_changed){
      await this.calculateImages();
    }
  }

  private calculateColumns(): boolean{
    let columns = [];

    for(let i = 0; i < Math.ceil(Math.round(window.innerWidth / 300)); i++){
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

    //Iterate through all paths, and keep placing them in the smallest column
    for(const path of this.paths()){
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
