// Import individual command modules
import { help } from './commands/help.js';
import { about } from './commands/about.js';
import { projects } from './commands/projects.js';
import { contact } from './commands/contact.js';
import { clear } from './commands/clear.js';
import { easy_mode } from './commands/easy_mode.js';

// Available commands for the terminal
export const commands = {
    help,
    about,
    projects,
    contact,
    clear,
};

// Make commands available globally for the help command
window.commands = commands;
