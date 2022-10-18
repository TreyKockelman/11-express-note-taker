const express = require('express');
const path = require('path');
const fs = require('fs');

let notes = require('./db/db.json')

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile('/public/index.html'));

app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  res.status(200).json(notes);
});

app.post('/api/notes', (req, res) => {
  const { title, text, id } = req.body;

  if (title && text && id) {
    const newNote = {
      title,
      text,
      id,
    }

  const response = {
    status: 'success',
    body: newNote,
  }

  notes.push(newNote);
  fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(notes))
  res.status(201).json({msg: "Note Added"});
  } else {
    res.status(500).json('Error in posting notes');
  }
});

app.delete('/api/notes/:id', (req, res)  => {
  const found = notes.some(notes => notes.id === req.params.id);

  if (found) {
    notes = notes.filter(notes => notes.id !== req.params.id);
    res.json(notes);
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(notes))
  } else {
    res.status(404).json('Error in deleting notes');
  }
});

app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);