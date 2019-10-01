import React, { useState } from 'react';

const AddNoteForm = ( { dispatch }) => {

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const addNote = (e) => {
    e.preventDefault()
    dispatch({
      type: 'ADD_NOTES',
      title,
      body
    })
    setTitle('')
    setBody('')
  }

  return (
    <div>
      <p>add note</p>
      <form onSubmit = {addNote}>
        <input value={title} onChange={(e) => setTitle(e.target.value)}/>
        <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        <button>add note</button>
      </form>
    </div>
  )
}

export { AddNoteForm as default}