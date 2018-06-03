import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestSuccessComponent } from './suggest-success.component';

describe('SuggestSuccessComponent', () => {
  let component: SuggestSuccessComponent;
  let fixture: ComponentFixture<SuggestSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
