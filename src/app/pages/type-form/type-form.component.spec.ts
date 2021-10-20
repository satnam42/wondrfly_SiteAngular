import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TypeFormComponent } from './type-form.component';

describe('LoginParentComponent', () => {
  let component: TypeFormComponent;
  let fixture: ComponentFixture<TypeFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
