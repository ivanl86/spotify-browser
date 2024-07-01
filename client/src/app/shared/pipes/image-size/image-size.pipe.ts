import { Pipe, PipeTransform } from '@angular/core';
import { Image } from '../../../models/image.interface';

@Pipe({
  name: 'imageSize'
})
export class ImageSizePipe implements PipeTransform {

  transform(images: Image[], size: "small" | "medium" | "large" | undefined): string | undefined {
    if (!images || images.length < 1) {
      return undefined;
    }
    if (!size) {
      size = "large";
    }
    let selectedImage: string | undefined = "";
    switch (size) {
      case "large":
        selectedImage = images.find(image => image.height >= 500)?.url;
        break;
      case "medium":
        selectedImage = images.find(image => image.height > 200 && image.height < 500)?.url;
        break;
      case "small":
        selectedImage = images.find(image => image.height <= 200)?.url;
        break;
      default:
        selectedImage = images[0].url;
    }
    return selectedImage;
  }

}
