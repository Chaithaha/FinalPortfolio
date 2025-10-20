// Import commands
import { commands } from './commands.js';

// Main terminal functionality
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    
    const terminal = document.getElementById('terminal-content');
    let commandHistory = [];
    let currentCommand = 0;

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
            <span class="cursor"></span>
        </div>
    `;
    
    terminal.innerHTML = initialContent;
    
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
            
            window.terminalUtils.scrollToBottom();
        } else if (e.key === 'Backspace') {
            if (currentCommandElement) {
                currentCommandElement.textContent = currentCommandElement.textContent.slice(0, -1);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentCommand = navigateHistory('up', commandHistory, currentCommand, currentCommandElement);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentCommand = navigateHistory('down', commandHistory, currentCommand, currentCommandElement);
        } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
            if (currentCommandElement) {
                currentCommandElement.textContent += e.key;
            }
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