# Wingman - Web-Based Productivity Launcher 🚀

A **keyboard-first web-based productivity launcher** inspired by Raycast, designed to run locally and boost your productivity with lightning-fast command execution.

![Main Interface](https://github.com/user-attachments/assets/23266196-fac2-437d-97be-f8d9e5fc0fe0)

## ✨ Features

### 🎯 Core Functionality
- **⌨️ Keyboard-first interface** - Open with `Ctrl+Space`, navigate with arrow keys
- **🚀 App launching** - Quickly open applications (`open vscode`, `open calculator`)
- **⚙️ System commands** - Control your system (`shutdown`, `lock`, `volume up/down`)
- **🔍 Smart autocomplete** - Intelligent command suggestions as you type
- **📋 Command history** - Track recent commands with success/error status

### 🧩 Extension System
- **Dynamic plugin loading** - Extensions are automatically loaded from `/src/extensions/`
- **Rich formatted output** - Extensions can provide beautifully formatted results
- **Easy development** - Simple JavaScript module format for creating extensions

### 🎨 Beautiful Interface
- **Dark theme** with smooth animations
- **Modal-style launcher** with blur effects
- **Responsive design** that works on any screen size
- **Visual feedback** for all interactions

![Command Launcher](https://github.com/user-attachments/assets/5d567909-d9a3-4599-8bf9-e436308bd0b5)

## 🚀 Quick Start

### Installation
```bash
# Clone the repository
git clone https://github.com/varun2611990/wingman.git
cd wingman

# Install dependencies
npm install

# Start the server
npm start
```

The application will open automatically in your browser at `http://localhost:3000`.

### Basic Usage
1. **Open launcher**: Press `Ctrl + Space`
2. **Type command**: Start typing any command
3. **Navigate**: Use `↑` and `↓` arrow keys to navigate suggestions
4. **Execute**: Press `Enter` to run the selected command
5. **Close**: Press `Esc` to close the launcher

### Example Commands
```
open vscode          # Open Visual Studio Code
open calculator      # Open Calculator
volume up            # Increase system volume
lock                 # Lock your screen
shutdown             # Shutdown computer
github issues        # List GitHub issues (demo data)
weather              # Get weather information
utils uuid           # Generate a UUID
utils time           # Show current time
utils password 16    # Generate a 16-character password
```

![Extension Demo](https://github.com/user-attachments/assets/33d854c2-7440-49c2-8fc7-db982e4a5b16)

## 🧩 Built-in Extensions

### GitHub Extension
- **Command**: `github issues`
- **Description**: Lists sample GitHub issues with formatting
- **Future**: Can be extended to connect to real GitHub API

### Weather Extension  
- **Command**: `weather [location]`
- **Description**: Shows mock weather data with emoji formatting
- **Future**: Can integrate with OpenWeatherMap or similar APIs

### Utilities Extension
- **Commands**: 
  - `utils uuid` - Generate random UUID
  - `utils time` - Show current time in multiple formats
  - `utils ip` - Show network interface information
  - `utils password [length]` - Generate secure password
- **Description**: Various developer and system utilities

## 🛠️ Creating Custom Extensions

Extensions are simple JavaScript modules. Create a new file in `/src/extensions/`:

```javascript
// src/extensions/my-extension.js
module.exports = {
  name: 'My Extension',
  command: 'mycommand',
  description: 'Does something useful',
  type: 'extension',
  
  async run(args = []) {
    // Your extension logic here
    return {
      success: true,
      message: 'Command executed successfully',
      formatted: `
🎉 Hello from my extension!
📝 Args received: ${args.join(', ')}
      `.trim()
    };
  }
};
```

Extensions automatically reload when the server restarts. They can:
- Execute async operations
- Return formatted text output
- Handle command arguments
- Integrate with APIs and external services

## 📁 Project Structure

```
wingman/
├── src/
│   ├── extensions/          # Extension modules
│   │   ├── github.js       # GitHub integration
│   │   ├── weather.js      # Weather information
│   │   └── utils.js        # Utility commands
│   └── extensionLoader.js  # Extension management system
├── public/
│   ├── index.html          # Main UI
│   ├── style.css           # Styling
│   └── script.js           # Frontend logic
├── server.js               # Express server
└── package.json            # Dependencies
```

## 🎯 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Space` | Open/Close launcher |
| `↑` `↓` | Navigate suggestions |
| `Enter` | Execute selected command |
| `Esc` | Close launcher/modal |
| `F1` | Show help |

## 🔧 API Endpoints

- `GET /api/commands/suggest?query=...` - Get command suggestions
- `POST /api/commands/execute` - Execute a command
- `GET /api/history` - Get command history
- `GET /api/extensions` - List loaded extensions
- `POST /api/extensions/reload` - Reload all extensions

## 🚀 Future Enhancements

- **AI Integration** - Connect to OpenAI or Ollama for smart commands
- **Clipboard Management** - History and snippets
- **File Search** - Index and search local files
- **Workflow Builder** - Chain commands together
- **Settings Sync** - Save preferences and configurations
- **Real API Integrations** - Connect to GitHub, Notion, Slack, etc.
- **Desktop App** - Package with Electron for native experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own productivity needs!

## 🙏 Acknowledgments

Inspired by [Raycast](https://raycast.com/) - the amazing productivity launcher for macOS.

---

**Happy commanding!** 🚀