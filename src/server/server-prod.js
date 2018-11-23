const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));

app.get('*', (req, res) => {
  res.sendFile(HTML_FILE);
});

app.listen(PORT, () => {
  console.log(`Served fresh daily on PORT ${PORT}`);
});
