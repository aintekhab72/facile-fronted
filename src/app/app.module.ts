import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "./shared/shared.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoaderComponent } from "./components/loader/loader.component";
import { ProductsListComponent } from "./products-list/products-list.component";
import { HeaderComponent } from "./components/header/header.component";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HandleComponent } from './handle/handle.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use("en");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoaderComponent,
    ProductsListComponent,
    HeaderComponent,
    HandleComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
