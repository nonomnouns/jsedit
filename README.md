# JavaScript Editor

A simple, single-page JavaScript editor for loading, editing, and saving code.

## Features

*   **Load Code:** Load JavaScript code from a URL via a GET request.
*   **Edit Code:** Modify the code using the built-in editor (CodeMirror).
*   **Send Code:** Save modified code back to a URL via a POST request.
*   **JSON Response:** View responses (including errors) in JSON format.
*   **Dynamic URLs:** Load and save to different URLs.
*   **Simple UI:** Minimalistic user interface using indexing.co brand style.
*   **Solid Buttons:** Buttons with a solid green background.

## How to Use

1.  **Run the Server:**
    *   Navigate to the project directory.
    *   Run `npm install express body-parser cors`
    *   Run `node server.js`

2.  **Open the Editor:**
    *   Open your web browser and go to `http://localhost:3000/`.

3.  **Load Code:**
    *   Enter a URL into the "Enter URL to load code" field (e.g., `http://localhost:3000/main.js`).
    *   Click the "Load" button. The code from the given URL will appear in the editor.

4.  **Edit Code:**
    *   Modify the JavaScript code in the editor.

5.  **Send Code:**
    *   Enter the URL into the "Enter URL to send code" field (e.g., `http://localhost:3000/main.js`).
    *   Click the "Send" button. The modified code will be saved to the specified URL, replacing the original content.

6.  **Response**
    *   After you sent your code, the server response will be displayed on the response section.
