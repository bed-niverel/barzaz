import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestAddComponent } from './suggest-add.component';

describe('SuggestAddComponent', () => {
  let component: SuggestAddComponent;
  let fixture: ComponentFixture<SuggestAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
