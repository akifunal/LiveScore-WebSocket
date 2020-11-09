import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDetailsComponent } from './match-details.component';

describe('MatchDetailsComponent', () => {
  let component: MatchDetailsComponent;
  let fixture: ComponentFixture<MatchDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
