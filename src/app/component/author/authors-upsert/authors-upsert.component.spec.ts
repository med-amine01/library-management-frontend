import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthorsUpsertComponent} from './authors-upsert.component';

describe('AuthorsUpsertComponent', () => {
  let component: AuthorsUpsertComponent;
  let fixture: ComponentFixture<AuthorsUpsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorsUpsertComponent]
    });
    fixture = TestBed.createComponent(AuthorsUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
