import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthorsListComponent} from './authors-list.component';

describe('AuthorsListComponent', () => {
  let component: AuthorsListComponent;
  let fixture: ComponentFixture<AuthorsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorsListComponent]
    });
    fixture = TestBed.createComponent(AuthorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
