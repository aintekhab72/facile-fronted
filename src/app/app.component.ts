import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "facile";
  constructor(
    private router: Router,
    private translate: TranslateService,
  ) {
    this.translate.setDefaultLang("en");
    this.translate.use("en");
  }
}
