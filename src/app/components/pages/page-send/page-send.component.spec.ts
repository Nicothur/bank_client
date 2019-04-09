import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSendComponent } from './page-send.component';

describe('PageSendComponent', () => {
  let component: PageSendComponent;
  let fixture: ComponentFixture<PageSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
