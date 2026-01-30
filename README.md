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