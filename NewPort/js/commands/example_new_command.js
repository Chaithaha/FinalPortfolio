// Example: How to create a new command
// This is just an example file - you can delete it or use it as a template

export const example = {
    description: "Example command - shows how to create new commands",
    execute: () => {
        return `<div class="command-output">
            <h2 class="text-xl font-bold mb-4">Example Command</h2>
            <p>This is an example of how to create a new command.</p>
            <div class="mt-4">
                <h3 class="font-bold mb-2">Steps to add this command:</h3>
                <ol class="list-decimal list-inside space-y-1">
                    <li>Rename this file to your command name (e.g., 'skills.js')</li>
                    <li>Update the export name to match your command</li>
                    <li>Modify the description and execute function</li>
                    <li>Import it in commands.js</li>
                    <li>Add it to the commands object</li>
                </ol>
            </div>
        </div>`;
    }
};
