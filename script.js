// Ich erstelle einen Notizblock. Was muss der Notizblock können?

let notes = ["Apfelmus", "Bananenbrei", "Lila Kuh"];

function renderNotes() {
let notesRef = document.getElementById ("notescontent");
notesRef.innerHTML = "";

for (let index = 0; index < notes.length; index++) {
  const note = notes[index];
    notesRef.innerHTML += getNotesTemplate(note, index);
  }
}

function getNotesTemplate(note, index){
  return `<p>+ ${note} <button onclick= "deleteNote(${index})">X</button></p>`;
}


function addNote(){  //funktion um neue notizen zu erfassen, auszulesen und zu speichern
let noteInputRef = document.getElementById ("note_input"); 
let noteInput= noteInputRef.value; //value ist ein fester begriff in js und bezieht sich in dem fall auf den eingegebenen text
notes.push(noteInput); //speicherort wird durch push in das array notes festgelegt
renderNotes() //funktionsaufruf um die notizen anzeigen zu lassen
noteInputRef.value = ""; //leert das Inputfeld
}



function deleteNote(index) { 
  notes.splice(index,1)
  renderNotes();
}




/* Notizen speichern: 
- Datum- und Uhrzeitangabe mitspeichern
*/
// Suchfunktion für bereits erfasste Notizen
// Archivierungsmöglichkeit 
// Notizen öffnen und schließen können