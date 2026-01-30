# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Unreleased]

## [1.0.1] - 2026-01-30

### Added

- Comando `/uptime` para exibir tempo de atividade do bot (usa `time.util` para formatação)
- Pacote `tsconfig-paths` e script `start:dev` com `-r tsconfig-paths/register` para resolver path aliases em desenvolvimento
- Seção "Criando um Comando/Evento" no README com passos para adicionar comandos e eventos
- Comando `/ping` passa a exibir latência do WebSocket e tempo de resposta (via `deferReply({ withResponse: true })`)

### Changed

- Comando ping movido de `ping.ts` para `ping.command.ts` (convenção de nome)
- Script de desenvolvimento renomeado de `dev` para `start:dev`
- `responseResolver` refatorado: função assíncrona que chama `reply`/`editReply`/`followUp` diretamente em vez de `.bind(interaction)`
- Evento do client de `ready` para `clientReady` em `client.ts`
- Dependência `discord.js` atualizada para `^14.25.1`
- Lista de comandos em `index.ts`: `PingCommand` e `UptimeCommand`

### Removed

- Arquivo `src/application/commands/ping.ts` (substituído por `ping.command.ts`)

## [1.0.0] - 2026-01-30

### Added

- Arquitetura em camadas: `application`, `domain` e `infrastructure`
- Path aliases no TypeScript (`@application/*`, `@domain/*`, `@infrastructure/*`, `@shared/*`)
- `baseUrl` no `tsconfig.json` para resolução dos path aliases
- Pacote `tsc-alias` no build para reescrever aliases em caminhos relativos no output
- Configuração Prettier (`.prettierrc`)
- Registry de comandos e de eventos para registro dinâmico
- Publicador de comandos slash via REST
- Handler de interações com filtro para comandos de chat
- Handler de erros e `responseResolver` para respostas à interação com contexto correto
- Utilitários de tempo em `shared/utils` (`time.constants.ts`, `time.util.ts`)
- Interfaces de domínio: `Command` e `Event`

### Changed

- `main.ts` passa a usar `createClient` da infraestrutura Discord
- Script de build: `tsc && tsc-alias -p tsconfig.json` para resolver aliases após compilação
- README atualizado com estrutura de pastas da nova arquitetura
- Evento `interactionCreate` tipado com `Interaction` (genérico)
- Comando ping: `await interaction.deferReply()` e uso de `responseResolver` com `editReply`
- `responseResolver` passa a retornar função que preserva o `this` da interação (`.bind(interaction)`)

### Fixed

- Erro `MODULE_NOT_FOUND` para `@infrastructure/discord/client` em tempo de execução (aliases não reescritos no `dist/`)
- Erro `Cannot read properties of undefined (reading 'deferred')` ao executar `/ping`, causado por perda de contexto `this` em `interaction.reply`

### Removed

- Estrutura antiga de comandos em `src/commands/` e eventos em `src/events/`
- Handler de comandos, interfaces e utilitários em `src/shared/handlers/` e `src/shared/interfaces/`
- `shared.service.ts`, `base-command.ts`, `collections.ts`
- `default-values.ts` (substituído por `time.constants.ts` e `time.util.ts`)
- Evento `on-ready` como arquivo separado (lógica incorporada em `client.ts`)

[Unreleased]: https://github.com/owner/repo/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/owner/repo/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/owner/repo/releases/tag/v1.0.0
