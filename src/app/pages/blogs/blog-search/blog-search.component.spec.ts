import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlogSearchComponent } from './blog-search.component';

describe('BlogSearchComponent', () => {
  let component: BlogSearchComponent;
  let fixture: ComponentFixture<BlogSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
