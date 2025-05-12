const notesContainer = document.getElementById("notes")
const addNoteButton = document.getElementById("addNotes");
var switchAudio = new Audio('switch.mp3')

loadNotes()

addNoteButton.addEventListener("click", function(){
    switchAudio.play()
    addNotes()
})

function getNotes(){
    const notesData = localStorage.getItem("stickyNotes-notes") 
    if(notesData === null || notesData === undefined){
        return "[]"
    }
    try{
        const parsedNotes =  JSON.parse(notesData)
        if(Array.isArray(parsedNotes)){
            return parsedNotes
        }
        else{
            console.warn("notes data is not an array")
        }
    }
    catch(error){
        console.error("Error parsing notes from localStorage")
        localStorage.removeItem("stickNotes-notes")
    }
    return "[]"
}

function loadNotes(){
    try {
        // Clear existing notes
        notesContainer.innerHTML = '';
        
        // Get notes from localStorage and create elements
        const notes = getNotes();
        
        // Double-check that notes is actually an array before using forEach
        if (Array.isArray(notes)) {
            notes.forEach(note => {
                if (note && typeof note === 'object' && 'id' in note && 'content' in note) {
                    const noteElement = createNoteElement(note.id, note.content);
                    notesContainer.appendChild(noteElement);
                }
            });
        } else {
            console.error("Notes is not an array in loadNotes:", notes);
            // Reset the notes to an empty array
            saveNotes([]);
        }
    } catch (error) {
        console.error("Error in loadNotes:", error);
        // Reset the container and localStorage if there's an error
        notesContainer.innerHTML = '';
        localStorage.removeItem("stickyNotes-notes");
    }
}

function saveNotes(notes){
    try{
        localStorage.setItem("stickyNotes-notes", JSON.stringify(notes))
    }
    catch(error){
        console.error("Error while saving notes")
    }
}

function createNoteElement(id, content){
   
    const element = document.createElement("div")

    /*
    element.style.userSelect = 'none'

    let posX = 0, posY = 0;
    let isDragging = false;

    element.addEventListener("mousedown", (e) => {
        isDragging = true;
        posX = e.clientX - element.getBoundingClientRect().left
        posY = e.clientY - element.getBoundingClientRect().top
        element.style.cursor = 'grab'
        e.preventDefault()
    })

    document.addEventListener("mousemove",(e) => {
        if(!isDragging) return;

        element.style.left = `${e.clientX - posX}px`;
        element.style.top = `${e.clientY - posY}px`;
    })

    document.getElementById("mouseup", (e) => {
        isDragging = false;
        element.style.cursor = 'grab'
        const notes = getNotes()
    const targetNote = notes.find(note => note.id == id)
    if(targetNote){
        targetNote.left = element.style.left;
        targetNote.right = element.style.right;
        saveNotes(notes)
    }
    })

    const notes = getNotes()
    const targetNote = notes.find(note => note.id == id)
    if(targetNote && targetNote.left && targetNote.right){
        element.style.left = targetNote.left;
        element.style.top = targetNote.top
    }
    */

    element.classList.add("note")
    element.contentEditable = true
    element.innerHTML= content;
    element.placeholder = "Write Something...!"
   
    element.addEventListener("input", () => {
        updateNote(id,element.innerHTML )
    })
    element.addEventListener("dblclick", () => {
        const del = confirm("Are you sure you wish to delete this note?")
        if(del){
            deleteNote(id, element)
        }
    })
    return element;
}

function addNotes(){
    const id = Date.now()
    const newNote = createNoteElement(id,"");
     
    notesContainer.appendChild(newNote)

    newNote.focus()

   const notes = getNotes()
   notes.push({id,content:""})
   saveNotes(notes)
}

function updateNote(id, newContent){
    const notes = getNotes()
    const targetNote = notes.find(note => note.id == id)

    if(targetNote){
        targetNote.content = newContent
        saveNotes(notes)
        console.log("note updated", notes)
    }

}

function deleteNote(id, element ){
    const notes = getNotes();
        const updatedNotes = notes.filter(note => String(note.id) !== String(id));
        saveNotes(updatedNotes);
        element.remove();
}