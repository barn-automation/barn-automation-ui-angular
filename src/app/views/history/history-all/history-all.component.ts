import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../service/data.service';
import {LazyLoadEvent} from 'primeng/api';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-history-all',
  templateUrl: './history-all.component.html',
  styleUrls: ['./history-all.component.css']
})
export class HistoryAllComponent implements OnInit {
  public rowData: any = [];
  public totalRecords: number = 0;

  constructor(
    private dataService: DataService,
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Barn Automation: All Events');

    this.dataService.getPaginatedEvents(0, 5).subscribe( data => {
      this.rowData = data;
    });
    this.dataService.countEvents().subscribe( (data: any) => {
      this.totalRecords = data.total;
    });
  }

  listEvents(event: LazyLoadEvent) {
    this.dataService.getPaginatedEvents(event.first, event.rows).subscribe( data => {
      this.rowData = data;
    });
  }

}
