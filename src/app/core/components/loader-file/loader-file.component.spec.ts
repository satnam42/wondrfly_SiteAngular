import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderFileComponent } from './loader-file.component';

describe('LoaderFileComponent', () => {
  let component: LoaderFileComponent;
  let fixture: ComponentFixture<LoaderFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
