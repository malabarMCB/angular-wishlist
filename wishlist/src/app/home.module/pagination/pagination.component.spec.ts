import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import {By} from '@angular/platform-browser';
import {Component, Input} from '@angular/core';

describe('PaginationComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent, TestPaginationWrapperComponent ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(PaginationComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  const paginationTestParameters = [
    {description: 'should create pages', currentPage: 1, totalPageCount: 10, showPagesCount: 5, expectedPages: [1, 2, 3, 4, 5]},
    {description: 'should create pages 2', currentPage: 1, totalPageCount: 2, showPagesCount: 5, expectedPages: [1, 2]},
    {description: 'should create pages 3', currentPage: 7, totalPageCount: 20, showPagesCount: 5, expectedPages: [5, 6, 7, 8, 9]},
    {description: 'should create pages 4', currentPage: 8, totalPageCount: 20, showPagesCount: 5, expectedPages: [6, 7, 8, 9, 10]},
    {description: 'should create pages 5', currentPage: 4, totalPageCount: 20, showPagesCount: 5, expectedPages: [2, 3, 4, 5, 6]},
    {description: 'should create pages 6', currentPage: 19, totalPageCount: 20, showPagesCount: 5, expectedPages: [16, 17, 18, 19, 20]},
    {description: 'should create pages 7', currentPage: 1, totalPageCount: 20, showPagesCount: 5, expectedPages: [1, 2, 3, 4, 5]},
    {description: 'should create pages 8', currentPage: 2, totalPageCount: 20, showPagesCount: 5, expectedPages: [1, 2, 3, 4, 5]},
    {description: 'should create pages 9', currentPage: 3, totalPageCount: 20, showPagesCount: 5, expectedPages: [1, 2, 3, 4, 5]},
    {description: 'should create pages 10', currentPage: 4, totalPageCount: 20, showPagesCount: 5, expectedPages: [2, 3, 4, 5, 6]},
    {description: 'should create pages 11', currentPage: 20, totalPageCount: 20, showPagesCount: 5, expectedPages: [16, 17, 18, 19, 20]},
    {description: 'should create pages 12', currentPage: 18, totalPageCount: 20, showPagesCount: 5, expectedPages: [16, 17, 18, 19, 20]},
    {description: 'should create pages 13', currentPage: 18, totalPageCount: 20, showPagesCount: 4, expectedPages: [17, 18, 19, 20]},
    {description: 'should create pages 14', currentPage: 19, totalPageCount: 20, showPagesCount: 4, expectedPages: [17, 18, 19, 20]},
    {description: 'should create pages 15', currentPage: 20, totalPageCount: 20, showPagesCount: 4, expectedPages: [17, 18, 19, 20]},
  ];
  paginationTestParameters.forEach(parameter => {
    it(parameter.description, () => {

      const wrapperFixture = TestBed.createComponent(TestPaginationWrapperComponent);
      const wrapperComponent = wrapperFixture.componentInstance;

      wrapperComponent.currentPage = parameter.currentPage;
      wrapperComponent.totalPageCount = parameter.totalPageCount;
      wrapperComponent.showPagesCount = parameter.showPagesCount;

      wrapperFixture.detectChanges();

      const pageLinks = wrapperFixture.debugElement.queryAll(By.css('.page-link'));
      const actualPages = pageLinks.slice(1, pageLinks.length - 1).map(debugEl => + debugEl.nativeElement.textContent);

      expect(actualPages).toEqual(parameter.expectedPages);
    });
  });
  });

@Component({
  template: '<app-pagination [currentPage]="currentPage" [totalPageCount]="totalPageCount" [showPagesCount]="showPagesCount">' +
    '</app-pagination>'
})
class TestPaginationWrapperComponent {
  currentPage = 0;
  totalPageCount = 0;
  showPagesCount = 0;
}
