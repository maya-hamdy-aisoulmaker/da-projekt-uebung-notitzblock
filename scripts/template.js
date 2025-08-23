function getNotesTemplate(note, index) {
    return `<p>- ${notesTitles[index]} -> ${note} <button onclick= "transferToTrash(${index})">X</button></p>`;
  }
  
  function getTrashNotesTemplate(note, indexTrashNote) {
    return `<p>- ${trashNotesTitles[indexTrashNote]}-> ${note}
    <button onclick= "restoreNote(${indexTrashNote})">restore</button>
    <button onclick= "deleteNote(${indexTrashNote})">X</button>
    </p>`;
  }