import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';

interface Beneficio {
  titulo: string;
  descricao: string;
  icone: 'seguranca' | 'tempo' | 'gestao';
}

interface Passo {
  numero: number;
  titulo: string;
  descricao: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, LogoComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  readonly beneficios: Beneficio[] = [
    { titulo: 'Comunicação Segura', descricao: 'Relatos confidenciais e controláveis, garantindo privacidade e transparência em todo o processo.', icone: 'seguranca' },
    { titulo: 'Acompanhamento em Tempo Real', descricao: 'Visualize o status dos seus relatos e receba notificações sobre atualizações importantes.', icone: 'tempo' },
    { titulo: 'Gestão Eficiente', descricao: 'Ferramentas completas para organizar, priorizar e resolver relatos com eficiência.', icone: 'gestao' },
  ];

  readonly passos: Passo[] = [
    { numero: 1, titulo: 'Crie seu relato', descricao: 'Escolha uma categoria e descreva sua situação' },
    { numero: 2, titulo: 'Acompanhe o status', descricao: 'Receba atualizações sobre o andamento' },
    { numero: 3, titulo: 'Gestão analisa', descricao: 'A equipe escolar avalia o prioriza o caso' },
    { numero: 4, titulo: 'Resolução', descricao: 'Receba feedback sobre as ações tomadas' },
  ];

  readonly categorias = ['Bullying', 'Infraestrutura', 'Bem-estar', 'Sugestão', 'Assédio', 'Outros'];
}
