import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './shared/components/header/header.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {CurrencyConversionStore} from "./state/conversion-store.state";
import {CurrencyConversionMapper} from "./mappers/conversion-mapper";
import {CurrencyConversionFacade} from "./currency-conversion.facade";
import {CacheCurrencyConversionService} from "./state/cache-currency-conversion.service";
import {ConversionApiService} from "./services/conversion-api.service";
import {HomeContainerComponent} from './containers/home-container/home-container.component';
import {CurrencyConverterContainerComponent} from './containers/currency-converter-container/currency-converter-container.component';
import {CurrencyConverterFormComponent} from './components/currency-converter-form/currency-converter-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeContainerComponent,
    CurrencyConverterContainerComponent,
    CurrencyConverterFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    CurrencyConversionStore,
    CurrencyConversionMapper,
    CurrencyConversionFacade,
    CacheCurrencyConversionService,
    ConversionApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
