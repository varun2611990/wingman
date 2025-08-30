# Wingman - Web-Based Productivity Launcher
## Product Requirements Document (PRD) & Project Status

> **Goal**: Local Web-Based Productivity Launcher (Raycast Alternative for Windows)

---

## 🎯 **Project Vision**

A keyboard-first web application that runs locally on Windows, providing users with a unified interface to:
- Launch applications and files instantly
- Execute system commands efficiently  
- Trigger custom workflows and automations
- Integrate with external APIs (GitHub, Weather, Notion, etc.)
- Leverage AI for text generation, summarization, and smart commands

---

## 🏗️ **Architecture Overview**

| Layer | Role | Status |
|-------|------|--------|
| **Frontend (Web UI)** | Command palette, results display, extension cards | 🔴 Not Started |
| **Backend (Local Server)** | API routes, system command execution, extension management | 🟡 In Progress |
| **Extension Engine** | Plugin system for third-party integrations | 🟡 Basic Framework |
| **AI Module** | Smart commands and text processing | 🔴 Not Started |
| **Database/Storage** | User preferences, history, snippets | 🔴 Not Started |

---

## 🧰 **Tech Stack**

| Component | Technology | Status |
|-----------|------------|--------|
| **Backend** | Node.js + Express | ✅ Implemented |
| **Frontend** | React + TailwindCSS | 🔴 Pending |
| **System Access** | Node.js child_process + PowerShell | 🟡 Basic Implementation |
| **Extensions** | JavaScript modules with dynamic loading | 🟡 Framework Ready |
| **AI Integration** | OpenAI API / Ollama | 🔴 Planned |
| **Database** | Local PostgreSQL / JSON files | 🔴 Planned |
| **Packaging** | Electron wrapper | 🔴 Future Phase |

---

## 📊 **Current Project Status**

### ✅ **Completed Features**
- [x] Basic Express server setup
- [x] Extension loader framework (`ExtensionLoader.js`)
- [x] Sample extensions (GitHub, Weather, Utils)
- [x] API endpoint structure for command suggestions
- [x] Basic system command execution framework
- [x] CORS and body-parser middleware setup
- [x] Project structure and package.json configuration

### 🟡 **In Progress**
- [ ] Command execution API endpoints
- [ ] Extension registration and management
- [ ] System command implementations (volume, shutdown, etc.)

### 🔴 **Not Started**
- [ ] Frontend web interface
- [ ] Command palette UI
- [ ] Keyboard shortcuts implementation
- [ ] File/app launcher functionality
- [ ] AI integration
- [ ] Clipboard management
- [ ] User configuration system

---

## 🎯 **Core Features Breakdown**

### 1. 🔍 **Command Palette** 
**Priority: HIGH** | **Status: 🔴 Not Started**

#### Requirements:
- Global keyboard shortcut (Ctrl+Space) to open launcher
- Real-time autocomplete and fuzzy search
- Support for multiple command types:
  - App launching (`open vscode`)
  - System commands (`shutdown /r`)
  - Web search (`google "query"`)
  - Extension triggers (`github issues`)

#### Implementation Tasks:
- [ ] Create React-based command input component
- [ ] Implement keyboard event listeners
- [ ] Add fuzzy search algorithm (Fuse.js)
- [ ] Design autocomplete dropdown UI
- [ ] Add command history tracking

---

### 2. 🖥️ **App & File Launcher**
**Priority: HIGH** | **Status: 🔴 Not Started**

#### Requirements:
- Launch Windows applications by name or path
- Quick file access and opening
- Integration with Windows file system

#### Implementation Tasks:
- [ ] Windows application registry scanning
- [ ] File indexing system (optional)
- [ ] PowerShell script integration for app launching
- [ ] File search API endpoints
- [ ] Recently used apps tracking

---

### 3. ⚙️ **System Commands**
**Priority: MEDIUM** | **Status: 🟡 Basic Framework**

#### Requirements:
- Volume control (up/down/mute)
- Power management (shutdown/restart/lock)
- Wi-Fi toggle
- System settings shortcuts

#### Implementation Tasks:
- [x] Basic command execution framework
- [ ] PowerShell script library for Windows commands
- [ ] Volume control implementation
- [ ] Power management commands
- [ ] Network control commands
- [ ] Error handling and user feedback

---

### 4. 🧩 **Extensions Framework**
**Priority: HIGH** | **Status: 🟡 Basic Implementation**

#### Current Extensions:
- ✅ GitHub integration (issues, PRs)
- ✅ Weather API integration
- ✅ Utility functions

#### Implementation Tasks:
- [x] Extension loader mechanism
- [x] Sample extension templates
- [ ] Extension configuration system
- [ ] Extension marketplace/discovery
- [ ] Hot-reloading for development
- [ ] Extension security sandboxing

---

### 5. 🤖 **AI Commands**
**Priority: MEDIUM** | **Status: 🔴 Not Started**

#### Requirements:
- Text summarization from clipboard
- Code snippet generation
- Language translation
- Smart command interpretation

#### Implementation Tasks:
- [ ] OpenAI API integration
- [ ] Local LLM setup (Ollama)
- [ ] AI command routing
- [ ] Clipboard text processing
- [ ] Response formatting and display

---

### 6. 📋 **Clipboard & Snippets**
**Priority: LOW** | **Status: 🔴 Not Started**

