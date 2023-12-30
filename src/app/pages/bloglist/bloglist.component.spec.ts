import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloglistComponent } from './bloglist.component';

describe('BloglistComponent', () => {
  let component: BloglistComponent;
  let fixture: ComponentFixture<BloglistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BloglistComponent]
    });
    fixture = TestBed.createComponent(BloglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
