import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Index4Component } from './index4.component';

describe('Index4Component', () => {
  let component: Index4Component;
  let fixture: ComponentFixture<Index4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Index4Component]
    });
    fixture = TestBed.createComponent(Index4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
