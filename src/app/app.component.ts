import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ViewModelService} from './service/view-model.service';
import {Endpoint} from './model/endpoint';
import {EventStreamService} from './service/event-stream.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public endpoints: Endpoint[];
  public currentEndpoint: Endpoint;
  @ViewChild('navcollapse') navcollapse: ElementRef;

  constructor(
    private viewModelService: ViewModelService,
    public eventStreamService: EventStreamService,
  ) {}

  ngOnInit() {
    this.endpoints = this.viewModelService.getEndpoints();
    this.currentEndpoint = this.viewModelService.currentEndpoint;
  }

  ngOnDestroy() {
  }

  fixNav() {
    this.navcollapse.nativeElement.classList.toggle('navbar-collapse');
  }

  now() {
    return moment();
  }

  setEndpoint() {
    this.viewModelService.setEndpoint(this.currentEndpoint);
  }
}
