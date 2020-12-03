import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileDirective } from './directive/mobile.directive';



@NgModule({
  declarations: [MobileDirective],
  imports: [
    CommonModule
  ], 
  exports: [
    MobileDirective
  ]
})
export class SharedModule { }
