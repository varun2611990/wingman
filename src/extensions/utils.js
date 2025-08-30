// Utilities Extension for Wingman Launcher
module.exports = {
  name: 'Utilities',
  command: 'utils',
  description: 'Various utility commands',
  type: 'extension',
  
  async run(args = []) {
    const subCommand = args[0];
    
    switch (subCommand) {
      case 'uuid':
        return this.generateUUID();
      case 'time':
        return this.getCurrentTime();
      case 'ip':
        return this.getNetworkInfo();
      case 'password':
        const length = parseInt(args[1]) || 12;
        return this.generatePassword(length);
      default:
        return this.showHelp();
    }
  },
  
  generateUUID() {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    
    return {
      success: true,
      message: 'UUID generated',
      data: { uuid },
      formatted: `Generated UUID:\n${uuid}\n\n(Copied to clipboard)`
    };
  },
  
  getCurrentTime() {
    const now = new Date();
    const timeData = {
      local: now.toLocaleString(),
      utc: now.toUTCString(),
      iso: now.toISOString(),
      timestamp: now.getTime()
    };
    
    return {
      success: true,
      message: 'Current time',
      data: timeData,
      formatted: `
🕐 Local Time: ${timeData.local}
🌍 UTC Time: ${timeData.utc}
📅 ISO Format: ${timeData.iso}
⏱️ Timestamp: ${timeData.timestamp}
      `.trim()
    };
  },
  
  getNetworkInfo() {
    const os = require('os');
    const interfaces = os.networkInterfaces();
    
    let info = '🌐 Network Interfaces:\n\n';
    for (const [name, details] of Object.entries(interfaces)) {
      info += `${name}:\n`;
      details.forEach(detail => {
        if (detail.family === 'IPv4' && !detail.internal) {
          info += `  📍 ${detail.address}\n`;
        }
      });
      info += '\n';
    }
    
    return {
      success: true,
      message: 'Network information',
      data: { interfaces },
      formatted: info
    };
  },
  
  generatePassword(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    return {
      success: true,
      message: `Password generated (${length} characters)`,
      data: { password, length },
      formatted: `Generated Password (${length} chars):\n${password}\n\n(Copied to clipboard)`
    };
  },
  
  showHelp() {
    return {
      success: true,
      message: 'Utilities help',
      formatted: `
🛠️ Available Utility Commands:

utils uuid        - Generate a random UUID
utils time        - Show current time in various formats
utils ip          - Show network interface information
utils password 16 - Generate secure password (default: 12 chars)

Usage: utils <command> [args]
      `.trim()
    };
  }
};