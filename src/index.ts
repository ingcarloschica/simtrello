const bAdd      = $('#bAdd') as HTMLButtonElement;
const newEst    = $('#newEst') as HTMLButtonElement;

const taskcontroller = new TaskController();
const statecontroller = new StateController();

if (localStorage.getItem('states')==null){
    initStates();
}else{
    var states = getStates();

    states.forEach((element) => {
        var id = element.ref;
        if ($('#'+element.id)){
                $('#'+element.id).innerHTML = element.title;
            }else{
                newState(id);
            }
    });
}

formStates();

render();

bAdd?.addEventListener('click', e=>{
    const nombre = 'Nombre Tarea';
    const descripcion = 'Descripción';
    const prioridad = 'Prioridad';
    const estado = 'estado-1'

    taskcontroller.add({name: nombre, priority: prioridad, description: descripcion, estado: estado})
    render();
});

newEst?.addEventListener('click', e=>{

    const ref = getRefState();
    var id = 'titestado-'+(ref);

    newState(ref);
    formStates();
    addState(id, ref);
    render();

});

function formStates(){
    const estados = Array.from(document.getElementsByClassName('estado'));
    const cantcolumns = (estados.length);
    document.documentElement.style.setProperty('--cantcolumns', cantcolumns.toString());
}

function newState(ref:number)
{
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

function stringToHTML(str:string) {
	var dom = document.createElement('div');
	dom.innerHTML = str;
	return dom;
};

function initStates(){
    statecontroller.initStates();
}

function render(){

  

    const estados = Array.from(document.getElementsByClassName('estado'));
    var tasks = taskcontroller.getItems();

    estados.forEach(element => {
        
        let html = '';
        
        var id = element.getAttribute("id"); //Id el estado
        var taskE = tasks.filter(estado => estado.estado == id);

        taskE.forEach(item =>{
            const {id, name, description, priority} = item;

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

        $('#'+id).innerHTML =  html;
        $('#'+id).addEventListener("dragover", (e) => allowDrag(e));
        $('#'+id).addEventListener("drop", (e) => endDrag(e));
    });

    tasks.forEach(item =>{
        var idT = "task-"+item.id;
        var tarea = $('#task-'+item.id) as HTMLDivElement;
        tarea?.addEventListener("dragstart", e => initDragg(e));
    });
}



function $(selector:string):HTMLElement{
    return document.querySelector(selector) as HTMLElement;
}



function initDragg(e: DragEvent)
{
    const elementS = e.target as HTMLDivElement;
    const id = elementS.getAttribute("id") as string;
    e.dataTransfer?.setData("idTask", id);
}

function allowDrag(e: DragEvent){
    e.preventDefault();
}

function endDrag(e: DragEvent){
    const elementD = e.target as HTMLDivElement;
    var idEstadoD = elementD.getAttribute("id") as string;

    if (idEstadoD!=null){
        const estado = $('#'+idEstadoD) as HTMLDivElement;
        var idTask = e.dataTransfer!.getData("idTask");
        estado.appendChild($('#'+idTask) as HTMLDivElement);
        var idItem = idTask.split('-')[1];
        taskcontroller.update(parseInt(idItem), idEstadoD);
    }

    e.preventDefault();
}

function UpdateText(e:HTMLElement,elem:string, id:number)
{
    const text = e.innerHTML;
    taskcontroller.updateText(text,elem,id);
}

function UpdateState(e:HTMLElement)
{
    const text = e.innerHTML;
    const id = e.getAttribute('id') as string;
    statecontroller.updateState(id,text);
}

function getStates()
{
    return statecontroller.getStates();
}

function getRefState():number
{
    return statecontroller.getRef();
}

function addState(id:string, ref:number)
{
    statecontroller.addState({id: id, title:'estado', ref: ref});
}

function delTask(id:number, idDivTask:string)
{
    taskcontroller.del(id);
    const divTask = $('#'+idDivTask) as HTMLDivElement;
    divTask.remove();
}

function delState(ref:number)
{
    statecontroller.del(ref);
    taskcontroller.delbyState(ref);
    const divState = $('#col'+ref) as HTMLDivElement;
    const divPadre = divState.parentNode as HTMLElement;


    divPadre?.remove();
    formStates();

}
