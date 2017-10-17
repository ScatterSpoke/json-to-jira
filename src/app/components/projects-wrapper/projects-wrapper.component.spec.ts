import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsWrapperComponent } from './projects-wrapper.component';

describe('ProjectsWrapperComponent', () => {
  let component: ProjectsWrapperComponent;
  let fixture: ComponentFixture<ProjectsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
