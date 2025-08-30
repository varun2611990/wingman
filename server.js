const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Store for command history and configuration
let commandHistory = [];
let config = {
  shortcuts: {
    openLauncher: 'Ctrl+Space'
  },
  extensions: []
};

// API Routes

// Get command suggestions/autocomplete
app.get('/api/commands/suggest', (req, res) => {
  const { query } = req.query;
  
  const commands = [
    { name: 'open vscode', description: 'Open Visual Studio Code', type: 'app' },
    { name: 'open notepad', description: 'Open Notepad', type: 'app' },
    { name: 'open calculator', description: 'Open Calculator', type: 'app' },
    { name: 'shutdown', description: 'Shutdown computer', type: 'system' },
    { name: 'restart', description: 'Restart computer', type: 'system' },
    { name: 'lock', description: 'Lock screen', type: 'system' },
    { name: 'volume up', description: 'Increase volume', type: 'system' },
    { name: 'volume down', description: 'Decrease volume', type: 'system' },
    { name: 'github issues', description: 'List GitHub issues', type: 'extension' },
    { name: 'weather', description: 'Get weather info', type: 'extension' }
  ];

  let suggestions = commands;
  if (query) {
    suggestions = commands.filter(cmd => 
      cmd.name.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  res.json({ suggestions: suggestions.slice(0, 10) });
});

// Execute command
app.post('/api/commands/execute', async (req, res) => {
  const { command, args = [] } = req.body;
  
  try {
    const result = await executeCommand(command, args);
    
    // Add to history
    commandHistory.unshift({
      command,
      args,
      timestamp: new Date().toISOString(),
      result: result.success ? 'success' : 'error'
    });
    
    // Keep only last 100 commands
    if (commandHistory.length > 100) {
      commandHistory = commandHistory.slice(0, 100);
    }
    
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get command history
app.get('/api/history', (req, res) => {
  res.json({ history: commandHistory.slice(0, 20) });
});

// Get configuration
app.get('/api/config', (req, res) => {
  res.json(config);
});

// Update configuration
app.post('/api/config', (req, res) => {
  config = { ...config, ...req.body };
  res.json({ success: true, config });
});

// Command execution logic
async function executeCommand(command, args) {
  const cmd = command.toLowerCase().trim();
  
  if (cmd.startsWith('open ')) {
    return await executeAppCommand(cmd.substring(5));
  } else if (cmd === 'shutdown') {
    return await executeSystemCommand('shutdown /s /t 0');
  } else if (cmd === 'restart') {
    return await executeSystemCommand('shutdown /r /t 0');
  } else if (cmd === 'lock') {
    return await executeSystemCommand('rundll32.exe user32.dll,LockWorkStation');
  } else if (cmd === 'volume up') {
    return await executeSystemCommand('powershell -c "(New-Object -comObject WScript.Shell).SendKeys([char]175)"');
  } else if (cmd === 'volume down') {
    return await executeSystemCommand('powershell -c "(New-Object -comObject WScript.Shell).SendKeys([char]174)"');
  } else if (cmd === 'github issues') {
    return { success: true, message: 'GitHub extension not implemented yet', type: 'info' };
  } else if (cmd === 'weather') {
    return { success: true, message: 'Weather extension not implemented yet', type: 'info' };
  } else {
    return { success: false, message: `Unknown command: ${command}` };
  }
}

async function executeAppCommand(appName) {
  return new Promise((resolve) => {
    let command;
    
    switch (appName.toLowerCase()) {
      case 'vscode':
      case 'code':
        command = 'code';
        break;
      case 'notepad':
        command = 'notepad';
        break;
      case 'calculator':
      case 'calc':
        command = 'calc';
        break;
      case 'chrome':
        command = 'start chrome';
        break;
      case 'firefox':
        command = 'start firefox';
        break;
      default:
        command = `start "" "${appName}"`;
    }
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        resolve({
          success: false,
          message: `Failed to open ${appName}: ${error.message}`
        });
      } else {
        resolve({
          success: true,
          message: `Successfully opened ${appName}`
        });
      }
    });
  });
}

async function executeSystemCommand(command) {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        resolve({
          success: false,
          message: `Command failed: ${error.message}`
        });
      } else {
        resolve({
          success: true,
          message: 'Command executed successfully'
        });
      }
    });
  });
}

// Serve the main app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Wingman Productivity Launcher running on http://localhost:${PORT}`);
  console.log(`📋 Press Ctrl+C to stop the server`);
  
  // Try to open the browser automatically
  const open = process.platform === 'win32' ? 'start' : 
                process.platform === 'darwin' ? 'open' : 'xdg-open';
  exec(`${open} http://localhost:${PORT}`);
});