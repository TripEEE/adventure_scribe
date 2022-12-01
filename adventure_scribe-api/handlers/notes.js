const scribeDb = require('../db/scribe_db')

const createNote = async (req, res) => {

  if (!req.params.campaign_id) {
    res.status(400).send("missing campaign id")
    return
  }

  if (!req.params.marker_id) {
    res.status(400).send("missing marker id")
    return
  }

  if (!req.body.title || !req.body.description || !req.body.category) {
    res.status(400).send("invalid request")
    return
  }

  try {
    const note = await scribeDb.notes.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      marker_id: req.params.marker_id,
    })
    res.json(note)
  }
  catch (err) {
    res.status(500).send(err)
  }
}

const editNote = async (req, res) => {

  if (!req.params.campaign_id) {
    res.status(400).send("missing campaign id")
    return
  }

  if (!req.params.marker_id) {
    res.status(400).send("missing marker id")
    return
  }

  if (!req.params.note_id) {
    res.status(400).send("missing note id")
    return
  }

  try {
    const noteToUpdate = await scribeDb.notes.getNoteById(req.params.note_id)
    const updatedNote = {
      id: req.params.note_id,
      //takes first value that is not undefined
      title: req.body.title ?? noteToUpdate.title,
      description: req.body.description ?? noteToUpdate.description,
      category: req.body.category ?? noteToUpdate.category,
      marker_id: req.params.marker_id ?? noteToUpdate.marker_id
    }

    const note = await scribeDb.notes.updateNote(updatedNote)
    res.json(note)
  }
  catch (err) {
    res.status(500).send(err)
  }

}


const deleteNote = async (req, res) => {

  if (!req.params.campaign_id) {
    res.status(400).send("missing campaign id")
    return
  }

  if (!req.params.marker_id) {
    res.status(400).send("missing marker id")
    return
  }

  if (!req.params.note_id) {
    res.status(400).send("missing note id")
    return
  }

  try {
    await scribeDb.notes.deleteNote(req.params.note_id)
    res.json("Note Deleted")
  }
  catch (err) {
    res.status(500).send(err)
  }

}

exports.createNote = createNote;
exports.editNote = editNote;
exports.deleteNote = deleteNote;
