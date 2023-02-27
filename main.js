// let numInput = document.getElementById("numInput");
// let loginDiv = document.getElementById("modalLogin");
// let submit = document.getElementById("submit");
// let token=localStorage.getItem('password')?JSON.parse(localStorage.getItem('password')):"";
// numInput.value=token;

// function closeModal() {
//     localStorage.setItem('password',numInput.value);
//     loginDiv.style.display = "none";

// }
// submit.addEventListener('click',closeModal);

const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

const toDoInput = document.getElementById("todo-input");
const toDoEnter = document.getElementById("todo-enter");
let toDoList = document.querySelector(".todo__list");
let item = document.getElementById("item");


toDoEnter.addEventListener("click", () => {
    const item = document.querySelector("#item")
    createItem(item)
})

document.querySelector("#item").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const item = document.querySelector("#item")
        createItem(item)
    }
})

function displayItems() {
    let items = ""
    for (let i = 0; i < itemsArray.length; i++) {
        items += `<div class="item todo__item">
                <div class="input-controller">
                  <input type="text" value="${itemsArray[i]}" disabled>
                  <div class="edit-controller">
                    <button class="deleteBtn">Delete</button>
                    <button class="editBtn">Edit</button>
                  </div>
                </div>
                <div class="update-controller">
                  <button class="saveBtn">Save</button>
                  <button class="cancelBtn">Cancel</button>
                </div>
              </div>`
    }
    document.querySelector(".todo__list").innerHTML = items;
    itemDelete()
    itemEdit()
    itemSave()
    itemCancel()
}
function itemDelete() {
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((dB, i) => {
        dB.addEventListener("click", () => { deleteItem(i) })
    })
}

function itemEdit() {
    const editBtn = document.querySelectorAll(".editBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller input")
    editBtn.forEach((eB, i) => {
        eB.addEventListener("click", () => {
            updateController[i].style.display = "block"
            inputs[i].disabled = false
        })
    })
}

function itemSave() {
    const saveBtn = document.querySelectorAll(".saveBtn")
    const inputs = document.querySelectorAll(".input-controller input")
    saveBtn.forEach((sB, i) => {
        sB.addEventListener("click", () => {
            updateItem(inputs[i].value, i)
        })
    })
}

function itemCancel() {
    const cancelBtn = document.querySelectorAll(".cancelBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller input")
    cancelBtn.forEach((cB, i) => {
        cB.addEventListener("click", () => {
            updateController[i].style.display = "none"
            inputs[i].disabled = true
            inputs[i].style.border = "none"
        })
    })
}

function createItem(item) {
    itemsArray.push(item.value)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    location.reload()
}

function deleteItem(i) {
    itemsArray.splice(i, 1)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    location.reload()
}

function updateItem(text, i) {
    itemsArray[i] = text
    localStorage.setItem('items', JSON.stringify(itemsArray))
    location.reload()
}

window.onload = function () {
    displayItems()
};