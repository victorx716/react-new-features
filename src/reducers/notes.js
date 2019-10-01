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

export { notesReducer as default}