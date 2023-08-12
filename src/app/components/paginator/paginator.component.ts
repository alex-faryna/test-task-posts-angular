import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, JsonPipe]
})
export class PaginatorComponent implements OnChanges {


  @Input() public prev = 1;
  @Input() public next = 1;
  @Input() public last = 10;
  @Input() public currentPage = 1;

  public pages: (string | number)[] = this.getPages();

  @Output() public pageChanged = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    this.pages = this.getPages();
  }

  private getPages(): (string | number)[] {
    const center = [...new Array(5)].map((_, idx) => idx - 2 + this.currentPage);
    const left = center[0] >= 3 ? [1, '...'] : (center[0] >= 2 ? [1] : []);
    const right = center.at(-1)! <= this.last - 2 ? ['...', this.last] : (center.at(-1)! <= this.last - 1 ? [this.last] : []);
    return [...left, ...center.filter(val => val > 0 && val <= this.last) , ...right];
  }

  public changed(page: number | string): void {
    this.pageChanged.emit(+page);
  }
}
