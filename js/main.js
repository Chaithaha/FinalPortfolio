// Import commands
import { commands } from './commands.js';

// Main terminal functionality
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    
    const terminal = document.getElementById('terminal-content');
    let commandHistory = [];
    let currentCommand = 0;
    let cursorPosition = 0; // Track cursor position within the command text

    // Function to create Matrix-style character spans
    function createMatrixText(text) {
        return text.split('').map(char => {
            if (char === ' ') {
                return '<span class="matrix-char">&nbsp;</span>';
            }
            return `<span class="matrix-char">${char}</span>`;
        }).join('');
    }
    
    // Get the current command element
    function getCurrentCommandElement() {
        return document.getElementById('current-command');
    }

    // Get the current command text
    function getCurrentCommandText() {
        const element = getCurrentCommandElement();
        if (element) {
            // Remove the cursor element and get text content
            const clone = element.cloneNode(true);
            const cursor = clone.querySelector('.cursor');
            if (cursor) cursor.remove();
            return clone.textContent;
        }
        return '';
    }

    // Update command text with cursor position
    function updateCommandText(text, position = null) {
        const element = getCurrentCommandElement();
        if (element) {
            if (position !== null) {
                cursorPosition = Math.max(0, Math.min(position, text.length));
            } else {
                cursorPosition = text.length;
            }

            // Split text at cursor position and insert cursor
            const beforeCursor = text.slice(0, cursorPosition);
            const afterCursor = text.slice(cursorPosition);

            // Use innerHTML to properly render the cursor
            element.innerHTML = beforeCursor + '<span class="cursor"></span>' + afterCursor;
        }
    }

    // Insert character at cursor position
    function insertAtCursor(char) {
        const text = getCurrentCommandText();
        const newText = text.slice(0, cursorPosition) + char + text.slice(cursorPosition);
        updateCommandText(newText, cursorPosition + 1);
    }

    // Delete character at cursor position (backspace)
    function deleteAtCursor() {
        const text = getCurrentCommandText();
        if (cursorPosition > 0) {
            const newText = text.slice(0, cursorPosition - 1) + text.slice(cursorPosition);
            updateCommandText(newText, cursorPosition - 1);
        }
    }
    
    // Initial content with enhanced retro game title
    const welcomeLines = ["Chait", "the Developer"];
    let matrixText = '';
    welcomeLines.forEach((line, lineIndex) => {
        const lineSpans = createMatrixText(line);
        matrixText += lineSpans + (lineIndex < welcomeLines.length - 1 ? '<br>' : '');
    });
    
    const initialContent = `
        <div class="command-output">
            <div class="welcome-container">
                <div class="pixel-logo-container">
                    <div class="star-field" id="star-field"></div>
                    <div class="text-container">
                        <div class="welcome-text typing">${matrixText}</div>
                    </div>
                </div>
            </div>
            <div class="mb-4">Type <span class="text-green-400 font-bold">'help'</span> to see available commands.</div>
        </div>
        <div class="command-line">
            <span class="prompt">$</span>
            <span id="current-command"></span>
        </div>
    `;
    
    terminal.innerHTML = initialContent;

    // Initialize cursor position
    updateCommandText('', 0);

    // Generate star field
    generateStarField();
    
    // Start with white text; begin RGB cycle after typing animation completes
    const welcomeTextEl = document.querySelector('.welcome-text');
    if (welcomeTextEl) {
        welcomeTextEl.addEventListener('animationend', function(e) {
            if (e.animationName === 'typing') {
                setTimeout(() => {
                    const matrixChars = welcomeTextEl.querySelectorAll('.matrix-char');
                    matrixChars.forEach((node, index) => {
                        node.classList.add('rgb-on');
                        // Random duration between 2-4 seconds
                        const duration = 2 + Math.random() * 2;
                        // Delay based on character position plus some randomness
                        const delay = (index * 0.1) + (Math.random() * 0.5);
                        node.style.animationDuration = duration + 's';
                        node.style.animationDelay = delay + 's';
                    });
                    
                    // Start shooting stars after layout is stable
                    startShootingStars();
                }, 300);
            }
        }, { once: true });
    }
    
    // Handle keyboard input
    document.addEventListener('keydown', function(e) {
        const currentCommandElement = getCurrentCommandElement();
        
        if (e.key === 'Enter') {
            e.preventDefault();
            
            const commandText = currentCommandElement.textContent.trim();
            commandHistory.push(commandText);
            currentCommand = commandHistory.length;
            
            // Preserve the current command line before executing
            preserveCurrentCommand(terminal);
            
            const output = executeCommand(commandText, commands);
            
            // Handle special commands
            if (commandText === 'clear') {
                // Clear only command outputs, preserve initial welcome content
                const commandOutputs = terminal.querySelectorAll('.command-output:not(:first-child)');
                commandOutputs.forEach(output => output.remove());
                
                // Remove all command lines including executed ones
                const commandLines = terminal.querySelectorAll('.command-line');
                commandLines.forEach(line => line.remove());
            } else if (commandText === 'easy_mode') {
                // Redirect to easy mode
                window.location.href = '../Simpler-Portfolio/Simple.html';
                return; // Exit early since we're redirecting
            } else if (output) {
                // Add output after the executed command line (not at the end of terminal)
                const executedCommand = terminal.querySelector('.command-line.executed:last-child');
                if (executedCommand) {
                    executedCommand.insertAdjacentHTML('afterend', output);
                } else {
                    // Fallback to end of terminal if no executed command found
                    terminal.insertAdjacentHTML('beforeend', output);
                }
                
                // Add smart auto-scroll after displaying command output
                window.terminalUtils.smartAutoScrollWithContentDetection();
            }
            
            // Add new command line (this will remove the old one)
            addNewCommandLine(terminal);
            // Reset cursor position for new command
            cursorPosition = 0;

            window.terminalUtils.scrollToBottom();
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            deleteAtCursor();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const text = getCurrentCommandText();
            cursorPosition = Math.max(0, cursorPosition - 1);
            updateCommandText(text, cursorPosition); // Update visual cursor
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            const text = getCurrentCommandText();
            cursorPosition = Math.min(text.length, cursorPosition + 1);
            updateCommandText(text, cursorPosition); // Update visual cursor
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0 && currentCommand > 0) {
                currentCommand--;
                const text = commandHistory[currentCommand];
                updateCommandText(text, text.length); // Position cursor at end
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (currentCommand < commandHistory.length - 1) {
                currentCommand++;
                const text = commandHistory[currentCommand];
                updateCommandText(text, text.length); // Position cursor at end
            } else {
                currentCommand = commandHistory.length;
                updateCommandText('', 0); // Empty command
            }
        } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            insertAtCursor(e.key);
        }
    });
    
    // Focus on terminal when clicking anywhere
    document.addEventListener('click', function() {
        const currentCommandElement = getCurrentCommandElement();
        if (currentCommandElement) {
            currentCommandElement.focus();
        }
    });
    
    // Make the current command element focusable
    const currentCommandElement = getCurrentCommandElement();
    if (currentCommandElement) {
        currentCommandElement.setAttribute('tabindex', '0');
    }
});

