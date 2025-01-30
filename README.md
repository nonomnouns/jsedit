# JavaScript Editor

A lightweight, single-file JavaScript editor with remote code loading and saving capabilities. Built with CodeMirror and designed for IPFS deployment.

![JavaScript Editor Screenshot](/api/placeholder/800/400)

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

## Testing with Dummy HTTP Server

### Python HTTP Server

1. Create a test endpoint file (e.g., `server.py`):
```python
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
from urllib.parse import parse_qs, urlparse

class TestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/test':
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(b'console.log("Test code loaded!");')
        else:
            self.send_response(404)
            self.end_headers()
            
    def do_POST(self):
        if self.path == '/test':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            response = {
                "status": "success",
                "message": "Code received",
                "size": len(post_data)
            }
            self.wfile.write(json.dumps(response).encode())
            
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

httpd = HTTPServer(('localhost', 3000), TestHandler)
print("Server running on http://localhost:3000")
httpd.serve_forever()
```

2. Start the server:
```bash
python server.py
```

3. Open the editor in your browser and use these test URLs:
   - Load URL: `http://localhost:3000/test`
   - Send URL: `http://localhost:3000/test`

### Node.js HTTP Server

1. Create a test endpoint file (e.g., `server.js`):
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Handle GET request
    if (req.method === 'GET' && req.url === '/test') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('console.log("Test code loaded!");');
        return;
    }

    // Handle POST request
    if (req.method === 'POST' && req.url === '/test') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 'success',
                message: 'Code received',
                size: body.length
            }));
        });
        return;
    }

    // Handle 404
    res.writeHead(404);
    res.end();
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

2. Start the server:
```bash
node server.js
```

3. Open the editor in your browser and use these test URLs:
   - Load URL: `http://localhost:3000/test`
   - Send URL: `http://localhost:3000/test`

## Deployment

### IPFS Deployment

1. Save the HTML file (e.g., `index.html`)
2. Upload to IPFS using your preferred method:

```bash
# Using IPFS CLI
ipfs add index.html

# Using Pinata or similar services
# Upload the file through their web interface
```

### Traditional Web Server

Simply place the HTML file in your web server's public directory.

## API Integration

### Loading Code

The editor makes a GET request to the specified URL:

```javascript
GET <user-specified-url>

// Expected response: Plain text/JavaScript code
```

### Saving Code

The editor sends a POST request with the following format:

```javascript
POST <user-specified-url>
Content-Type: application/json

{
    "code": "// Your JavaScript code here"
}

// Expected response: JSON object
```

### Response Handling

The editor can handle various response formats:

```javascript
// Success response example
{
    "status": "success",
    "message": "Code saved successfully"
}

// Error response example
{
    "status": "error",
    "message": "Failed to save code",
    "details": "Error details here"
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Other modern browsers that support:
  - ES6+ JavaScript
  - Fetch API
  - CSS Grid/Flexbox


