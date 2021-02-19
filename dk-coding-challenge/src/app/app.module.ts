import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule} from "@angular/common/http";
// import { OperationsService } from './operations.service';

import { NgxCsvParserModule } from 'ngx-csv-parser';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxCsvParserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
}) 
export class AppModule { }
