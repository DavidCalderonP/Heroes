import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HeroeService} from "../shared/heroe.service";
import {Heroe} from "../models/heroe";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  public heroe: Heroe;

  constructor(private activatedRoute: ActivatedRoute, private data: HeroeService) {
    console.log(this.heroe)
    this.activatedRoute.params.subscribe(result=>{
      this.data.getHeroe(result['id']).then(res=>{
        console.log("esta es la repsuesta despues de mandar el id")
        this.heroe = res;
      });
    });
  }

  ngOnInit(): void {
  }

}
