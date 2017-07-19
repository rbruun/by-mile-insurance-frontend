import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteinfoComponent } from './routeinfo.component';

describe('RouteinfoComponent', () => {
  let component: RouteinfoComponent;
  let fixture: ComponentFixture<RouteinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
