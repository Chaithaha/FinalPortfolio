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

    // Get the mobile input element
    function getMobileInputElement() {
        return document.getElementById('mobile-input');
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
        const mobileInputElement = getMobileInputElement();

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

            // Sync mobile input field
            if (mobileInputElement && mobileInputElement.value !== text) {
                mobileInputElement.value = text;
            }
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
                        <div class="welcome-text">${matrixText}</div>
                    </div>
                </div>
            </div>
            <div class="mb-4">Type <span class="text-green-400 font-bold">'help'</span> to see available commands.</div>
        </div>
        <div class="command-line">
            <span class="prompt">$</span>
            <span id="current-command"></span>
            <input type="text" id="mobile-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" style="position: absolute; left: -9999px; opacity: 0; pointer-events: none;">
        </div>
    `;
    
    terminal.innerHTML = initialContent;

    // Initialize cursor position
    updateCommandText('', 0);

    // Generate star field
    generateStarField();
    
    // Start RGB color cycling and shooting stars immediately
    const welcomeTextEl = document.querySelector('.welcome-text');
    if (welcomeTextEl) {
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
            // Reset cursor position for new command and initialize it
            cursorPosition = 0;
            updateCommandText('', 0);

            // Enhanced scrolling for both desktop and mobile
            setTimeout(() => {
                if ('ontouchstart' in window) {
                    // Mobile-specific enhanced scrolling
                    const terminalBody = document.querySelector('.terminal-body');
                    if (terminalBody) {
                        // Force scroll to bottom immediately
                        terminalBody.scrollTop = terminalBody.scrollHeight;

                        // Additional scroll after a small delay to ensure it works
                        setTimeout(() => {
                            terminalBody.scrollTop = terminalBody.scrollHeight;

                            // Highlight and activate the new command line on mobile
                            const newCommandLine = document.querySelector('.command-line:not(.executed)');
                            if (newCommandLine) {
                                newCommandLine.classList.add('active');

                                // Remove the active class after a delay
                                setTimeout(() => {
                                    newCommandLine.classList.remove('active');
                                }, 2000);
                            }

                            // Re-setup mobile input for the new command line
                            if (typeof window.setupMobileInput === 'function') {
                                window.setupMobileInput();

                                // Focus on mobile
                                setTimeout(() => {
                                    const newMobileInput = document.getElementById('mobile-input');
                                    if (newMobileInput) {
                                        newMobileInput.focus();
                                    }
                                }, 100);
                            }
                        }, 150);
                    }
                } else {
                    // Desktop scrolling
                    window.terminalUtils.scrollToBottom();
                }
            }, 100);
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
    
    // Set up mobile input handling
    const currentCommandElement = getCurrentCommandElement();
    const mobileInputElement = getMobileInputElement();

    if (currentCommandElement && mobileInputElement) {
        // Make current command element focusable for accessibility
        currentCommandElement.setAttribute('tabindex', '0');
        currentCommandElement.setAttribute('role', 'textbox');
        currentCommandElement.setAttribute('aria-label', 'Terminal command input');

        // Handle mobile input events
        mobileInputElement.addEventListener('input', function(e) {
            const text = e.target.value;
            updateCommandText(text, text.length);
        });

        mobileInputElement.addEventListener('keydown', function(e) {
            // Handle special keys
            if (e.key === 'Enter') {
                e.preventDefault();
                const commandText = getCurrentCommandText().trim();

                // Trigger the same logic as desktop keyboard input
                commandHistory.push(commandText);
                currentCommand = commandHistory.length;

                preserveCurrentCommand(terminal);
                const output = executeCommand(commandText, commands);

                if (commandText === 'clear') {
                    const commandOutputs = terminal.querySelectorAll('.command-output:not(:first-child)');
                    commandOutputs.forEach(output => output.remove());
                    const commandLines = terminal.querySelectorAll('.command-line');
                    commandLines.forEach(line => line.remove());
                } else if (commandText === 'easy_mode') {
                    window.location.href = '../Simpler-Portfolio/Simple.html';
                    return;
                } else if (output) {
                    const executedCommand = terminal.querySelector('.command-line.executed:last-child');
                    if (executedCommand) {
                        executedCommand.insertAdjacentHTML('afterend', output);
                    } else {
                        terminal.insertAdjacentHTML('beforeend', output);
                    }
                    window.terminalUtils.smartAutoScrollWithContentDetection();
                }

                addNewCommandLine(terminal);
                cursorPosition = 0;
                updateCommandText('', 0);
                window.terminalUtils.scrollToBottom();

                // Clear mobile input
                e.target.value = '';
            } else if (e.key === 'Backspace') {
                // Let the input handle backspace naturally
                setTimeout(() => {
                    const text = e.target.value;
                    updateCommandText(text, text.length);
                }, 1);
            }
        });

        // Handle focus management - focus hidden mobile input when terminal is clicked
        currentCommandElement.addEventListener('click', function(e) {
            e.preventDefault();
            mobileInputElement.focus();
        });

        currentCommandElement.addEventListener('touchstart', function(e) {
            e.preventDefault();
            mobileInputElement.focus();
        });

        // Sync focus states
        mobileInputElement.addEventListener('focus', function() {
            currentCommandElement.style.backgroundColor = 'rgba(39, 201, 63, 0.05)';
            updateCommandText(this.value, this.value.length);
        });

        mobileInputElement.addEventListener('blur', function() {
            currentCommandElement.style.backgroundColor = 'transparent';
            cursorPosition = this.value.length;
        });

        // Focus terminal on click anywhere
        document.addEventListener('click', function(e) {
            const currentMobileInput = document.getElementById('mobile-input');
            if (e.target.closest('.terminal') && !e.target.closest('.mode-button') && !e.target.closest('.link') && currentMobileInput) {
                currentMobileInput.focus();
            }
        });

        // Auto-focus on mobile
        if ('ontouchstart' in window) {
            setTimeout(() => {
                mobileInputElement.focus();
            }, 500);
        }
    }

    // Global function to ensure mobile input is always properly set up
    window.setupMobileInput = function() {
        const currentCommandElement = document.getElementById('current-command');
        const mobileInputElement = document.getElementById('mobile-input');

        if (currentCommandElement && mobileInputElement) {
            // Clear any existing event listeners by removing and re-adding the input
            const newInput = mobileInputElement.cloneNode(true);
            mobileInputElement.parentNode.replaceChild(newInput, mobileInputElement);

            // Set up input event handler
            newInput.addEventListener('input', function(e) {
                const text = e.target.value;
                if (window.updateCommandText) {
                    window.updateCommandText(text, text.length);
                }

                // Update has-text class on the command line
                const commandLine = currentCommandElement.closest('.command-line');
                if (commandLine) {
                    if (text.trim()) {
                        commandLine.classList.add('has-text');
                    } else {
                        commandLine.classList.remove('has-text');
                    }
                }
            });

            newInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const commandText = currentCommandElement.textContent.trim();

                    // Store this in the global command history
                    if (!window.commandHistory) window.commandHistory = [];
                    if (!window.currentCommand) window.currentCommand = 0;

                    window.commandHistory.push(commandText);
                    window.currentCommand = window.commandHistory.length;

                    // Execute the command using the main terminal logic
                    if (window.executeCommand && window.preserveCurrentCommand && window.addNewCommandLine) {
                        window.preserveCurrentCommand(document.getElementById('terminal-content'));
                        const output = window.executeCommand(commandText, commands);

                        if (commandText === 'clear') {
                            const terminal = document.getElementById('terminal-content');
                            const commandOutputs = terminal.querySelectorAll('.command-output:not(:first-child)');
                            commandOutputs.forEach(output => output.remove());
                            const commandLines = terminal.querySelectorAll('.command-line');
                            commandLines.forEach(line => line.remove());
                        } else if (commandText === 'easy_mode') {
                            window.location.href = '../Simpler-Portfolio/Simple.html';
                            return;
                        } else if (output) {
                            const terminal = document.getElementById('terminal-content');
                            const executedCommand = terminal.querySelector('.command-line.executed:last-child');
                            if (executedCommand) {
                                executedCommand.insertAdjacentHTML('afterend', output);
                            } else {
                                terminal.insertAdjacentHTML('beforeend', output);
                            }
                            window.terminalUtils.smartAutoScrollWithContentDetection();
                        }

                        window.addNewCommandLine(document.getElementById('terminal-content'));

                        // Reset cursor position and initialize it
                        if (window.cursorPosition !== undefined) {
                            window.cursorPosition = 0;
                        }
                        if (window.updateCommandText) {
                            window.updateCommandText('', 0);
                        }

                        // Clear the input
                        e.target.value = '';

                        // Remove has-text class since input is now empty
                        const currentCommandLine = currentCommandElement.closest('.command-line');
                        if (currentCommandLine) {
                            currentCommandLine.classList.remove('has-text');
                        }

                        // Enhanced mobile auto-scroll and focus
                        setTimeout(() => {
                            // Scroll to the new command line and make it visible
                            if ('ontouchstart' in window) {
                                // Mobile-specific scrolling
                                const terminalBody = document.querySelector('.terminal-body');
                                if (terminalBody) {
                                    // Force scroll to bottom immediately
                                    terminalBody.scrollTop = terminalBody.scrollHeight;

                                    // Additional scroll after a small delay to ensure it works
                                    setTimeout(() => {
                                        terminalBody.scrollTop = terminalBody.scrollHeight;

                                        // Highlight and activate the new command line on mobile
                                        const newCommandLine = document.querySelector('.command-line:not(.executed)');
                                        if (newCommandLine) {
                                            newCommandLine.classList.add('active');

                                            // Remove the active class after a delay
                                            setTimeout(() => {
                                                newCommandLine.classList.remove('active');
                                            }, 2000);
                                        }
                                    }, 150);
                                }
                            } else {
                                // Desktop scrolling
                                window.terminalUtils.scrollToBottom();
                            }

                            // Set up mobile input for the new command line
                            window.setupMobileInput();

                            // Re-focus on mobile with a delay to ensure scrolling is complete
                            setTimeout(() => {
                                const newMobileInput = document.getElementById('mobile-input');
                                if (newMobileInput && 'ontouchstart' in window) {
                                    newMobileInput.focus();
                                }
                            }, 200);
                        }, 100);
                    }
                } else if (e.key === 'Backspace') {
                    setTimeout(() => {
                        const text = e.target.value;
                        if (window.updateCommandText) {
                            window.updateCommandText(text, text.length);
                        }
                    }, 1);
                }
            });

            // Set up focus handling
            currentCommandElement.addEventListener('click', function(e) {
                e.preventDefault();
                newInput.focus();
            });

            currentCommandElement.addEventListener('touchstart', function(e) {
                e.preventDefault();
                newInput.focus();
            });
        }
    };

    // Store global references
    window.updateCommandText = updateCommandText;
    window.executeCommand = executeCommand;
    window.preserveCurrentCommand = preserveCurrentCommand;
    window.addNewCommandLine = addNewCommandLine;
    window.commandHistory = commandHistory;
    window.currentCommand = currentCommand;

    // Set up mobile input initially
    setTimeout(() => {
        window.setupMobileInput();
    }, 100);

    // Set up scroll-to-bottom button
    const scrollToBottomBtn = document.getElementById('scroll-to-bottom');
    if (scrollToBottomBtn) {
        // Scroll to bottom function
        const scrollToBottom = () => {
            const terminalBody = document.getElementById('terminal-content');
            if (terminalBody) {
                terminalBody.scrollTop = terminalBody.scrollHeight;

                // Focus on the current command input after scrolling
                setTimeout(() => {
                    const currentCommandElement = getCurrentCommandElement();
                    if (currentCommandElement) {
                        // For mobile, focus on the hidden mobile input
                        const mobileInput = document.getElementById('mobile-input');
                        if (mobileInput) {
                            mobileInput.focus();
                        }
                        // For desktop, click on the command element to trigger focus
                        currentCommandElement.click();
                    }
                }, 100);
            }
        };

        // Add click event listener
        scrollToBottomBtn.addEventListener('click', scrollToBottom);

        // Re-initialize feather icons for the button
        feather.replace();
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