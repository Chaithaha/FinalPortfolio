// Help command - Show available commands
export const help = {
    description: "Show this help message",
    execute: () => {
        let output = `<div class="command-output">
            <div class="mb-2">Available commands:</div>`;
        
        // This will be populated by the main commands.js file
        const commands = window.commands || {};
        for (const [cmd, details] of Object.entries(commands)) {
            // Skip the help command itself
            if (cmd === 'help') continue;
            output += `<div class="mb-1"><span class="text-green-400">${cmd}</span> - ${details.description}</div>`;
        }
        
        output += `</div>`;
        return output;
    }
};