// Generate star field background
function generateStarField() {
    const starField = document.getElementById('star-field');
    if (!starField) return;
    
    const starCount = 0; // Just one subtle star
    const containerRect = starField.parentElement.getBoundingClientRect();
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Keep them small and subtle
        star.classList.add('small');
        
        // Fixed position in the top-right corner
        star.style.left = '85%';
        star.style.top = '15%';
        
        // Gentle animation
        star.style.animationDelay = '0.5s';
        
        starField.appendChild(star);
    }
}

// Generate sparkle effects around the text
function generateSparkles() {
    const pixelLogoContainer = document.querySelector('.pixel-logo-container');
    if (!pixelLogoContainer) return;
    
    const sparkleCount = 8;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        if (Math.random() > 0.5) {
            sparkle.classList.add('rainbow');
        }
        
        // Position sparkles around the text area
        const angle = (Math.PI * 2 * i) / sparkleCount;
        const radius = 40 + Math.random() * 20;
        const centerX = 50;
        const centerY = 50;
        
        sparkle.style.left = (centerX + Math.cos(angle) * radius) + '%';
        sparkle.style.top = (centerY + Math.sin(angle) * radius) + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        
        pixelLogoContainer.appendChild(sparkle);
    }
}

// Create shooting stars
function createShootingStar() {
    const welcomeContainer = document.querySelector('.welcome-container');
    if (!welcomeContainer) return;
    
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    // Random starting position
    shootingStar.style.left = Math.random() * 20 + '%';
    shootingStar.style.top = Math.random() * 30 + '%';
    
    // Apply animation
    shootingStar.style.animation = 'shootingStar 2s linear';
    
    welcomeContainer.appendChild(shootingStar);
    
    // Remove shooting star after animation
    setTimeout(() => {
        if (shootingStar.parentNode) {
            shootingStar.parentNode.removeChild(shootingStar);
        }
    }, 2000);
}

// Start shooting stars periodically
function startShootingStars() {
    // Create initial shooting star
    setTimeout(createShootingStar, 1000);
    
    // Create shooting stars periodically
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every interval
            createShootingStar();
        }
    }, 3000);
}