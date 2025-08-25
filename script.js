let allNotes = {
  notesTitles: [],
  notes: [],
  trashNotesTitles: [],
  trashNotes: [],
  archiveNotesTitles: [],
  archiveNotes: [],
  notesDates: [],
  trashNotesDates: [],
  archiveNotesDates: []
};

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

  for (let index = 0; index < allNotes.notes.length; index++) {
    const note = allNotes.notes[index];
    notesRef.innerHTML += getNotesTemplate(note, index);
  }
}

function renderTrashNotes() {
  let trashNotesRef = document.getElementById("trash_content");
  trashNotesRef.innerHTML = "";

  for (let indexTrashNote = 0; indexTrashNote < allNotes.trashNotes.length; indexTrashNote++) {
    const note = allNotes.trashNotes[indexTrashNote];
    trashNotesRef.innerHTML += getTrashNotesTemplate(note, indexTrashNote);
  }
}

function renderArchiveNotes() {
  let archiveNotesRef = document.getElementById("archive_content");
  archiveNotesRef.innerHTML = "";

  for (let i = 0; i < allNotes.archiveNotes.length; i++) {
    const note = allNotes.archiveNotes[i];
    archiveNotesRef.innerHTML += getArchiveNotesTemplate(note, i);
  }
}

function moveNote(indexNote, startKey, destinationKey) {

  const note = allNotes[startKey].splice(indexNote, 1)[0];
  allNotes[destinationKey].push(note);

  const noteTitle = allNotes[startKey + "Titles"].splice(indexNote, 1)[0];
  allNotes[destinationKey + "Titles"].push(noteTitle);

  const noteDate = allNotes[startKey + "Dates"].splice(indexNote, 1)[0];
  allNotes[destinationKey + "Dates"].push(noteDate);

  renderNotes();
  renderArchiveNotes();
  renderTrashNotes();
  saveData();
}

function addNote() {
  let titleInputRef = document.getElementById("note_title");
  let noteInputRef = document.getElementById("note_input");

  let titleInput = titleInputRef.value;
  let noteInput = noteInputRef.value;

  let createdAt = new Date().toLocaleString('de-DE');

  allNotes.notes.push(noteInput);
  allNotes.notesTitles.push(titleInput);
  allNotes.notesDates.push(createdAt);

  renderNotes();
  saveData();

  titleInputRef.value = "";
  noteInputRef.value = "";
}


function deleteNote(index) {
  allNotes.trashNotes.splice(index, 1);
  allNotes.trashNotesTitles.splice(index, 1);
  allNotes.trashNotesDates.splice(index, 1);
  renderTrashNotes();
  saveData();
}

function saveData() {
  localStorage.setItem("notes", JSON.stringify(allNotes.notes));
  localStorage.setItem("notesTitles", JSON.stringify(allNotes.notesTitles));
  localStorage.setItem("trashNotes", JSON.stringify(allNotes.trashNotes));
  localStorage.setItem("trashNotesTitles", JSON.stringify(allNotes.trashNotesTitles));
  localStorage.setItem("archiveNotes", JSON.stringify(allNotes.archiveNotes));
  localStorage.setItem("archiveNotesTitles", JSON.stringify(allNotes.archiveNotesTitles));
  localStorage.setItem("notesDates", JSON.stringify(allNotes.notesDates));
  localStorage.setItem("trashNotesDates", JSON.stringify(allNotes.trashNotesDates));
  localStorage.setItem("archiveNotesDates", JSON.stringify(allNotes.archiveNotesDates));
}

function loadData() {
  const n   = JSON.parse(localStorage.getItem("notes"));
  const nt  = JSON.parse(localStorage.getItem("notesTitles"));
  const tn  = JSON.parse(localStorage.getItem("trashNotes"));
  const tnt = JSON.parse(localStorage.getItem("trashNotesTitles"));
  const an  = JSON.parse(localStorage.getItem("archiveNotes"));
  const ant = JSON.parse(localStorage.getItem("archiveNotesTitles"));
  const nd  = JSON.parse(localStorage.getItem("notesDates"));
  const tnd = JSON.parse(localStorage.getItem("trashNotesDates"));
  const and = JSON.parse(localStorage.getItem("archiveNotesDates"));

  if (Array.isArray(n))   allNotes.notes = n;
  if (Array.isArray(nt))  allNotes.notesTitles = nt;
  if (Array.isArray(tn))  allNotes.trashNotes = tn;
  if (Array.isArray(tnt)) allNotes.trashNotesTitles = tnt;
  if (Array.isArray(an))  allNotes.archiveNotes = an;
  if (Array.isArray(ant)) allNotes.archiveNotesTitles = ant;
  if (Array.isArray(nd))  allNotes.notesDates = nd;
  if (Array.isArray(tnd)) allNotes.trashNotesDates = tnd;
  if (Array.isArray(and)) allNotes.archiveNotesDates = and;
}

loadData();
renderNotes();
renderTrashNotes();


