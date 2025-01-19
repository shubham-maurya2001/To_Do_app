const item = document.querySelector("#item")
const toDoBox = document.querySelector("#to-do-box")
item.addEventListener(
    "keyup",
    function(event) { 
        if (event.key == "Enter" && event.target.value!="") {
            addToDo(this.value) 
            saveNotes();
            this.value = ""
        }
    }
)
const addToDo = (item="") => {
    const listItem = document.createElement("li");
    if(item!=""){
        listItem.innerHTML = `
        ${item}
        <i class="fas fa-times"></i>
        `;
    }
    listItem.addEventListener(
        "click",
        function() {
            this.classList.toggle("done");
        }
    )
    listItem.querySelector("i").addEventListener(
        "click",
        function() {
            listItem.remove() 
            saveNotes();
        }
    )
    toDoBox.appendChild(listItem);
}
const saveNotes = ()=>{
    const task = [];
    const li = document.querySelectorAll("li");
    for(let i = 0; i<li.length; i++){
        task.push(li[i].innerText);
    }
    if(task.length === 0) {
        localStorage.removeItem("Notes")
    } else {
        localStorage.setItem("Notes", JSON.stringify(task))
    }  
}

(
    function() {
        const lsNotes = JSON.parse(localStorage.getItem("Notes"));
        // console.log(lsNotes);
        if (lsNotes === null) {
            addToDo()
        } else {
            lsNotes.forEach(
                (lsNote) => {
                    addToDo(lsNote)
                }
            )
        }

    }
)() 