import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    MessageComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    MessageComponent
  ]
})
export class SharedModule { }
