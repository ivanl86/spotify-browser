import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  email: string = "ivanl8866@gmail.com";
  github: string = "https://github.com/ivanl86/spotify-browser";
  linkedin: string = "https://www.linkedin.com/in/ivan-leung-42a6142b2";
}
