import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrelloProjectsComponent } from './trello-projects.component';

describe('TrelloProjectsComponent', () => {
  let component: TrelloProjectsComponent;
  let fixture: ComponentFixture<TrelloProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrelloProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrelloProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
