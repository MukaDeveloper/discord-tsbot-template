# discord-tsbot-template

Template para uma aplicação da plataforma `Discord` feita em `Typescript` por `MukaDeveloper`

## Primeiros passos

- Para iniciar a aplicação, copie e cole o arquivo `.env.example`, e renomeie para `.env`.
- Preencha os campos necessários -> `CLIENT_TOKEN`, `CLIENT_ID` e `OWNER_ID`.

Para mais informações sobre informações do CLIENT. Acesse a [documentação do discord](https://discord.com/developers/docs/quick-start/getting-started#fetching-your-credentials)

## Personalização

- Se quiser uma personalização mais detalhada, acesse o arquivo 
```
└── 📁 src
    └── 📁 infrastructure
        └── 📁 discord
            └── 📄 client.ts
```
E faça a edição das `activities` que serão exibidas no perfil da aplicação dentro do servidor.

## Criando um Comando/Evento

- Para criar um novo comando e/ou um novo evento. Siga esses passos:

1. Crie o arquivo no diretório indicado em 
```
└── 📁 src
    └── 📁 application
        ├── 📁 commands
        └── 📁 events
```

2. Após criar a classe e seu método, implementando a base `Command` ou `Event`, insira sua nova instância dentro da listagem, no arquivo `index.ts` localizado dentro do diretório

3. Dessa forma, seu comando/evento será automaticamente registrado ao reiniciar a aplicação. `Reinicie` sua aplicação e faça o teste.