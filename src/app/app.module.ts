import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    ChartsModule,
    NgxUiLoaderModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
