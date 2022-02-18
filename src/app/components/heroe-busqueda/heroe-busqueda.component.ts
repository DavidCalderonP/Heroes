import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Heroe } from '../models/heroe';
import { HeroeService } from '../shared/heroe.service';

@Component({
  selector: 'app-heroe-busqueda',
  templateUrl: './heroe-busqueda.component.html',
  styleUrls: ['./heroe-busqueda.component.css']
})
export class HeroeBusquedaComponent implements OnInit {

  public heroes: Heroe[] = [];

  constructor(private router: ActivatedRoute, private data: HeroeService) { }

  ngOnInit(): void {
    this.router.params.subscribe(res=>{
      this.data.getHeroes(res['filter']).then(result=>{
        this.heroes = result;
      })
    });
  }

}
