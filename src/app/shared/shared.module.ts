import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileDirective } from './directive/mobile.directive';
import { MaterialModule } from './material.module';
import { CustomDialogComponent } from './custom-dialog/custom-dialog.component';
import { ForgotPasswordDialogComponent } from './forgot-password-dialog/forgot-password-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MobileDirective, CustomDialogComponent, ForgotPasswordDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ], 
  exports: [
    MobileDirective,
    MaterialModule
  ]
})
export class SharedModule { }
