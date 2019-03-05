import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {LiveTabularComponent} from './views/live/live-tabular.component';
import {DataService} from './service/data.service';
import {HttpClientModule} from '@angular/common/http';
import {ViewModelService} from './service/view-model.service';
import {EventStreamService} from './service/event-stream.service';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {CardModule, ChartModule, DataTableModule, DialogModule, GalleriaModule} from 'primeng/primeng';
import {HistoryAllComponent} from './views/history/history-all/history-all.component';
import {HomeComponent} from './views/home/home.component';
import {EventTypeFilterPipe} from './pipes/event-type-filter.pipe';
import {MomentModule} from 'ngx-moment';

const appRoutes: Routes = [
  {
    path: 'live',
    component: LiveTabularComponent,
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'history/all',
    component: HistoryAllComponent,
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
]

@NgModule({
  declarations: [
    AppComponent,
    LiveTabularComponent,
    HistoryAllComponent,
    HomeComponent,
    EventTypeFilterPipe,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    TableModule,
    DataTableModule,
    ChartModule,
    GalleriaModule,
    DialogModule,
    CardModule,
    MomentModule,
  ],
  providers: [
    DataService,
    ViewModelService,
    EventStreamService,
    EventTypeFilterPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
