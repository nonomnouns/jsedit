# JavaScript Editor

A lightweight, single-file JavaScript editor with remote code loading and saving capabilities. Built with CodeMirror and designed for IPFS deployment.



## Features

- **Single File Architecture**: Entire application contained in one HTML file
- **Code Editing**:
  - Syntax highlighting for JavaScript
  - Line numbers
  - Auto-indentation
  - Line wrapping
  - Tab size: 2 spaces
  
- **Remote Operations**:
  - Load code from any URL via GET request
  - Save/send code to any URL via POST request
  - JSON response visualization
  
- **User Interface**:
  - Clean, minimal design
  - Loading states with spinners
  - Error and success state handling
  - Responsive layout
  
- **Keyboard Shortcuts**:
  - `Ctrl/Cmd + S`: Send code to configured URL

## Dependencies

The editor uses CDN-hosted dependencies:
- CodeMirror 5.65.2 (core)
- CodeMirror JavaScript mode
- Cabinet Grotesk font (via Fontshare)
