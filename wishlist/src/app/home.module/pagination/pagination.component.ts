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

    if (changes.currentPage) {
      this.currentPage = changes.currentPage.currentValue;
    }

    if (changes.totalPageCount) {
      this.totalPageCount = changes.totalPageCount.currentValue;
    }

    if (changes.showPagesCount) {
      this.showPagesCount = changes.showPagesCount.currentValue;
    }

    this.fillPagination();
  }

  private fillPagination() {
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }
    if (this.currentPage > this.totalPageCount) {
      this.currentPage = this.totalPageCount;
    }

    const separator = Math.floor(this.showPagesCount / 2);

    const start = this.totalPageCount > this.currentPage + this.showPagesCount
      ? Math.max(this.currentPage - separator, 1)
      : Math.max(this.totalPageCount - this.showPagesCount + 1, 1);

    const end = Math.min(start + this.showPagesCount, this.totalPageCount + 1);
    this.pageNumbers = new Array<number>(end - start)
      .fill(1)
      .map((d, i) => start + i);

    this.showBackward = this.pageNumbers.indexOf(this.currentPage) !== 0;
    this.showForward = this.pageNumbers.length - 1 !== this.currentPage;
  }
}
