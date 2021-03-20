import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartComponent } from "./cart.component";
import { MatStepperModule } from "@angular/material/stepper";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { CartRoutingModule } from "./cart-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule } from "@angular/material/badge";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CartRoutingModule,
    FormsModule,
    MatStepperModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatTabsModule,
    MatInputModule,
    NgbModule,
    MatIconModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    SharedModule
  ],
  exports: [CartRoutingModule]
})
export class CartModule {}
