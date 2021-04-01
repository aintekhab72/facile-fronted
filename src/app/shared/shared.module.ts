import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileDirective } from './directive/mobile.directive';
import { MaterialModule } from './material.module';



@NgModule({
  declarations: [MobileDirective],
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
