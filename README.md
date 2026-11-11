# SpeakUp

Plataforma web para que estudantes enviem relatos sobre situações do ambiente escolar e acompanhem seu andamento. A equipe de gestão pode analisar e responder aos relatos, atualizar seu status e prioridade e consultar estatísticas.

O frontend é uma aplicação Angular 18 com componentes standalone e usa Firebase Authentication para autenticação e Firebase Realtime Database para persistir usuários e relatos. As telas e os gráficos não usam dados de demonstração: as informações exibidas vêm do banco configurado para a aplicação.

## Funcionalidades

### Estudantes

- Criar uma conta de estudante com nome, e-mail, série e senha.
- Enviar relatos com título, categoria e descrição.
- Consultar o próprio painel, histórico e detalhes dos relatos.
- Acompanhar respostas e mudanças de status.
- Solicitar redefinição de senha por e-mail.

### Gestão

- Consultar o painel e os relatos cadastrados.
- Filtrar relatos, atualizar status e prioridade e responder aos estudantes.
- Exportar os relatos filtrados para CSV.
- Consultar estatísticas calculadas com os relatos do Realtime Database e imprimir a página de relatórios pelo navegador.
- Consultar estudantes e alterar seu status ou remover seu registro no Realtime Database. Remover esse registro não exclui a conta correspondente do Firebase Authentication.

## Tecnologias

- Angular 18, TypeScript, componentes standalone e Signals.
- Firebase Authentication (e-mail e senha).
- Firebase Realtime Database, com atualizações em tempo real.
- Gráficos em SVG, sem biblioteca externa de gráficos.

## Requisitos

- Node.js compatível com Angular 18.
- npm.
- Um projeto Firebase com Authentication por e-mail/senha e Realtime Database habilitados.

## Executar localmente

Na raiz do repositório:

```bash
npm ci
npm start
```

O servidor de desenvolvimento fica disponível em `http://localhost:4200`.

Para gerar o build de produção:

```bash
npm run build
```

Os arquivos compilados são gerados em `dist/speakup/browser`.

## Configuração do Firebase

A configuração usada pela aplicação fica em `src/environments/environment.ts`. Antes de executar o projeto com outro Firebase, preencha `firebaseConfig` com os dados do projeto e habilite o provedor de autenticação **E-mail/senha** no Firebase Authentication.

O Realtime Database deve conter os nós `usuarios` e `relatos`. As regras versionadas em `database.rules.json` restringem a leitura e a gravação: estudantes consultam relatos associados ao próprio UID, enquanto contas com o papel `gestao` podem consultar e gerenciar os relatos. Configure e publique as regras no projeto Firebase:

```bash
firebase deploy --only database
```

Para usar o comando, instale ou disponibilize o Firebase CLI e selecione o projeto Firebase correto. O projeto padrão indicado em `.firebaserc` é `claudespu`; confirme a seleção antes de publicar regras em qualquer ambiente compartilhado.

### Publicar no Firebase Hosting

O Hosting está configurado para publicar `dist/speakup/browser` e redirecionar as rotas da aplicação Angular para `index.html`. Com o Firebase CLI instalado e autenticado, gere o build e publique:

```bash
npm run build
firebase login
firebase deploy --only hosting --project claudespu
```

O endereço publicado será exibido ao final do deploy. Confirme que `claudespu` é o projeto correto antes de publicar. Para atualizações futuras, repita o build e o deploy.

### Contas e papéis

- O cadastro em `/registrar` cria uma conta no Firebase Authentication e grava o perfil com `papel: "aluno"` no Realtime Database.
- Para criar uma conta de gestão, crie a conta no Firebase Authentication e, no Realtime Database, atribua `usuarios/{uid}/papel` o valor `gestao`. O UID é o identificador da conta no Firebase Authentication.
- Não permita que usuários escolham o próprio papel de gestão. As regras do banco permitem que o próprio estudante mantenha o papel `aluno`; a concessão de `gestao` deve ser feita por um administrador do projeto.
- As regras verificam o papel no Realtime Database. Proteções de rota no Angular também separam as áreas de estudante e gestão, mas não substituem as regras do banco.

## Rotas

| Tela | Rota |
| --- | --- |
| Página inicial | `/` |
| Login de estudante | `/login` |
| Login da gestão | `/login-gestao` |
| Cadastro | `/registrar` |
| Termos de uso e privacidade | `/termos-privacidade` |
| Recuperação de senha | `/esqueci-senha` |
| Painel do estudante | `/aluno/dashboard` |
| Novo relato | `/aluno/novo-relato` |
| Histórico de relatos | `/aluno/historico` |
| Detalhe do relato (estudante) | `/aluno/relato/:id` |
| Painel da gestão | `/gestao/dashboard` |
| Gerenciar relatos | `/gestao/relatos` |
| Detalhe do relato (gestão) | `/gestao/relatos/:id` |
| Gerenciar estudantes | `/gestao/usuarios` |
| Relatórios e estatísticas | `/gestao/estatisticas` |

## Estrutura principal

```text
src/
├── app/
│   ├── core/
│   │   ├── guards/       # Proteção de rotas por autenticação e papel
│   │   ├── models/       # Tipos de relatos, usuários e autenticação
│   │   └── services/     # Integração com Authentication e Realtime Database
│   ├── features/
│   │   ├── aluno/        # Painel, envio, histórico e detalhe de relatos
│   │   ├── auth/         # Login, cadastro, recuperação e termos
│   │   └── gestao/       # Painéis e ferramentas de gestão
│   ├── shared/           # Componentes, gráficos, pipes e utilitários
│   ├── app.routes.ts     # Rotas da aplicação
│   └── firebase.ts       # Inicialização dos serviços Firebase
├── assets/               # Recursos estáticos e documentos
└── environments/         # Configuração do Firebase
```

## Publicação no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` compila e publica a aplicação no GitHub Pages quando há um push na branch `master` ou quando o workflow é iniciado manualmente. O build define o caminho-base `/spuIA/` e gera um `404.html` para dar suporte às rotas da aplicação. No repositório, o GitHub Pages deve estar configurado para publicar usando **GitHub Actions**.

O GitHub Pages hospeda apenas o frontend. O Firebase continua sendo necessário para autenticação e persistência de dados, e suas regras devem estar configuradas no projeto Firebase.

## Testes

O `package.json` declara o comando `npm test`, mas atualmente o projeto não possui arquivos de teste `*.spec.ts` nem um target de testes configurado em `angular.json`.
