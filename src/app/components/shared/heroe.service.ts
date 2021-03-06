import { Injectable } from '@angular/core';
import {Heroe} from "../models/heroe";

@Injectable({
  providedIn: 'root'
})
export class HeroeService {

  private heroes : Heroe[] = [
    {
      nombre: "Aquaman",
      bio: "El poder más reconocido de Aquaman es la capacidad telepática para comunicarse con la vida marina, la cual puede convocar a grandes distancias.",
      img: "assets/img/aquaman.png",
      aparicion: new Date(1941,11,1),
      casa:"DC"
    },
    {
      nombre: "Batman",
      bio: "Los rasgos principales de Batman se resumen en «destreza física, habilidades deductivas y obsesión». La mayor parte de las características básicas de los cómics han variado por las diferentes interpretaciones que le han dado al personaje.",
      img: "assets/img/batman.png",
      aparicion: new Date(1939,5,1),
      casa:"DC"
    },
    {
      nombre: "Daredevil",
      bio: "Al haber perdido la vista, los cuatro sentidos restantes de Daredevil fueron aumentados por la radiación a niveles superhumanos, en el accidente que tuvo cuando era niño. A pesar de su ceguera, puede \"ver\" a través de un \"sexto sentido\" que le sirve como un radar similar al de los murciélagos.",
      img: "assets/img/daredevil.png",
      aparicion: new Date(1964,1,1),
      casa: "Marvel"
    },
    {
      nombre: "Hulk",
      bio: "Su principal poder es su capacidad de aumentar su fuerza hasta niveles prácticamente ilimitados a la vez que aumenta su furia. Dependiendo de qué personalidad de Hulk esté al mando en ese momento (el Hulk Banner es el más débil, pero lo compensa con su inteligencia).",
      img: "assets/img/hulk.png",
      aparicion: new Date(1962,5,1),
      casa:"Marvel"
    },
    {
      nombre: "Linterna Verde",
      bio: "Poseedor del anillo de poder que posee la capacidad de crear manifestaciones de luz sólida mediante la utilización del pensamiento. Es alimentado por la Llama Verde (revisada por escritores posteriores como un poder místico llamado Starheart), una llama mágica contenida en dentro de un orbe (el orbe era en realidad un meteorito verde de metal que cayó a la Tierra, el cual encontró un fabricante de lámparas llamado Chang)",
      img: "assets/img/linterna-verde.png",
      aparicion: new Date(1940,6,1),
      casa: "DC"
    },
    {
      nombre: "Spider-Man",
      bio: "Tras ser mordido por una araña radiactiva, obtuvo los siguientes poderes sobrehumanos, una gran fuerza, agilidad, poder trepar por paredes. La fuerza de Spider-Man le permite levantar 10 toneladas o más. Gracias a esta gran fuerza Spider-Man puede realizar saltos íncreibles. Un \"sentido arácnido\", que le permite saber si un peligro se cierne sobre él, antes de que suceda. En ocasiones este puede llevar a Spider-Man al origen del peligro.",
      img: "assets/img/spiderman.png",
      aparicion: new Date(1962,8,1),
      casa: "Marvel"
    },
    {
      nombre: "Wolverine",
      bio: "En el universo ficticio de Marvel, Wolverine posee poderes regenerativos que pueden curar cualquier herida, por mortal que ésta sea, además ese mismo poder hace que sea inmune a cualquier enfermedad existente en la Tierra y algunas extraterrestres . Posee también una fuerza sobrehumana, que si bien no se compara con la de otros superhéroes como Hulk, sí sobrepasa la de cualquier humano.",
      img: "assets/img/wolverine.png",
      aparicion: new Date(1974,11,1),
      casa: "Marvel"
    }
  ];

  private heroeDesconocido: Heroe = {
    nombre: "Desconocido",
    bio: "Heroe desconocido. Probablemente un invento tuyo",
    img: "http://1.bp.blogspot.com/-3c3vF3iAGuc/U7PhKlBEjzI/AAAAAAAAeJI/SIO_vaIGUfk/s1600/interrogacion.png",
    aparicion: new Date(),
    casa: "¿?"
  }

  constructor() { }

  getHeroes(filter?: string){
     return this.delay(filter);
  }

  async delay(filter?: string):Promise<Heroe[]>{
    console.log("incio")
    const val = new Promise(resolve=>{
      setTimeout(()=>{
        resolve("timeout")
      },3000)
    })
    await val //Comentar esta linea para quitar tiempo de espera;
    console.log("fin");
    return filter ? this.heroes.filter(x=>x.nombre.toLowerCase().includes(filter.toLowerCase())) : this.heroes;
  }

  async delayUnique(id:string):Promise<Heroe>{
    console.log("incio")
    const val = new Promise(resolve=>{
      setTimeout(()=>{
        resolve("timeout")
      },3000)
    })
    await val //Comentar esta linea para quitar tiempo de espera;
    console.log("fin");
    return this.heroes.find(x => x.nombre === id) || this.heroeDesconocido;
  }

  getHeroe(id: string):Promise<Heroe>{
    return this.delayUnique(id);
  }

}
