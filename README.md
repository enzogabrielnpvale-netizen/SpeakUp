# SpeakUp — Plataforma de Relatos Escolares

Aplicação Angular (standalone components, Angular 18) que replica o design do
protótipo Figma **SpeakUp UI/UX Design**, cobrindo a jornada completa de aluno
e da gestão escolar.

> ⚠️ Este código foi escrito manualmente neste ambiente sem acesso à internet,
> portanto **não foi possível rodar `npm install` / `ng build` aqui** para
> compilar e validar o projeto. A estrutura segue rigorosamente as convenções
> do Angular 18 (standalone components, signals, novo control flow
> `@if`/`@for`/`@switch`), mas rode os passos abaixo no seu ambiente para
> testar e reportar qualquer ajuste necessário.

## Como rodar

```bash
cd speakup
npm install
npm start        # ng serve — http://localhost:4200
```

Build de produção:

```bash
npm run build
```

## Estrutura do projeto

```
src/app/
├── core/                     # Camada de domínio, sem UI
│   ├── models/                # Interfaces (Relato, Usuario, Auth)
│   ├── services/               # AuthService, RelatosService, UsuariosService (signals)
│   └── guards/                  # authGuard (protege rotas por papel aluno/gestão)
├── shared/                   # Reutilizável entre features
│   ├── components/            # Navbar, Logo, Badge, StatCard, gráficos SVG
│   ├── pipes/                   # DataBrPipe (datas em pt-BR)
│   ├── styles/                  # CSS compartilhado (tabelas, listas de relato, detalhe)
│   ├── data/                    # Dados mockados de analytics/estatísticas
│   └── utils/                   # Mapeamento de cores por categoria/status/prioridade
├── features/
│   ├── landing/                # Home pública
│   ├── auth/                    # Login aluno, login gestão, cadastro
│   ├── aluno/                    # Dashboard, novo relato, histórico, detalhe
│   └── gestao/                   # Dashboard admin, relatos, usuários, estatísticas
├── app.routes.ts               # Rotas com lazy loading (loadComponent) e guards
└── app.config.ts               # Providers da aplicação
```

## Decisões técnicas

- **Standalone components + Signals**: sem NgModules; estado reativo via
  `signal`/`computed`, sem necessidade de `ChangeDetectorRef` manual.
- **Mock de backend**: `AuthService`, `RelatosService` e `UsuariosService`
  simulam uma API com dados em memória (persistindo apenas a sessão de login
  no `localStorage`). Para produção, troque os métodos internos por chamadas
  `HttpClient` mantendo a mesma superfície pública dos serviços.
- **Gráficos sem dependências externas**: `BarChartComponent`,
  `LineChartComponent` e `PieChartComponent` são SVG puro — evita acoplar o
  projeto a uma lib de charts específica e facilita customização visual.
- **Design tokens** centralizados em `src/styles.css` (`:root` com variáveis
  CSS) espelhando a paleta do Figma (navy institucional + azul de destaque).
- **Roteamento com lazy loading** (`loadComponent`) por tela, reduzindo o
  bundle inicial.
- **Guards por papel**: `authGuard('aluno')` / `authGuard('gestao')` barram
  acesso cruzado entre os dois portais.

## Contas de acesso (mock)

Não há validação de credenciais reais — qualquer e-mail/senha (mín. 6
caracteres) autentica:

- **Aluno**: tela `/login` → entra como "João Silva"
- **Gestão**: tela `/login-gestao` → entra como "Maria Santos"
- **Cadastro**: tela `/registrar` cria e autentica um novo aluno

## Telas implementadas

| Tela | Rota |
| --- | --- |
| Landing page | `/` |
| Login do aluno | `/login` |
| Login da gestão | `/login-gestao` |
| Cadastro | `/registrar` |
| Dashboard do aluno | `/aluno/dashboard` |
| Novo relato | `/aluno/novo-relato` |
| Histórico de relatos | `/aluno/historico` |
| Detalhe do relato (aluno) | `/aluno/relato/:id` |
| Dashboard administrativo | `/gestao/dashboard` |
| Gerenciar relatos | `/gestao/relatos` |
| Detalhe/resposta do relato (gestão) | `/gestao/relatos/:id` |
| Gerenciar usuários | `/gestao/usuarios` |
| Relatórios e estatísticas | `/gestao/estatisticas` |

## Próximos passos sugeridos

1. Substituir os serviços mock por integrações reais via `HttpClient`
   (mantendo os mesmos métodos públicos já usados pelos componentes).
2. Adicionar testes unitários (Jasmine/Karma já configurados pelo Angular CLI).
3. Implementar upload real de imagens no formulário de "Novo Relato".
4. Tela de "Esqueci minha senha" (link já presente no login, rota pendente).
