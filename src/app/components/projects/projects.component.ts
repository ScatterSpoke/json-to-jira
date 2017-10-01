import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {MdButton} from '@angular/material/button';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @ViewChild('backButton') backButton: MdButton;
  authorized = false;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authenticationService.currentAuth.subscribe((result) => {
      this.authorized = result;
      if (result) {
        console.log('todo ..');
      } else {
        this.backButton._elementRef.nativeElement.click();
      }
    });
  }
}
