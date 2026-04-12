import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class Paginator {
  @Input({ required: true }) count = 0;
  @Input() size = 10;
  @Output() changePageEvent = new EventEmitter<number>();

  get pages(): number[] {
    return Array.from({ length: Math.ceil(this.count / this.size) }, (_, i) => i + 1);
  }

  changePage(value: number) {
    this.changePageEvent.emit(value);
  }
}
