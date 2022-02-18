import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  CdkDropList,
  CdkDragEnter,
  CdkDropListGroup,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(CdkDropListGroup) listGroup!: CdkDropListGroup<CdkDropList> | any;
  @ViewChild(CdkDropList) placeholder!: CdkDropList | any;

  public target: CdkDropList;
  public targetIndex!: number;
  public source: CdkDropList;
  public sourceIndex!: number;
  public activeContainer!: any;

  public items: Array<number> = Array(10)
    .fill(0)
    .map((_, i) => i + 1);

  constructor(private viewportRuler: ViewportRuler) {
    // @ts-ignore
    this.target = null;
    // @ts-ignore
    this.source = null;
  }

  ngOnInit(): void {}

  public itemTrackBy(item: any) {
    return item.id;
  }

  ngAfterViewInit() {
    const phElement = this.placeholder.element.nativeElement;

    phElement.style.display = 'none';
    phElement.parentElement.removeChild(phElement);
  }

  dropListDropped() {
    if (!this.target) {
      return;
    }

    const phElement = this.placeholder.element.nativeElement;
    const parent = phElement.parentElement;

    phElement.style.display = 'none';

    parent.removeChild(phElement);
    parent.appendChild(phElement);
    parent.insertBefore(
      this.source.element.nativeElement,
      parent.children[this.sourceIndex]
    );

    // @ts-ignore
    this.target = null;
    // @ts-ignore
    this.source = null;
    this.activeContainer = null;

    if (this.sourceIndex !== this.targetIndex) {
      moveItemInArray(this.items, this.sourceIndex, this.targetIndex);
    }
  }

  // @ts-ignore
  cdkDropListEntered(e: CdkDragEnter) {
    const drag = e.item;
    const drop = e.container;

    if (drop === this.placeholder) {
      return true;
    }

    const phElement = this.placeholder.element.nativeElement;
    const sourceElement = drag.dropContainer.element.nativeElement;
    const dropElement = drop.element.nativeElement;

    sourceElement.style.backgroundColor = 'red';

    console.log(phElement.getBoundingClientRect());
    console.log(sourceElement.getBoundingClientRect());
    console.log(dropElement.getBoundingClientRect());

    const dragIndex = __indexOf(
      dropElement.parentElement?.children,
      this.source ? phElement : sourceElement
    );
    const dropIndex = __indexOf(
      dropElement.parentElement?.children,
      dropElement
    );

    if (!this.source) {
      this.sourceIndex = dragIndex;
      this.source = drag.dropContainer;

      phElement.style.width = dropElement.clientWidth / 2 + 'px';
      phElement.style.height = dropElement.clientHeight + 'px';
      console.log('dCont', sourceElement.clientWidth);
      console.log('ph', phElement.style.width, phElement.style.height);

      sourceElement.parentElement?.removeChild(sourceElement);
    }

    this.targetIndex = dropIndex;
    this.target = drop;

    phElement.style.display = '';
    dropElement.parentElement?.insertBefore(
      phElement,
      dropIndex > dragIndex ? dropElement.nextSibling : dropElement
    );

    requestAnimationFrame(() => {
      this.placeholder._dropListRef.enter(
        drag._dragRef,
        drag.element.nativeElement.offsetLeft,
        drag.element.nativeElement.offsetTop
      );
    });
  }
}

function __indexOf(collection: any, node: any) {
  return Array.prototype.indexOf.call(collection, node);

}
