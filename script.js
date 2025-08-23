let notesTitles = [];
let notes = [];
let trashNotesTitles = [];
let trashNotes = [];

const dialogRef = document.getElementById("dialog_bin");

function openDialog() {
  dialogRef.showModal();
}

function closeDialog() {
  dialogRef.close();
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

function getNotesTemplate(note, index) {
  return `<p>- ${notesTitles[index]} -> ${note} <button onclick= "transferToTrash(${index})">X</button></p>`;
}

function getTrashNotesTemplate(note, indexTrashNote) {
  return `<p>+ title: ${trashNotesTitles[indexTrashNote]}-> ${note}
  <button onclick= "restoreNote(${indexTrashNote})">restore</button>
  <button onclick= "deleteNote(${indexTrashNote})">X</button>
  </p>`;
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

function saveData() {
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("notesTitles", JSON.stringify(notesTitles));
  localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
  localStorage.setItem("trashNotesTitles", JSON.stringify(trashNotesTitles));
}

function loadData() {
  const n  = JSON.parse(localStorage.getItem("notes"));
  const nt = JSON.parse(localStorage.getItem("notesTitles"));
  const tn = JSON.parse(localStorage.getItem("trashNotes"));
  const tnt = JSON.parse(localStorage.getItem("trashNotesTitles"));

  if (Array.isArray(n)) notes = n;
  if (Array.isArray(nt)) notesTitles = nt;
  if (Array.isArray(tn)) trashNotes = tn;
  if (Array.isArray(tnt)) trashNotesTitles = tnt;
}

loadData();
renderNotes();
renderTrashNotes();

/* Notizen speichern: 
- Datum- und Uhrzeitangabe mitspeichern
*/
// Suchfunktion für bereits erfasste Notizen
// Archivierungsmöglichkeit
