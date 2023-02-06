"use strict";
const bAdd = $('#bAdd');
const newEst = $('#newEst');
const taskcontroller = new TaskController();
const statecontroller = new StateController();
if (localStorage.getItem('states') == null) {
    initStates();
}
else {
    var states = getStates();
    states.forEach((element) => {
        var id = element.ref;
        if ($('#' + element.id)) {
            $('#' + element.id).innerHTML = element.title;
        }
        else {
            newState(id);
        }
    });
}
formStates();
render();
bAdd === null || bAdd === void 0 ? void 0 : bAdd.addEventListener('click', e => {
    const nombre = 'Nombre Tarea';
    const descripcion = 'Descripción';
    const prioridad = 'Prioridad';
    const estado = 'estado-1';
    taskcontroller.add({ name: nombre, priority: prioridad, description: descripcion, estado: estado });
    render();
});
newEst === null || newEst === void 0 ? void 0 : newEst.addEventListener('click', e => {
    const ref = getRefState();
    var id = 'titestado-' + (ref);
    newState(ref);
    formStates();
    addState(id, ref);
    render();
});
function formStates() {
    const estados = Array.from(document.getElementsByClassName('estado'));
    const cantcolumns = (estados.length);
    document.documentElement.style.setProperty('--cantcolumns', cantcolumns.toString());
}
function newState(ref) {
    const html = `
    <div class="column" id="col${ref}">
    <div class="button-close-state bg_primary" onclick="delState(${ref})">
        <span>X</span>
    </div>
        
        <h2 id="titestado-${ref}" class="mb-3" contenteditable="true" onblur="UpdateState(this)">Estado</h2>

        <div id="estado-${ref}"class="estado bg_secondary px-4 py-4">

        </div>
    </div>
    `;
    $('#col-estados').append(stringToHTML(html));
}
function stringToHTML(str) {
    var dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;
}
;
function initStates() {
    statecontroller.initStates();
}
function render() {
    const estados = Array.from(document.getElementsByClassName('estado'));
    var tasks = taskcontroller.getItems();
    estados.forEach(element => {
        let html = '';
        var id = element.getAttribute("id"); //Id el estado
        var taskE = tasks.filter(estado => estado.estado == id);
        taskE.forEach(item => {
            const { id, name, description, priority } = item;
            html += ` 
                <div class="task bg_primary box-hover px-4 py-3 mb-4" draggable="true" id="task-${id}">
                    <div class="button-close-task" onclick="delTask(${id},'task-${id}')">
                        <span>X</span>
                    </div>
                    <h3 class="mb-2" contenteditable="true" onblur="UpdateText(this, 'title', ${id})"> ${name}</h3>
                    <h4 class="mb-3" contenteditable="true" onblur="UpdateText(this, 'priority', ${id})">${priority}</h4>
                    <p class="mb-0 cl_text" contenteditable="true" onblur="UpdateText(this,'description', ${id})">${description} </p> 
                </div>
            `;
        });
        $('#' + id).innerHTML = html;
        $('#' + id).addEventListener("dragover", (e) => allowDrag(e));
        $('#' + id).addEventListener("drop", (e) => endDrag(e));
    });
    tasks.forEach(item => {
        var idT = "task-" + item.id;
        var tarea = $('#task-' + item.id);
        tarea === null || tarea === void 0 ? void 0 : tarea.addEventListener("dragstart", e => initDragg(e));
    });
}
function $(selector) {
    return document.querySelector(selector);
}
function initDragg(e) {
    var _a;
    const elementS = e.target;
    const id = elementS.getAttribute("id");
    (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("idTask", id);
}
function allowDrag(e) {
    e.preventDefault();
}
function endDrag(e) {
    const elementD = e.target;
    var idEstadoD = elementD.getAttribute("id");
    if (idEstadoD != null) {
        const estado = $('#' + idEstadoD);
        var idTask = e.dataTransfer.getData("idTask");
        estado.appendChild($('#' + idTask));
        var idItem = idTask.split('-')[1];
        taskcontroller.update(parseInt(idItem), idEstadoD);
    }
    e.preventDefault();
}
function UpdateText(e, elem, id) {
    const text = e.innerHTML;
    taskcontroller.updateText(text, elem, id);
}
function UpdateState(e) {
    const text = e.innerHTML;
    const id = e.getAttribute('id');
    statecontroller.updateState(id, text);
}
function getStates() {
    return statecontroller.getStates();
}
function getRefState() {
    return statecontroller.getRef();
}
function addState(id, ref) {
    statecontroller.addState({ id: id, title: 'estado', ref: ref });
}
function delTask(id, idDivTask) {
    taskcontroller.del(id);
    const divTask = $('#' + idDivTask);
    divTask.remove();
}
function delState(ref) {
    statecontroller.del(ref);
    taskcontroller.delbyState(ref);
    const divState = $('#col' + ref);
    const divPadre = divState.parentNode;
    divPadre === null || divPadre === void 0 ? void 0 : divPadre.remove();
    formStates();
}
