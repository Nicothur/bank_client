import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelInputErrorComponent } from './label-input-error.component';

describe('LabelInputErrorComponent', () => {
  let component: LabelInputErrorComponent;
  let fixture: ComponentFixture<LabelInputErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelInputErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelInputErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
