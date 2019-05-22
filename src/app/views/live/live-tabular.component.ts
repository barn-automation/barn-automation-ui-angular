import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../service/data.service';
import {EventStreamService} from '../../service/event-stream.service';
import {Title} from '@angular/platform-browser';
import {LazyLoadEvent} from 'primeng/api';
import {Observable} from 'rxjs';
import {ViewModelService} from '../../service/view-model.service';

@Component({
  selector: 'app-home',
  templateUrl: './live-tabular.component.html',
  styleUrls: ['./live-tabular.component.css']
})
export class LiveTabularComponent implements OnInit, OnDestroy {

  public eventSource: EventSource;
  public eventSourceConnected: boolean = false;
  public typeData: any = [];
  public liveData: any = [];
  public changeInterval: any;
  public viewModelSubscription: any;

  constructor(
    private dataService: DataService,
    private eventStreamService: EventStreamService,
    private titleService: Title,
    private changeDetectorRef: ChangeDetectorRef,
    private viewModelService: ViewModelService,
  ) {
    this.changeDetectorRef.detach();
    this.changeInterval = setInterval( () => { this.changeDetectorRef.detectChanges() }, 1000);
  }

  ngOnInit() {
    this.titleService.setTitle('Barn Automation: Live Data Stream');
    this.connectEventStream();
    this.viewModelSubscription = this.viewModelService.viewModelEmitter.subscribe((data) => {
      if( data.item === 'endpoint' ) {
        // new endpoint selected!
        // close the existing event source and re-open
        this.eventStreamService.close();
        this.connectEventStream();
      }
    })
  }

  ngOnDestroy() {
    this.eventStreamService.close();
    this.viewModelSubscription.unsubscribe();
    clearInterval(this.changeInterval);
  }

  listEventsByType(event) {
    this.dataService.getEventsByType(event.type).subscribe( data => {
      this.typeData = data;
    });
  }

  toggleEventStream() {
    if( this.eventSourceConnected ) {
      this.disconnectEventStream();
    }
    else {
      this.connectEventStream();
    }
  }

  connectEventStream() {
    this.eventSource = this.eventStreamService.connect();
    this.eventSourceConnected = true;
    this.eventSource.onmessage = (message) => {
      const msg = JSON.parse(message.data);
      this.liveData = [msg].concat(this.liveData);
    };
  }

  disconnectEventStream() {
    this.eventStreamService.close();
    this.eventSourceConnected = false;
  }

}
