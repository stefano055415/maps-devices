const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Percorso al file JSON
const geoFile = path.join(__dirname, 'geolocated.json');

// Configura EJS e cartelle statiche
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Rotta principale
app.get('/', (req, res) => {
  fs.readFile(geoFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Errore nella lettura di geolocated.json:', err);
      return res.status(500).send('Errore nel caricamento delle coordinate.');
    }
    const locations = JSON.parse(data);
    res.render('index', { locations });
  });
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
