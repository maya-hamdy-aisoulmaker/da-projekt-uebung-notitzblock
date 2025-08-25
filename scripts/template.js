

function getNotesTemplate(note, index) {
  return `
    <div class="note-card">
      <h4>${notesTitles[index]}</h4>
      <p>${note}</p>
      <button onclick="transferToTrash(${index})">X</button>
      <button onclick="transferToArchive(${index})">Archivieren</button>
    </div>
  `;
}

  function getArchiveNotesTemplate(note, indexArchiveNote) {
    return `
      <div class="note-card archive">
        <h4>${archiveNotesTitles[indexArchiveNote]}</h4>
        <p>${note}</p>
        <button onclick="restoreFromArchive(${indexArchiveNote})">restore</button>
        <button onclick="deleteFromArchive(${indexArchiveNote})">X</button>
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