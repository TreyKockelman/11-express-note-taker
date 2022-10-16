const express = require('express');
const path = require('path');

const notes = require('./db/db.json')

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => 
  res.status(200).json(notes)
);

app.post('/notes', (req, res) => {
  console.info(`${req.method} request received to add a review`)
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
    }

  const response = {
    status: 'success',
    body: newNote,
  }

  console.log(response)
  res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting notes');
  }
})

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);