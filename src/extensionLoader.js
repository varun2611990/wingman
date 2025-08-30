const fs = require('fs');
const path = require('path');

class ExtensionLoader {
  constructor() {
    this.extensions = new Map();
    this.extensionsDir = path.join(__dirname, 'extensions');
    this.loadExtensions();
  }
  
  loadExtensions() {
    try {
      if (!fs.existsSync(this.extensionsDir)) {
        console.log('Extensions directory not found, creating...');
        fs.mkdirSync(this.extensionsDir, { recursive: true });
        return;
      }
      
      const extensionFiles = fs.readdirSync(this.extensionsDir)
        .filter(file => file.endsWith('.js'));
      
      extensionFiles.forEach(file => {
        try {
          const extensionPath = path.join(this.extensionsDir, file);
          
          // Clear require cache to allow hot reloading
          delete require.cache[require.resolve(extensionPath)];
          
          const extension = require(extensionPath);
          
          if (this.validateExtension(extension)) {
            this.extensions.set(extension.command, extension);
            console.log(`✅ Loaded extension: ${extension.name} (${extension.command})`);
          } else {
            console.warn(`⚠️ Invalid extension format: ${file}`);
          }
        } catch (error) {
          console.error(`❌ Failed to load extension ${file}:`, error.message);
        }
      });
      
      console.log(`📦 Loaded ${this.extensions.size} extensions`);
    } catch (error) {
      console.error('Failed to load extensions:', error);
    }
  }
  
  validateExtension(extension) {
    return (
      extension &&
      typeof extension.name === 'string' &&
      typeof extension.command === 'string' &&
      typeof extension.description === 'string' &&
      typeof extension.run === 'function'
    );
  }
  
  getExtension(command) {
    return this.extensions.get(command);
  }
  
  getAllExtensions() {
    return Array.from(this.extensions.values());
  }
  
  getExtensionCommands() {
    return Array.from(this.extensions.keys());
  }
  
  async executeExtension(command, args = []) {
    const extension = this.getExtension(command);
    
    if (!extension) {
      return {
        success: false,
        message: `Extension not found: ${command}`
      };
    }
    
    try {
      const result = await extension.run(args);
      return result;
    } catch (error) {
      return {
        success: false,
        message: `Extension error: ${error.message}`
      };
    }
  }
  
  // Hot reload extensions (useful for development)
  reloadExtensions() {
    this.extensions.clear();
    this.loadExtensions();
    return this.extensions.size;
  }
  
  // Add extension suggestions to command palette
  getExtensionSuggestions(query = '') {
    const suggestions = [];
    
    this.extensions.forEach(ext => {
      if (!query || ext.command.toLowerCase().includes(query.toLowerCase()) ||
          ext.name.toLowerCase().includes(query.toLowerCase()) ||
          ext.description.toLowerCase().includes(query.toLowerCase())) {
        
        suggestions.push({
          name: ext.command,
          description: ext.description,
          type: 'extension',
          extension: ext.name
        });
      }
    });
    
    return suggestions;
  }
}

module.exports = ExtensionLoader;