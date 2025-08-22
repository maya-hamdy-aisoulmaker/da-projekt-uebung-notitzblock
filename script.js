let notes = ["Apfelmus", "Bananenbrei", "Lila Kuh"];

let trashNotes = [];


function renderNotes() {
let notesRef = document.getElementById ("notescontent");
notesRef.innerHTML = "";

for (let index = 0; index < notes.length; index++) {
  const note = notes[index];
    notesRef.innerHTML += getNotesTemplate(note, index);
  }
}

function renderTrashNotes() {
  let trashNotesRef = document.getElementById ("trash_content");
  trashNotesRef.innerHTML = "";
  
  for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {
    const note = trashNotes[indexTrashNote];
    trashNotesRef.innerHTML += getTrashNotesTemplate(note, indexTrashNote);
    }
  }

function getNotesTemplate(note, index){
  return `<p>+ ${note} <button onclick= "transferToTrash(${index})">X</button></p>`;
}

function getTrashNotesTemplate(note, indexTrashNote){
  return `<p>+ ${note}
  <button onclick= "restoreNote(${indexTrashNote})">restore</button>
  <button onclick= "deleteNote(${indexTrashNote})">X</button>
  </p>`;
}

function addNote(){  //funktion um neue notizen zu erfassen, auszulesen und zu speichern
let noteInputRef = document.getElementById ("note_input"); 
let noteInput= noteInputRef.value; //value ist ein fester begriff in js und bezieht sich in dem fall auf den eingegebenen text
notes.push(noteInput); //speicherort wird durch push in das array notes festgelegt
renderNotes() //funktionsaufruf um die notizen anzeigen zu lassen
noteInputRef.value = ""; //leert das Inputfeld
}


function transferToTrash(index) { 
  let trashNote = notes.splice(index,1);  //via splice und der zahl (markiert wieviele elemente entfernt werden) notizen löschen
  trashNotes.push(trashNote);
  renderNotes(); //funktionsaufruf 
  renderTrashNotes(); //funktionsaufruf
}

function deleteNote(index) { 
  trashNotes.splice(index, 1)  //via splice und der zahl (markiert wieviele elemente entfernt werden) notizen löschen
  renderTrashNotes(); //funktionsaufruf 
}
function restoreNote(index) {
  let restoredNote = trashNotes.splice(index, 1)[0];
  notes.push(restoredNote);
  renderNotes();
  renderTrashNotes();
}

/* Notizen speichern: 
- Datum- und Uhrzeitangabe mitspeichern
*/
// Suchfunktion für bereits erfasste Notizen
// Archivierungsmöglichkeit 
