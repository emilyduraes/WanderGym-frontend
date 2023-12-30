import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Index3Component } from './index3.component';

describe('Index3Component', () => {
  let component: Index3Component;
  let fixture: ComponentFixture<Index3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Index3Component]
    });
    fixture = TestBed.createComponent(Index3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
