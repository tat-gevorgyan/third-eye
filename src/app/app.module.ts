import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';

import { HttpModule } from '@angular/http';
import { ClusterService } from './service/cluster.service';
import { DataService } from './service/data.service';
import { ExcelService } from './service/excel.service';
import { ClusteredComponent } from './component/clustered/clustered.component';
import { LoadingComponent } from './component/loading/loading.component';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { ImportExcelComponent } from './component/import-excel/import-excel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ClusteredComponent,
    LoadingComponent,
    ImportExcelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgCircleProgressModule.forRoot({
    })
  ],
  providers: [
    ClusterService,
    DataService,
    ExcelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
