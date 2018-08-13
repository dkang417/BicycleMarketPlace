import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandombikeComponent } from './randombike.component';

describe('RandombikeComponent', () => {
  let component: RandombikeComponent;
  let fixture: ComponentFixture<RandombikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandombikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandombikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
