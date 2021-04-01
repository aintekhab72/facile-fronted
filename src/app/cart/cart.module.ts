import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartComponent } from "./cart.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { CartRoutingModule } from "./cart-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CartRoutingModule,
    FormsModule,
    NgbModule,
    SharedModule
  ],
  exports: [CartRoutingModule]
})
export class CartModule {}