#### Requirements:
- Clipboard history management
- Text snippet storage and retrieval
- Quick snippet insertion

#### Implementation Tasks:
- [ ] Clipboard monitoring system
- [ ] Snippet database schema
- [ ] Snippet management UI
- [ ] Quick insertion commands

---

### 7. 🎨 **User Interface**
**Priority: HIGH** | **Status: 🔴 Not Started**

#### Requirements:
- Dark mode design
- Keyboard-only navigation
- Modal-style launcher window
- Responsive and fast rendering

#### Implementation Tasks:
- [ ] React app setup with Vite
- [ ] TailwindCSS configuration
- [ ] Command palette modal component
- [ ] Results list component
- [ ] Extension card components
- [ ] Settings panel
- [ ] Keyboard navigation system

---

## 🚀 **Development Roadmap**

### **Phase 1: Foundation** (Week 1-2)
**Goal: Basic launcher functionality**

#### Sprint 1.1: Frontend Setup
- [ ] Initialize React app with Vite
- [ ] Configure TailwindCSS
- [ ] Create basic command palette UI
- [ ] Implement keyboard shortcuts
- [ ] Connect to backend API

#### Sprint 1.2: Core Commands
- [ ] Complete system command implementations
- [ ] Add app launcher functionality
- [ ] Implement command history
- [ ] Add error handling and feedback

### **Phase 2: Extensions** (Week 3-4)
**Goal: Robust extension system**

#### Sprint 2.1: Extension System
- [ ] Complete extension loader
- [ ] Add extension configuration
- [ ] Implement hot-reloading
- [ ] Create extension documentation

#### Sprint 2.2: Extension Library
- [ ] Enhance GitHub extension
- [ ] Add Notion integration
- [ ] Create file search extension
- [ ] Add calculator extension

### **Phase 3: Intelligence** (Week 5-6)
**Goal: AI and smart features**

#### Sprint 3.1: AI Integration
- [ ] OpenAI API setup
- [ ] Basic AI commands
- [ ] Smart text processing
- [ ] Context-aware suggestions

#### Sprint 3.2: Advanced Features
- [ ] Clipboard management
- [ ] Snippet system
- [ ] Workflow automation
- [ ] User preferences

### **Phase 4: Polish** (Week 7-8)
**Goal: Production-ready application**

#### Sprint 4.1: UI/UX Enhancement
- [ ] Animation and transitions
- [ ] Accessibility improvements
- [ ] Theme customization
- [ ] Performance optimization

#### Sprint 4.2: Packaging & Distribution
- [ ] Electron wrapper (optional)
- [ ] Installation scripts
- [ ] Documentation
- [ ] Testing and QA

---

## 🛠️ **Development Environment**

### **Required Tools**
- [x] Node.js v18+
- [x] VS Code
- [x] Git
- [ ] React Developer Tools
- [ ] PowerShell ISE (for system commands)

### **Package Management**
- [x] npm (current)
- [ ] Consider migration to pnpm for better performance

### **Testing Strategy**
- [ ] Unit tests with Vitest
- [ ] Integration tests for API endpoints
- [ ] E2E tests with Playwright
- [ ] Extension testing framework

---

## 🚨 **Critical Issues to Address**

### **Immediate Blockers**
1. **Missing Frontend**: No web interface currently exists
2. **Static File Serving**: `public/index.html` missing (causing current error)
3. **Extension Registration**: Extensions not properly registered with the server

### **Technical Debt**
1. **Error Handling**: Limited error handling in current codebase
2. **Configuration Management**: No persistent configuration system
3. **Logging**: No proper logging system implemented
4. **Security**: No input validation or security measures

### **Performance Considerations**
1. **File System Access**: Need efficient file indexing for large systems
2. **Extension Loading**: Consider lazy loading for better startup performance
3. **Memory Management**: Monitor memory usage with multiple extensions

---

## 📈 **Success Metrics**

### **MVP Success Criteria**
- [ ] Launch time under 500ms
- [ ] Command execution under 100ms
- [ ] Support for 20+ system commands
- [ ] 5+ working extensions
- [ ] Keyboard-only operation

### **User Experience Goals**
- [ ] Zero-click command execution
- [ ] Intuitive command discovery
- [ ] Consistent keyboard shortcuts
- [ ] Visual feedback for all actions
- [ ] Error recovery and helpful messages

---

## 🔄 **Next Immediate Actions**

### **This Week**
1. **Fix Current Error**: Create `public/index.html` 
2. **Frontend Setup**: Initialize React application
3. **Basic UI**: Implement command palette modal
4. **API Integration**: Connect frontend to existing backend

### **Next Week**
1. **System Commands**: Complete PowerShell integration
2. **App Launcher**: Implement Windows app detection
3. **Extension Testing**: Validate existing extensions
4. **User Testing**: Get feedback on basic functionality

---

## 📝 **Notes & Considerations**

### **Windows-Specific Considerations**
- PowerShell execution policies
- Windows Registry access for app detection
- Path handling for Windows file system
- UAC (User Account Control) implications

### **Future Enhancements**
- Voice command integration
- Team collaboration features
- Cloud sync for settings
- Plugin marketplace
- Mobile companion app

---

**Last Updated**: August 30, 2025  
**Project Lead**: Varun  
**Repository**: [wingman](https://github.com/varun2611990/wingman)  
**Current Branch**: main
