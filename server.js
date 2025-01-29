const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises; 
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname)));


app.get('/*', async (req, res) => {
  const filePath = path.join(__dirname, req.url);

    try {
        await fs.access(filePath); 
        res.sendFile(filePath); 

    } catch (err) {
      res.status(404).send('File not found');
    }


});


app.post('/*', async (req, res) => {
    const { code } = req.body;
    const filePath = path.join(__dirname, req.url);


    if (!code) {
        return res.status(400).json({ error: 'Code is required in the request body.' });
    }

   try {
      await fs.writeFile(filePath, code);
      console.log('Code updated at:', req.url);
        res.json({ success: 'Code updated successfully', received_code: code });
   } catch(e) {
        console.error('Error updating file:', e);
        res.status(500).json({error: 'Error updating file.', details: e.message})
   }

});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});