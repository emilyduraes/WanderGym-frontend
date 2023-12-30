import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogdetailsComponent } from './blogdetails.component';

describe('BlogdetailsComponent', () => {
  let component: BlogdetailsComponent;
  let fixture: ComponentFixture<BlogdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogdetailsComponent]
    });
    fixture = TestBed.createComponent(BlogdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
