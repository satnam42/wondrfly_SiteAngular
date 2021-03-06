import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharePopupComponent } from './share-popup.component';
describe('DragDropComponent', () => {
  let component: SharePopupComponent;
  let fixture: ComponentFixture<SharePopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SharePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
