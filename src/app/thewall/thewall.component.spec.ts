import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThewallComponent } from './thewall.component';

describe('ThewallComponent', () => {
  let component: ThewallComponent;
  let fixture: ComponentFixture<ThewallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThewallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
