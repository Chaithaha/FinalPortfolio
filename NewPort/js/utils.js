// Utility functions for the terminal

// Function to get current command element
function getCurrentCommandElement() {
    return document.getElementById('current-command');
}

// Function to preserve current command line as static display
function preserveCurrentCommand(terminal) {
    const currentCommandElement = getCurrentCommandElement();
    if (!currentCommandElement) return;
    
    const commandText = currentCommandElement.textContent.trim();
    if (!commandText) return;
    
    // Create static command line HTML without cursor
    const staticCommandLineHTML = `
        <div class="command-line executed">
            <span class="prompt">$</span>
            <span class="command-text">${escapeHtml(commandText)}</span>
        </div>
    `;
    
    // Insert the static command line before the current command line (not before terminal)
    currentCommandElement.parentElement.insertAdjacentHTML('beforebegin', staticCommandLineHTML);
}

// Function to escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Function to add new command line
function addNewCommandLine(terminal) {
    // Remove any existing command line first - look in the entire document
    const existingCommandLine = document.querySelector('.command-line:not(.executed)');
    if (existingCommandLine) {
        existingCommandLine.remove();
    }
    
    const commandLineHTML = `
        <div class="command-line">
            <span class="prompt">$</span>
            <span id="current-command"></span>
            <span class="cursor"></span>
        </div>
    `;
    terminal.insertAdjacentHTML('beforeend', commandLineHTML);
}

// Function to execute a command
function executeCommand(commandText, commands) {
    if (commands[commandText]) {
        return commands[commandText].execute();
    } else if (commandText) {
        return `<div class="command-output text-red-400">Command not found: ${commandText}. Type 'help' for available commands.</div>`;
    }
    return '';
}

// Function to handle command history navigation
function navigateHistory(direction, commandHistory, currentCommand, currentCommandElement) {
    if (direction === 'up') {
        if (commandHistory.length > 0 && currentCommand > 0) {
            currentCommand--;
            if (currentCommandElement) {
                currentCommandElement.textContent = commandHistory[currentCommand];
            }
        }
    } else if (direction === 'down') {
        if (currentCommand < commandHistory.length - 1) {
            currentCommand++;
            if (currentCommandElement) {
                currentCommandElement.textContent = commandHistory[currentCommand];
            }
        } else {
            currentCommand = commandHistory.length;
            if (currentCommandElement) {
                currentCommandElement.textContent = '';
            }
        }
    }
    return currentCommand;
}


// Global functions for auto-scroll functionality
window.terminalUtils = {
    smartAutoScroll: function() {
        const terminalBody = document.querySelector('.terminal-body');
        const commandLines = document.querySelectorAll('.command-line');
        
        if (!terminalBody || commandLines.length === 0) return;
        
        // Get the last command line (current command)
        const lastCommandLine = commandLines[commandLines.length - 1];
        
        // Calculate if the cursor is visible
        const terminalRect = terminalBody.getBoundingClientRect();
        const commandRect = lastCommandLine.getBoundingClientRect();
        
        // Check if cursor is below the visible area
        const cursorIsBelowVisible = commandRect.bottom > terminalRect.bottom;
        
        if (cursorIsBelowVisible) {
            // Calculate how much to scroll to keep cursor visible
            const scrollAmount = commandRect.bottom - terminalRect.bottom;
            
            // Smooth scroll to keep cursor visible
            terminalBody.scrollTo({
                top: terminalBody.scrollTop + scrollAmount + 20, // Add 20px buffer
                behavior: 'smooth'
            });
        }
    },

    smartAutoScrollWithContentDetection: function() {
        const terminalBody = document.querySelector('.terminal-body');
        if (!terminalBody) return;
        
        // Store current scroll position
        const currentScrollTop = terminalBody.scrollTop;
        const currentScrollHeight = terminalBody.scrollHeight;
        const currentClientHeight = terminalBody.clientHeight;
        
        // Use a small delay to allow content to be added to the DOM
        setTimeout(() => {
            const newScrollHeight = terminalBody.scrollHeight;
            const heightDifference = newScrollHeight - currentScrollHeight;
            
            if (heightDifference > 0) {
                // Content was added, scroll to keep cursor visible
                const targetScrollTop = currentScrollTop + heightDifference;
                
                // Check if we need to adjust to keep cursor visible
                const cursorPosition = targetScrollTop + currentClientHeight;
                const maxScroll = newScrollHeight - currentClientHeight;
                
                if (cursorPosition > newScrollHeight) {
                    // Cursor would be below content, scroll to show it
                    terminalBody.scrollTo({
                        top: maxScroll,
                        behavior: 'smooth'
                    });
                } else {
                    // Content added but cursor still visible, just scroll with content
                    terminalBody.scrollTo({
                        top: targetScrollTop,
                        behavior: 'smooth'
                    });
                }
            } else {
                // No content added, use basic smart scroll
                this.smartAutoScroll();
            }
        }, 50); // Small delay to ensure DOM is updated
    },

    scrollToBottom: function() {
        const terminalBody = document.querySelector('.terminal-body');
        if (!terminalBody) return;
        
        terminalBody.scrollTo({
            top: terminalBody.scrollHeight,
            behavior: 'smooth'
        });
    }
};
