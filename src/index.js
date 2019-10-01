import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const notesReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_NOTES':
      return action.notes
    case 'ADD_NOTES':
      return [
        ...state,
        { title: action.title, body: action.body}
      ]
    case 'REMOVE_NOTES':
      return state.filter((note) => note.title !== action.title )
    default: 
      return state
  }
}

const NoteApp = () => {
  // const [notes, setNotes] = useState([]) // before and after
  const [notes, dispatch] = useReducer(notesReducer, [])

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const addNote = (e) => {
    e.preventDefault()
    dispatch({
      type: 'ADD_NOTES',
      title,
      body
    })
    // setNotes([
    //   ...notes,
    //   { title, body }
    // ])
    setTitle('')
    setBody('')
  }
  const removeNote = (title) => {
    // setNotes(notes.filter((note) => note.title !== title))
    dispatch({
      type: 'REMOVE_NOTES',
      title
    })
  }

  useEffect(() => {
    const notesData = JSON.parse(localStorage.getItem('notes'))
    if (notesData) {
      dispatch({ type: 'POPULATE_NOTES', notes: notesData }) //now with reducer
      // setNotes(notesData)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  return (
    <div>
      <h1>Notes</h1>
      { notes.map((note) => (
        <Note key={note.title} note={note} removeNote={removeNote}/>
      ))}
      <p>add note</p>
      <form onSubmit = {addNote}>
        <input value={title} onChange={(e) => setTitle(e.target.value)}/>
        <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        <button>add note</button>
      </form>
    </div>
  )
}

const Note = ({note, removeNote}) => {
  
  // effect hook dependency is []
  useEffect(() => {
    console.log('seting up efffect')
  // clean up effect
    return () => console.log('cleaning up effect')
  }, [])

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => removeNote(note.title)}>x</button>
    </div>
  )
}

ReactDOM.render(<NoteApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
