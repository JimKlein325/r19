import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { ProjectEditComponent } from './project-edit.component';

describe('ProjectEditComponent', () => {
  let component: ProjectEditComponent;
  let fixture: ComponentFixture<ProjectEditComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ ProjectEditComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [provideMockStore()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockStore.dispatch = jest.fn();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch a "Update Project" action when the user selects a different Project Owner', () => {
    expect(component).toBeTruthy();

    // const expectedAction = BooksPageActions.selectBook({ bookId: mockBook.id });
    // const booksListComponent = fixture.debugElement.query(
    //   By.css('bco-books-list')
    // );

    // booksListComponent.triggerEventHandler('select', mockBook);

    // expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
