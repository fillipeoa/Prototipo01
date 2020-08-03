import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css']
})
export class ErrorMessagesComponent implements OnInit {

  @Input('error-message') errorMessage: string = null;

  constructor() { }

  ngOnInit(): void {
  }

}
