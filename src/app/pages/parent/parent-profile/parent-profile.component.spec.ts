import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ParentProfileComponent } from './parent-profile.component';


describe('ParentProfileComponent', () => {
  let component: ParentProfileComponent;
  let fixture: ComponentFixture<ParentProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
