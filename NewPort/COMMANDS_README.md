# Terminal Portfolio Commands Structure

This document explains the new modular structure of the terminal portfolio commands.

## Directory Structure

```
js/
├── commands.js          # Main commands file that imports all individual commands
├── main.js             # Main terminal functionality
├── utils.js            # Utility functions
└── commands/           # Individual command files
    ├── help.js         # Help command
    ├── about.js        # About command
    ├── projects.js     # Projects command
    ├── contact.js      # Contact command
    ├── clear.js        # Clear command
    └── easy_mode.js    # Easy mode command
```

## How to Edit Commands

Each command is now in its own file within the `js/commands/` directory. To modify a command:

1. **Edit the specific command file** (e.g., `js/commands/about.js`)
2. **The changes will automatically be reflected** in the terminal when you refresh the page

## Command File Structure

Each command file exports an object with two properties:

```javascript
export const commandName = {
    description: "Description shown in help command",
    execute: () => {
        // Return HTML string to display in terminal
        return `<div class="command-output">...</div>`;
    }
};
```

## Available Commands

- **help** - Shows all available commands
- **about** - Displays personal information and skills
- **projects** - Shows portfolio projects
- **contact** - Displays contact information
- **clear** - Clears the terminal
- **easy_mode** - Redirects to the simpler portfolio

## Adding New Commands

To add a new command:

1. Create a new file in `js/commands/` (e.g., `newcommand.js`)
2. Export the command object following the structure above
3. Import it in `js/commands.js`
4. Add it to the commands object

## Benefits of This Structure

- **Better organization**: Each command is in its own file
- **Easier maintenance**: Edit individual commands without affecting others
- **Modular design**: Commands can be easily added, removed, or modified
- **Better version control**: Changes to specific commands are isolated
