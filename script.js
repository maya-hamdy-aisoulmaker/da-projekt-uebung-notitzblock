let notesTitles = [];
let notes = [];
let trashNotesTitles = [];
let trashNotes = [];
let archiveNotesTitles = [];
let archiveNotes = [];

const dialogRef = document.getElementById("dialog_bin");
const archiveDialogRef = document.getElementById("dialog_archive");

function openDialog() {
  dialogRef.showModal();
}

function closeDialog() {
  dialogRef.close();
}

function openArchiveDialog() {
  archiveDialogRef.showModal();
}

function closeArchiveDialog() {
  archiveDialogRef.close();
}

function renderNotes() {
  let notesRef = document.getElementById("notescontent");
  notesRef.innerHTML = "";

  for (let index = 0; index < notes.length; index++) {
    const note = notes[index];
    notesRef.innerHTML += getNotesTemplate(note, index);
  }
}

function renderTrashNotes() {
  let trashNotesRef = document.getElementById("trash_content");
  trashNotesRef.innerHTML = "";

  for (
    let indexTrashNote = 0;
    indexTrashNote < trashNotes.length;
    indexTrashNote++
  ) {
    const note = trashNotes[indexTrashNote];
    trashNotesRef.innerHTML += getTrashNotesTemplate(note, indexTrashNote);
  }
}

function renderArchiveNotes() {
  let archiveNotesRef = document.getElementById("archive_content");
  archiveNotesRef.innerHTML = "";

  for (let i = 0; i < archiveNotes.length; i++) {
    const note = archiveNotes[i];
    archiveNotesRef.innerHTML += getArchiveNotesTemplate(note, i);
  }
}

function addNote() {
  let titleInputRef = document.getElementById("note_title");
  let noteInputRef = document.getElementById("note_input");

  let titleInput = titleInputRef.value;
  let noteInput = noteInputRef.value;

  notes.push(noteInput);
  notesTitles.push(titleInput);   

  renderNotes();
  saveData();

  titleInputRef.value = "";
  noteInputRef.value = "";
}

function transferToTrash(index) {
  const trashNote = notes.splice(index, 1)[0]; //via splice und der zahl (markiert wieviele elemente entfernt werden) notizen löschen
  trashNotes.push(trashNote);
  const trashNoteTitle = notesTitles.splice(index, 1)[0];
  trashNotesTitles.push(trashNoteTitle);

  renderNotes(); //funktionsaufruf
  renderTrashNotes(); //funktionsaufruf
  saveData();
}

function transferToArchive(index) {
  const archivedNote = notes.splice(index, 1)[0];
  archiveNotes.push(archivedNote);
  const archivedNoteTitle = notesTitles.splice(index, 1)[0];
  archiveNotesTitles.push(archivedNoteTitle);

  renderNotes();
  renderArchiveNotes();
  saveData();
}

function deleteNote(index) {
  trashNotes.splice(index, 1); //via splice und der zahl (markiert wieviele elemente entfernt werden) notizen löschen
  trashNotesTitles.splice(index, 1);
  renderTrashNotes(); //funktionsaufruf
  saveData();
}
function restoreNote(index) {
  let restoredNote = trashNotes.splice(index, 1)[0];
  notes.push(restoredNote);
  let restoredTitle = trashNotesTitles.splice(index, 1)[0]; // hier auch [0]
  notesTitles.push(restoredTitle);
  renderNotes();
  renderTrashNotes();
  saveData();
}
function deleteFromArchive(index) {
  archiveNotes.splice(index, 1);
  archiveNotesTitles.splice(index, 1);
  renderArchiveNotes();
  saveData();
}

function restoreFromArchive(index) {
  let restoredNote = archiveNotes.splice(index, 1)[0];
  notes.push(restoredNote);
  let restoredTitle = archiveNotesTitles.splice(index, 1)[0];
  notesTitles.push(restoredTitle);
  renderNotes();
  renderArchiveNotes();
  saveData();
}

function saveData() {
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("notesTitles", JSON.stringify(notesTitles));
  localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
  localStorage.setItem("trashNotesTitles", JSON.stringify(trashNotesTitles));
  localStorage.setItem("archiveNotes", JSON.stringify(archiveNotes));
  localStorage.setItem("archiveNotesTitles", JSON.stringify(archiveNotesTitles));
}

function loadData() {
  const n  = JSON.parse(localStorage.getItem("notes"));
  const nt = JSON.parse(localStorage.getItem("notesTitles"));
  const tn = JSON.parse(localStorage.getItem("trashNotes"));
  const tnt = JSON.parse(localStorage.getItem("trashNotesTitles"));
  const an = JSON.parse(localStorage.getItem("archiveNotes"));
  const ant = JSON.parse(localStorage.getItem("archiveNotesTitles"));
  
 
  if (Array.isArray(n)) notes = n;
  if (Array.isArray(nt)) notesTitles = nt;
  if (Array.isArray(tn)) trashNotes = tn;
  if (Array.isArray(tnt)) trashNotesTitles = tnt;
  if (Array.isArray(an)) archiveNotes = an;
  if (Array.isArray(ant)) archiveNotesTitles = ant;
}

loadData();
renderNotes();
renderTrashNotes();

/* Notizen speichern: 
- Datum- und Uhrzeitangabe mitspeichern
*/
// Suchfunktion für bereits erfasste Notizen
// Archivierungsmöglichkeit
