const listElement = document.querySelector('ul')
const inputElement = document.querySelector('input')
const buttonElement = document.querySelector('button')

const tarefas = JSON.parse(localStorage.getItem('listTarefas')) || []

buttonElement.setAttribute('onclick', 'addTerefa()')

function addTerefa() {
    if (inputElement.value === '') {
        alert("Voce deve digitar alguma tarefa.");
    } else {
        const tarefa = inputElement.value
        tarefas.push(tarefa)
        inputElement.value = ''
        mostraTarefas()
        salvarNoLocalStorage()
    }
}

document.addEventListener('keypress', function (event) {
    if (event.key == 'Enter') {
        if (inputElement.value === '') {
            alert("Você deve digitar alguma tarefa.");
        } else {
            const tarefa = inputElement.value
            tarefas.push(tarefa)
            inputElement.value = ''
            mostraTarefas()
            salvarNoLocalStorage()
        }
    }
})

function mostraTarefas() {

    listElement.innerHTML = ''

    for (item of tarefas) {
        const itemList = document.createElement('li')
        itemList.setAttribute('class', 'item')

        const checkList = document.createElement('input')
        checkList.setAttribute('type', 'checkbox')
        checkList.setAttribute('class', 'regular-checkbox')
        checkList.setAttribute('store', item)
        itemList.appendChild(checkList)

        const descricao = document.createElement('p')
        descricao.setAttribute('class', 'conteudo')
        descricao.textContent = item
        itemList.appendChild(descricao)

        const linkElement = document.createElement('i')
        linkElement.setAttribute('class', 'far fa-trash-alt')

        const indice = tarefas.indexOf(item)
        linkElement.setAttribute('onclick', `removeTarefa(${indice})`)

        itemList.appendChild(linkElement)

        listElement.appendChild(itemList)

        const boxes = document.querySelectorAll("input[type='checkbox']");
        for (var i = 0; i < boxes.length; i++) {
            const box = boxes[i];
            if (box.hasAttribute("store")) {
                setupBox(box);
            }
        }

        function setupBox(box) {
            const storageId = box.getAttribute("store");
            const oldVal = localStorage.getItem(storageId);
            box.checked = oldVal === "true" ? true : false;
            box.addEventListener("change", function () {
                localStorage.setItem(storageId, this.checked);
            });
        }
    }
}

mostraTarefas()

function salvarNoLocalStorage() {
    localStorage.setItem('listTarefas', JSON.stringify(tarefas))
}

function removeTarefa(indice) {
    const confirmar = window.confirm('Deseja mesmo apagar esta tarefa?')
    if(confirmar == true){
        tarefas.splice(indice, 1)
        mostraTarefas()
        salvarNoLocalStorage()
    }
}



