import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageSizePipe } from './pipes/image-size/image-size.pipe';
import { CapitalizePipe } from './pipes/capitalize/capitalize.pipe';
import { DateFormatPipe } from './pipes/date-format/date-format.pipe';
import { DurationFormatPipe } from './pipes/duration-format/duration-format.pipe';


@NgModule({
  declarations: [
    ImageSizePipe,
    CapitalizePipe,
    DateFormatPipe,
    DurationFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImageSizePipe,
    CapitalizePipe,
    DateFormatPipe,
    DurationFormatPipe
  ]
})
export class SharedModule { }
