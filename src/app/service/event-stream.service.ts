import { Injectable } from '@angular/core';
import {ViewModelService} from './view-model.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EventStreamService {

  public eventSource: EventSource;
  public connected: boolean = false;
  public lastMessage: any = moment();
  public connectCheck: any;

  constructor(
    private viewModel: ViewModelService,
  ) {}

  connect(broadcast=true) {
    this.eventSource = new EventSource(this.viewModel.currentEndpoint.streamUrl);
    clearTimeout(this.connectCheck);
    if( broadcast ) this.viewModel.viewModelEmitter.emit({item: 'checkServer'});
    this.eventSource.addEventListener('message', (event:MessageEvent) => {
      this.lastMessage = moment(JSON.parse(event.data).timestamp);
    });
    this.connectCheck = setTimeout(() => {
      if( this.eventSource.readyState === 0 ) {
        this.eventSource.close();
      }
    }, 10000)
    this.connected = true;
    return this.eventSource;
  }

  close() {
    this.connected = false;
    this.eventSource.close();
  }

}
