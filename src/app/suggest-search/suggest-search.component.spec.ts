import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestSearchComponent } from './suggest-search.component';

describe('SuggestSearchComponent', () => {
  let component: SuggestSearchComponent;
  let fixture: ComponentFixture<SuggestSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
