import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutJoinBetaComponent } from './about-join-beta.component';

describe('AboutJoinBetaComponent', () => {
  let component: AboutJoinBetaComponent;
  let fixture: ComponentFixture<AboutJoinBetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutJoinBetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutJoinBetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
