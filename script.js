let notesTitles = [];
let notes = [];
let trashNotesTitles = [];
let trashNotes = [];
let archiveNotesTitles = [];
let archiveNotes = [];
let notesDates = [];
let trashNotesDates = [];
let archiveNotesDates = [];

const dialogRef = document.getElementById("dialog_bin");
const archiveDialogRef = document.getElementById("dialog_archive");


function openDialog() {
  renderTrashNotes();   
  dialogRef.showModal();
}

function closeDialog() {
  dialogRef.close();
}

function openArchiveDialog() {
  renderArchiveNotes();
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

  let createdAt = new Date().toLocaleString('de-DE');

  notes.push(noteInput);
  notesTitles.push(titleInput);   

  notesDates.push(createdAt);

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

  const trashNoteDate = notesDates.splice(index, 1)[0];
  trashNotesDates.push(trashNoteDate);

  renderNotes(); //funktionsaufruf
  renderTrashNotes(); //funktionsaufruf
  saveData();
}

function transferToArchive(index) {
  const archivedNote = notes.splice(index, 1)[0];
  archiveNotes.push(archivedNote);
  const archivedNoteTitle = notesTitles.splice(index, 1)[0];
  archiveNotesTitles.push(archivedNoteTitle);

  const archivedNoteDate = notesDates.splice(index, 1)[0];
  archiveNotesDates.push(archivedNoteDate);

  renderNotes();
  renderArchiveNotes();
  saveData();
}

function deleteNote(index) {
  trashNotes.splice(index, 1); 
  trashNotesTitles.splice(index, 1);
  trashNotesDates.splice(index, 1);
  renderTrashNotes(); 
  saveData();

}

function restoreNote(index) {
  let restoredNote = trashNotes.splice(index, 1)[0];
  notes.push(restoredNote);
  let restoredTitle = trashNotesTitles.splice(index, 1)[0]; // hier auch [0]
  notesTitles.push(restoredTitle);
  let restoredDate = trashNotesDates.splice(index, 1)[0];
  notesDates.push(restoredDate);
  renderNotes();
  renderTrashNotes();
  saveData();
}

function deleteFromArchive(index) {
  const note  = archiveNotes.splice(index, 1)[0];
  const title = archiveNotesTitles.splice(index, 1)[0];
  const date  = archiveNotesDates.splice(index, 1)[0];
  trashNotes.unshift(note);
  trashNotesTitles.unshift(title);
  trashNotesDates.unshift(date);
  renderArchiveNotes();
  renderTrashNotes();
  saveData();
}

function restoreFromArchive(index) {
  let restoredNote = archiveNotes.splice(index, 1)[0];
  notes.push(restoredNote);
  let restoredTitle = archiveNotesTitles.splice(index, 1)[0];
  notesTitles.push(restoredTitle);
  let restoredDate = archiveNotesDates.splice(index, 1)[0];
  notesDates.push(restoredDate);
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
  localStorage.setItem("notesDates", JSON.stringify(notesDates));
  localStorage.setItem("trashNotesDates", JSON.stringify(trashNotesDates));
  localStorage.setItem("archiveNotesDates", JSON.stringify(archiveNotesDates));
}

function loadData() {
  const n  = JSON.parse(localStorage.getItem("notes"));
  const nt = JSON.parse(localStorage.getItem("notesTitles"));
  const tn = JSON.parse(localStorage.getItem("trashNotes"));
  const tnt = JSON.parse(localStorage.getItem("trashNotesTitles"));
  const an = JSON.parse(localStorage.getItem("archiveNotes"));
  const ant = JSON.parse(localStorage.getItem("archiveNotesTitles"));
  const nd  = JSON.parse(localStorage.getItem("notesDates"));
  const tnd = JSON.parse(localStorage.getItem("trashNotesDates"));
  const and = JSON.parse(localStorage.getItem("archiveNotesDates"));

 
  if (Array.isArray(n)) notes = n;
  if (Array.isArray(nt)) notesTitles = nt;
  if (Array.isArray(tn)) trashNotes = tn;
  if (Array.isArray(tnt)) trashNotesTitles = tnt;
  if (Array.isArray(an)) archiveNotes = an;
  if (Array.isArray(ant)) archiveNotesTitles = ant;
  if (Array.isArray(nd)) notesDates = nd;
  if (Array.isArray(tnd)) trashNotesDates = tnd;
  if (Array.isArray(and)) archiveNotesDates = and;
}

loadData();
renderNotes();
renderTrashNotes();

/* Notizen speichern: 
- Datum- und Uhrzeitangabe mitspeichern
*/
// Suchfunktion für bereits erfasste Notizen
