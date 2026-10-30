import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../../../shared/components/logo/logo.component';

@Component({
  selector: 'app-termos-privacidade',
  standalone: true,
  imports: [RouterLink, LogoComponent],
  templateUrl: './termos-privacidade.component.html',
  styleUrl: './termos-privacidade.component.css',
})
export class TermosPrivacidadeComponent {}
