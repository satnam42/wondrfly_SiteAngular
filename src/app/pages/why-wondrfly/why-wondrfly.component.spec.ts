import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyWondrflyComponent } from './why-wondrfly.component';

describe('WhyWondrflyComponent', () => {
  let component: WhyWondrflyComponent;
  let fixture: ComponentFixture<WhyWondrflyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyWondrflyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyWondrflyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
