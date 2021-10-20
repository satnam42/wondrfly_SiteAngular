import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreResourcesComponent } from './more-resources.component';

describe('MoreResourcesComponent', () => {
  let component: MoreResourcesComponent;
  let fixture: ComponentFixture<MoreResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
