import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegWallComponent } from './reg-wall.component';


describe('AlertComponent', () => {
  let component: RegWallComponent;
  let fixture: ComponentFixture<RegWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegWallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
