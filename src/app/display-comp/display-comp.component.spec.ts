import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCompComponent } from './display-comp.component';

describe('DisplayCompComponent', () => {
  let component: DisplayCompComponent;
  let fixture: ComponentFixture<DisplayCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
