const { InteractionType } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(client, interaction) {
    if(interaction.isChatInputCommand()){
      const { slashCommands } = client;
      const { commandName } = interaction;
      const command = slashCommands.get(commandName);
      if(!command) return;
      try {
        await command.runSlash(client, interaction)
      } catch (error) {
        console.error(error);
        await interaction.reply({content: `Une erreur est survenue lors de l'éxecution de la commande`, ephemeral: true});
      }
    }else if (interaction.isButton()){
      const { buttons } = client;
      const {customId} = interaction;
      const button = buttons.get(customId) || buttons.find(btn => btn.data?.ids?.includes(customId));
      if(!button) return new Error(`Button with customId ${customId} not found`);

      try {
        await button.execute(client, interaction);
      } catch (error) {
        console.error(error);
        // await interaction.reply({content: `Une erreur est survenue lors de l'éxecution de la commande`, ephemeral: true});
      }

    }else if (interaction.isSelectMenu()){
      const { selectMenus } = client;
      const {customId} = interaction;
      const menu = selectMenus.get(customId) || selectMenus.find(m => m.data?.ids?.includes(customId));
      if(!menu) return new Error(`SelectMenu with customId ${customId} not found`);
      
      try {
        await menu.execute(client, interaction);
      } catch (error) {
        console.error(error);
        // await interaction.reply({content: `Une erreur est survenue lors de l'éxecution de la commande`, ephemeral: true});
      }
    }else if(interaction.type == InteractionType.ModalSubmit){
      const { modals } = client;
      const {customId} = interaction;

      const modal = modals.get(customId) || modals.find(modal => modal.data?.ids?.includes(customId));
      if(!modal) return new Error(`Modal with customId ${customId} not found`);

      try {
        await modal.execute(client, interaction);
      } catch (error) {
        console.error(error);
        // await interaction.reply({content: `Une erreur est survenue lors de l'éxecution de la commande`, ephemeral: true});
      }
    }else if (interaction.isContextMenuCommand()){
      const { slashCommands } = client;
      const { commandName } = interaction;
      const contextCommand = slashCommands.get(commandName) || slashCommands.find(cmd => cmd.data?.ids?.includes(commandName));
      if(!contextCommand) return;

      try {
        await contextCommand.runContextMenu(client, interaction)
      } catch (error) {
        console.error(error);
        await interaction.reply({content: `Une erreur est survenue lors de l'éxecution de la commande`, ephemeral: true});
      }
    }
  },
}