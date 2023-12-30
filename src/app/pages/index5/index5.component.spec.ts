import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Index5Component } from './index5.component';

describe('Index5Component', () => {
  let component: Index5Component;
  let fixture: ComponentFixture<Index5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Index5Component]
    });
    fixture = TestBed.createComponent(Index5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
