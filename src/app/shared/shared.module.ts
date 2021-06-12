import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileDirective } from './directive/mobile.directive';
import { MaterialModule } from './material.module';
import { CustomDialogComponent } from './custom-dialog/custom-dialog.component';



@NgModule({
  declarations: [MobileDirective, CustomDialogComponent],
  imports: [
    CommonModule,
    MaterialModule
  ], 
  exports: [
    MobileDirective,
    MaterialModule
  ]
})
export class SharedModule { }
