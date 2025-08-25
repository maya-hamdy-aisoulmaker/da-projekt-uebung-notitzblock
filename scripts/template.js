

function getNotesTemplate(note, index) {
  return `
    <div class="note-card">
      <h4>${allNotes.notesTitles[index]}</h4>
      <small>${allNotes.notesDates[index]}</small>
      <p>${note}</p>
      <button onclick="moveNote(${index}, 'notes', 'trashNotes')">X</button>
      <button onclick="moveNote(${index}, 'notes', 'archiveNotes')">Archivieren</button>
    </div>
  `;
}

function getArchiveNotesTemplate(note, indexArchiveNote) {
  return `
    <div class="note-card archive">
      <h4>${allNotes.archiveNotesTitles[indexArchiveNote]}</h4>
      <small>${allNotes.archiveNotesDates[indexArchiveNote]}</small> 
      <p>${note}</p>
      <button onclick="moveNote(${indexArchiveNote}, 'archiveNotes', 'notes')">restore</button>
      <button onclick="moveNote(${indexArchiveNote}, 'archiveNotes', 'trashNotes')">X</button>
    </div>
  `;
}

function getTrashNotesTemplate(note, indexTrashNote) {
  return `
    <div class="note-card trash">
      <h4>${allNotes.trashNotesTitles[indexTrashNote]}</h4>
      <small>${allNotes.trashNotesDates[indexTrashNote]}</small>    
      <p>${note}</p>
      <button onclick="moveNote(${indexTrashNote}, 'trashNotes', 'notes')">restore</button>
      <button onclick="deleteNote(${indexTrashNote})">X</button>
    </div>
  `;
}