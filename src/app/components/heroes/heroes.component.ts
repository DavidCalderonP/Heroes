import { Component, OnInit } from '@angular/core';
import {Heroe} from "../models/heroe";
import {HeroeService} from "../shared/heroe.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public heroes: Heroe[] = [];
  public filter: string = "";

  constructor(private data: HeroeService) { }

  ngOnInit(): void {
    //this.heroes = this.data.getHeroes();
    this.data.getHeroes().then(res=>{
      console.log("heroes antes de la respuesta", this.heroes)
      this.heroes = res;
      console.log("heroes despues de la respuesta", this.heroes)
    })
  }

  quitarElUltimo(){
    this.heroes = this.heroes.slice(0, this.heroes.length-1)
  }

  filtrar(event: string){
    this.heroes = this.heroes.filter(x=>x.nombre.toLowerCase().includes(event))
    console.log("evento transmitido")
    this.filter = event;
    console.log(this.filter)
  }
}
