

  function getNotesTemplate(note, index) {
    return `
      <div class="note-card">
        <h4>${notesTitles[index]}</h4>
        <p>${note}</p>
        <button onclick="transferToTrash(${index})">X</button>
      </div>
    `;
  }


  function getTrashNotesTemplate(note, indexTrashNote) {
    return `
      <div class="note-card trash">
        <h4>${trashNotesTitles[indexTrashNote]}</h4>
        <p>${note}</p>
        <button onclick="restoreNote(${indexTrashNote})">restore</button>
        <button onclick="deleteNote(${indexTrashNote})">X</button>
      </div>
    `;
  }