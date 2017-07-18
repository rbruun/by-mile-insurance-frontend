import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehinfoComponent } from './vehinfo.component';

describe('VehinfoComponent', () => {
  let component: VehinfoComponent;
  let fixture: ComponentFixture<VehinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
