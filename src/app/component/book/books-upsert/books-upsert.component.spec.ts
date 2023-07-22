import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BooksUpsertComponent} from './books-upsert.component';

describe('BooksUpsertComponent', () => {
  let component: BooksUpsertComponent;
  let fixture: ComponentFixture<BooksUpsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksUpsertComponent]
    });
    fixture = TestBed.createComponent(BooksUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
