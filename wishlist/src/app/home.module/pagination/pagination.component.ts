import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage = 0;
  @Input() totalPageCount = 0;
  @Input() showPagesCount = 0;

  pageNumbers: number[];
  showBackward: boolean;
  showForward: boolean;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.fillPagination();
  }

  private fillPagination() {
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }
    if (this.currentPage > this.totalPageCount) {
      this.currentPage = this.totalPageCount;
    }

    const separator = Math.ceil(this.showPagesCount / 2);
    const end = this.showPagesCount > this.totalPageCount ? this.showPagesCount : this.currentPage + separator;
    const start = this.showPagesCount > this.totalPageCount ? 1 : this.currentPage - separator + 1;
    this.pageNumbers = new Array<number>(end - start)
      .fill(start)
      .map((d, i) => i + 1);

    this.showBackward = this.pageNumbers.indexOf(this.currentPage) !== 0;
    this.showForward = this.pageNumbers.length - 1 !== this.currentPage;
  }
}
