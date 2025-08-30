// Wingman Frontend JavaScript
class WingmanLauncher {
    constructor() {
        this.isLauncherOpen = false;
        this.selectedIndex = 0;
        this.suggestions = [];
        this.commandHistory = [];
        
        this.initializeElements();
        this.bindEvents();
        this.loadCommandHistory();
        this.checkServerStatus();
    }
    
    initializeElements() {
        // Main elements
        this.launcherOverlay = document.getElementById('launcherOverlay');
        this.launcherModal = document.getElementById('launcherModal');
        this.launcherInput = document.getElementById('launcherInput');
        this.suggestionsContainer = document.getElementById('suggestionsContainer');
        this.commandsContainer = document.getElementById('commandsContainer');
        this.outputOverlay = document.getElementById('outputOverlay');
        this.outputContent = document.getElementById('outputContent');
        this.closeOutputBtn = document.getElementById('closeOutputBtn');
        this.serverStatus = document.getElementById('serverStatus');
    }
    
    bindEvents() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.code === 'Space') {
                e.preventDefault();
                this.toggleLauncher();
            } else if (e.key === 'Escape') {
                this.closeLauncher();
                this.closeOutput();
            } else if (e.key === 'F1') {
                e.preventDefault();
                this.showHelp();
            }
        });
        
        // Launcher input events
        this.launcherInput.addEventListener('input', (e) => {
            this.handleInputChange(e.target.value);
        });
        
        this.launcherInput.addEventListener('keydown', (e) => {
            this.handleInputKeydown(e);
        });
        
        // Launcher overlay click to close
        this.launcherOverlay.addEventListener('click', (e) => {
            if (e.target === this.launcherOverlay) {
                this.closeLauncher();
            }
        });
        
        // Output modal events
        this.closeOutputBtn.addEventListener('click', () => {
            this.closeOutput();
        });
        
        this.outputOverlay.addEventListener('click', (e) => {
            if (e.target === this.outputOverlay) {
                this.closeOutput();
            }
        });
        
        // Feature card clicks
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                this.handleFeatureCardClick(index);
            });
        });
    }
    
    toggleLauncher() {
        if (this.isLauncherOpen) {
            this.closeLauncher();
        } else {
            this.openLauncher();
        }
    }
    
    openLauncher() {
        this.isLauncherOpen = true;
        this.launcherOverlay.classList.add('active');
        this.launcherInput.focus();
        this.launcherInput.value = '';
        this.selectedIndex = 0;
        this.loadSuggestions('');
        this.updateStatusText('Launcher opened • Type a command');
    }
    
    closeLauncher() {
        this.isLauncherOpen = false;
        this.launcherOverlay.classList.remove('active');
        this.updateStatusText('Ready • Press Ctrl+Space to start');
    }
    
    closeOutput() {
        this.outputOverlay.classList.remove('active');
    }
    
    async handleInputChange(query) {
        await this.loadSuggestions(query);
        this.selectedIndex = 0;
        this.updateSelectionHighlight();
    }
    
    handleInputKeydown(e) {
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                this.selectedIndex = Math.max(0, this.selectedIndex - 1);
                this.updateSelectionHighlight();
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.selectedIndex = Math.min(this.suggestions.length - 1, this.selectedIndex + 1);
                this.updateSelectionHighlight();
                break;
            case 'Enter':
                e.preventDefault();
                this.executeSelectedCommand();
                break;
            case 'Tab':
                e.preventDefault();
                if (this.suggestions.length > 0) {
                    this.launcherInput.value = this.suggestions[this.selectedIndex].name;
                }
                break;
        }
    }
    
    handleFeatureCardClick(index) {
        const commands = [
            'open vscode',
            'volume up',
            'github issues',
            ''
        ];
        
        if (commands[index]) {
            this.openLauncher();
            this.launcherInput.value = commands[index];
            this.handleInputChange(commands[index]);
        }
    }
    
    async loadSuggestions(query = '') {
        try {
            const response = await fetch(`/api/commands/suggest?query=${encodeURIComponent(query)}`);
            const data = await response.json();
            
            this.suggestions = data.suggestions || [];
            this.renderSuggestions();
        } catch (error) {
            console.error('Failed to load suggestions:', error);
            this.suggestions = [];
            this.renderSuggestions();
        }
    }
    
    renderSuggestions() {
        if (this.suggestions.length === 0) {
            this.suggestionsContainer.innerHTML = `
                <div class="suggestion-item">
                    <div class="suggestion-icon app">❓</div>
                    <div class="suggestion-content">
                        <div class="suggestion-title">No suggestions found</div>
                        <div class="suggestion-description">Try typing a different command</div>
                    </div>
                </div>
            `;
            return;
        }
        
        this.suggestionsContainer.innerHTML = this.suggestions.map((suggestion, index) => {
            const iconClass = this.getIconClass(suggestion.type);
            const icon = this.getIcon(suggestion.type);
            
            return `
                <div class="suggestion-item ${index === this.selectedIndex ? 'selected' : ''}" data-index="${index}">
                    <div class="suggestion-icon ${iconClass}">${icon}</div>
                    <div class="suggestion-content">
                        <div class="suggestion-title">${this.escapeHtml(suggestion.name)}</div>
                        <div class="suggestion-description">${this.escapeHtml(suggestion.description)}</div>
                    </div>
                    <div class="suggestion-type">${suggestion.type.toUpperCase()}</div>
                </div>
            `;
        }).join('');
        
        // Add click handlers to suggestion items
        this.suggestionsContainer.querySelectorAll('.suggestion-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                this.selectedIndex = index;
                this.executeSelectedCommand();
            });
        });
    }
    
    updateSelectionHighlight() {
        this.suggestionsContainer.querySelectorAll('.suggestion-item').forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedIndex);
        });
        
        // Scroll selected item into view
        const selectedItem = this.suggestionsContainer.querySelector('.suggestion-item.selected');
        if (selectedItem) {
            selectedItem.scrollIntoView({ block: 'nearest' });
        }
    }
    
    async executeSelectedCommand() {
        const command = this.launcherInput.value.trim();
        if (!command) return;
        
        this.updateStatusText('Executing command...');
        this.closeLauncher();
        
        try {
            const response = await fetch('/api/commands/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ command })
            });
            
            const result = await response.json();
            
            // Add to command history
            this.addToCommandHistory(command, result);
            
            // Show output if there's formatted content
            if (result.formatted || result.message) {
                this.showOutput(result);
            }
            
            if (result.success) {
                this.updateStatusText(`Command executed: ${command}`);
            } else {
                this.updateStatusText(`Command failed: ${result.message}`);
            }
            
        } catch (error) {
            console.error('Failed to execute command:', error);
            this.updateStatusText('Failed to execute command');
            this.showOutput({
                success: false,
                message: `Network error: ${error.message}`,
                formatted: `❌ Error executing command "${command}"\n\nNetwork error: ${error.message}`
            });
        }
    }
    
    showOutput(result) {
        const content = result.formatted || result.message || 'No output';
        this.outputContent.textContent = content;
        this.outputOverlay.classList.add('active');
    }
    
    addToCommandHistory(command, result) {
        const historyItem = {
            command,
            result,
            timestamp: new Date()
        };
        
        this.commandHistory.unshift(historyItem);
        
        // Keep only last 10 commands
        if (this.commandHistory.length > 10) {
            this.commandHistory = this.commandHistory.slice(0, 10);
        }
        
        this.saveCommandHistory();
        this.renderCommandHistory();
    }
    
    renderCommandHistory() {
        if (this.commandHistory.length === 0) {
            this.commandsContainer.innerHTML = `
                <div class="no-commands">
                    <p>No commands executed yet. Try opening the launcher!</p>
                </div>
            `;
            return;
        }
        
        this.commandsContainer.innerHTML = this.commandHistory.map(item => {
            const statusIcon = item.result.success ? '✅' : '❌';
            const timeStr = this.formatTime(item.timestamp);
            
            return `
                <div class="command-item">
                    <div class="command-text">${statusIcon} ${this.escapeHtml(item.command)}</div>
                    <div class="command-time">${timeStr}</div>
                </div>
            `;
        }).join('');
    }
    
    loadCommandHistory() {
        try {
            const saved = localStorage.getItem('wingman-command-history');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.commandHistory = parsed.map(item => ({
                    ...item,
                    timestamp: new Date(item.timestamp)
                }));
            }
        } catch (error) {
            console.error('Failed to load command history:', error);
            this.commandHistory = [];
        }
        
        this.renderCommandHistory();
    }
    
    saveCommandHistory() {
        try {
            localStorage.setItem('wingman-command-history', JSON.stringify(this.commandHistory));
        } catch (error) {
            console.error('Failed to save command history:', error);
        }
    }
    
    async checkServerStatus() {
        try {
            const response = await fetch('/api/commands/suggest?query=');
            if (response.ok) {
                this.serverStatus.textContent = 'Server: Running';
                this.serverStatus.className = 'server-status';
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            this.serverStatus.textContent = 'Server: Error';
            this.serverStatus.className = 'server-status error';
        }
    }
    
    showHelp() {
        const helpText = `
🚀 Wingman Productivity Launcher - Help

📋 Keyboard Shortcuts:
• Ctrl+Space - Open/Close launcher
• ↑/↓ - Navigate suggestions
• Enter - Execute command
• Tab - Autocomplete
• Esc - Close launcher/modal
• F1 - Show this help

🔧 Available Commands:
• open <app> - Launch applications (vscode, notepad, calculator, etc.)
• shutdown - Shutdown computer
• restart - Restart computer
• lock - Lock screen
• volume up/down - Control volume
• github issues - Show GitHub issues
• weather [location] - Get weather info
• utils <command> - Utility functions (uuid, time, ip, password)

💡 Tips:
• Type partial commands for suggestions
• Use arrow keys to navigate
• Commands are saved in history
• Extensions provide additional functionality

Built with ❤️ by Varun
        `;
        
        this.showOutput({
            success: true,
            message: 'Help Information',
            formatted: helpText.trim()
        });
    }
    
    getIconClass(type) {
        switch (type) {
            case 'app': return 'app';
            case 'system': return 'system';
            case 'extension': return 'extension';
            default: return 'app';
        }
    }
    
    getIcon(type) {
        switch (type) {
            case 'app': return '🚀';
            case 'system': return '⚙️';
            case 'extension': return '🧩';
            default: return '❓';
        }
    }
    
    formatTime(date) {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    updateStatusText(text) {
        const statusText = document.querySelector('.status-text');
        if (statusText) {
            statusText.textContent = text;
        }
    }
}

// Initialize the launcher when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.wingmanLauncher = new WingmanLauncher();
    
    // Add some visual feedback for loading
    document.body.classList.add('loaded');
    
    console.log('🚀 Wingman Launcher initialized');
    console.log('💡 Press Ctrl+Space to open the command launcher');
    console.log('💡 Press F1 for help');
});

// Global error handling
window.addEventListener('error', (event) => {
    console.error('Wingman Error:', event.error);
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker will be added in future updates
        console.log('Service Worker support detected');
    });
}