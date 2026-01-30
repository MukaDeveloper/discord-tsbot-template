import { Client, DiscordAPIError } from 'discord.js';

export function errorsHandler(client: Client, error: any): string {
  if (error instanceof DiscordAPIError) {
    if (error.code === 10008) {
      if (process.env.NODE_ENV !== 'production') console.dir(error);
      return `Houve um erro com a mensagem.`;
    }
    if (error.code === 50007) {
      if (process.env.NODE_ENV !== 'production')
        console.dir(
          'Usuário tentou usar o comando vínculo com a DM desativada.',
        );
      return `Para maior privacidade e controle da operação, ative suas mensagens privadas e tente novamente.\nAcesse: Configurações de Usuário > Privacidade e Segurança > Permitir mensagens diretas de membros do servidor.`;
    }
    if (error.code === 50013) {
      if (process.env.NODE_ENV !== 'production') console.dir(error);
      return `Não tenho permissões o suficiente para realizar o método \`${error.method}\`. `;
    }
    if (error.code === 50014) {
      if (process.env.NODE_ENV !== 'production') console.dir(error);
      return `Chave de autenticação (token) inválida.`;
    }
    console.log(`Código de erro não registrado no \'handler\': ${error.code}
              Erro completo:
              ${error}`);
    return 'Ocorreu um erro inesperado. Veja o console para mais detalhes.';
  } else {
    return 'Erro inesperado:\n' + error;
  }
}
