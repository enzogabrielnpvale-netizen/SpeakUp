# SpeakUp

## ESTA NÃO É A VERSÃO FINAL 


## Plataforma de relatos escolares

O SpeakUp é uma solução web desenvolvida para facilitar o registro, acompanhamento e gestão de ocorrências, denúncias e relatos escolares. A plataforma foi pensada para conectar estudantes e equipe de gestão em um ambiente simples, acessível e organizado, promovendo comunicação mais eficiente e suporte mais ágil às demandas da comunidade escolar.

A proposta central do projeto é transformar a forma como os relatos são enviados e tratados, oferecendo um fluxo estruturado para:

- registrar situações e ocorrências;
- acompanhar o status de cada relato;
- dar visibilidade para a gestão escolar;
- melhorar a organização e a tomada de decisão institucional.

---

## Objetivo do projeto

O objetivo principal do SpeakUp é criar uma interface funcional e visualmente clara para o envio e gerenciamento de relatos dentro do ambiente escolar. A aplicação foi desenvolvida como uma solução de experiência digital para apoiar a comunicação entre alunos e gestão, com foco em:

- acessibilidade;
- organização das informações;
- agilidade no atendimento;
- segurança e clareza no processo;
- uso prático no cotidiano escolar.

A plataforma simula uma jornada completa de uso, contemplando tanto o aluno quanto a gestão, com fluxos dedicados para cadastro, autenticação, registro de ocorrência e acompanhamento administrativo.

---

## Problema abordado

Em muitos contextos escolares, a comunicação de problemas, denúncias ou situações que necessitam de atenção pode ser fragmentada, pouco organizada ou difícil de acompanhar. Quando não existe um canal claro e centralizado, há risco de:

- relatos serem perdidos;
- ações demorarem a ser tomadas;
- alunos sentirem dificuldade para comunicar situações importantes;
- a gestão ter pouca visibilidade sobre pendências e padrões.

O SpeakUp busca resolver esse problema por meio de uma plataforma digital que estrutura o processo e facilita a gestão de informações.

---

## Funcionalidades principais

### Para alunos
- cadastro e autenticação;
- envio de novo relato;
- histórico de ocorrências;
- visualização detalhada de cada relato;
- acompanhamento do status da situação informada.

### Para gestão escolar
- painel administrativo;
- visualização geral de relatos;
- gerenciamento de ocorrências;
- análise por status e prioridade;
- acompanhamento de usuários;
- relatórios e indicadores estatísticos.

### Experiência de uso
- interface moderna e responsiva;
- navegação por rotas organizadas;
- layout visual inspirado em identidade institucional;
- componentes reutilizáveis para manter consistência visual.

---

## Tecnologias utilizadas

A aplicação foi desenvolvida com Angular 18, utilizando uma arquitetura moderna para facilitar manutenção, escalabilidade e organização do código.

### Stack principal
- Angular 18
- TypeScript
- HTML5
- CSS3
- Firebase
- Angular Router
- Signals do Angular
- Standalone Components

### Arquitetura adotada
- separação entre camada de domínio, serviços e interfaces;
- componentes independentes e reutilizáveis;
- estrutura orientada por features para organização por área de negócio;
- roteamento com controle de acesso por perfil;
- dados simulados para representar o fluxo funcional da aplicação.

---

## Estrutura do projeto

```text
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   ├── services/
│   │   └── guards/
│   ├── shared/
│   │   ├── components/
│   │   ├── pipes/
│   │   ├── styles/
│   │   ├── data/
│   │   └── utils/
│   ├── features/
│   │   ├── landing/
│   │   ├── auth/
│   │   ├── aluno/
│   │   └── gestao/
│   ├── app.routes.ts
│   ├── app.config.ts
│   └── firebase.ts
├── environments/
└── styles.css
```

---

## Fluxos principais

### 1. Fluxo do aluno
O aluno acessa a plataforma, realiza login ou cadastro, envia um relato com detalhes da situação e acompanha o status da solicitação no painel pessoal.

### 2. Fluxo da gestão
A equipe da gestão acessa o painel administrativo, analisa os relatos recebidos, organiza prioritários, responde às ocorrências e acompanha dados estatísticos do processo.

### 3. Fluxo de autenticação
A solução contempla diferentes perfis de usuário, com acesso específico conforme o papel dentro da aplicação, proporcionando maior segurança e organização na navegação.

---

## Telas e rotas principais

| Tela | Rota |
| --- | --- |
| Landing page | `/` |
| Login do aluno | `/login` |
| Login da gestão | `/login-gestao` |
| Cadastro | `/registrar` |
| Dashboard do aluno | `/aluno/dashboard` |
| Novo relato | `/aluno/novo-relato` |
| Histórico de relatos | `/aluno/historico` |
| Detalhe do relato | `/aluno/relato/:id` |
| Dashboard administrativo | `/gestao/dashboard` |
| Gerenciar relatos | `/gestao/relatos` |
| Detalhe/resposta do relato | `/gestao/relatos/:id` |
| Gerenciar usuários | `/gestao/usuarios` |
| Relatórios e estatísticas | `/gestao/estatisticas` |

---

## Como executar o projeto

Pré-requisitos:
- Node.js
- npm
- Angular CLI

No terminal, execute:

```bash
cd speakup
npm install
npm start
```

A aplicação será iniciada em ambiente local, normalmente em:

```text
http://localhost:4200
```

Para gerar build de produção:

```bash
npm run build
```

---

## Considerações técnicas

O projeto foi estruturado com foco em uma implementação clara e didática, mantendo boas práticas de organização e arquitetura front-end. Algumas decisões importantes incluem:

- uso de components standalone para reduzir acoplamento e facilitar manutenção;
- utilização de signals para gestão de estado reativo;
- organização por módulos de funcionalidade e recursos compartilhados;
- implementação de dados simulados para reprodução de cenários reais;
- design consistente com paleta institucional e elementos visuais bem definidos.

Essas escolhas reforçam a proposta do sistema como um protótipo funcional e uma base sólida para evolução futura.

---

## Próximos passos

Para continuar o desenvolvimento e transformar a solução em um produto mais completo, os próximos passos sugeridos são:

1. integração com backend real via API;
2. autenticação segura com banco de usuários e permissões;
3. persistência de relatos em banco de dados;
4. upload e armazenamento de imagens ou anexos;
5. implementação de testes automatizados;
6. criação de dashboards com dados reais e indicadores mais avançados.

---

## Conclusão

O SpeakUp representa uma proposta de solução digital para melhorar a comunicação, organização e acompanhamento de relatos escolares. O projeto demonstra a aplicação de conceitos modernos de desenvolvimento front-end, com foco em usabilidade, clareza de fluxo e experiência do usuário.

Além disso, a solução se mostra relevante como ferramenta de apoio institucional, unindo praticidade para os alunos e controle para a gestão escolar, contribuindo para uma experiência mais transparente e eficiente dentro do ambiente educacional.
