interface TaskItem {
    id?: number,
    name: string,
    priority: string,
    description: string,
    estado: string,
}

interface ItaskModel{
    taskmodel:ArrayList<TaskItem>,

}


class ArrayList<T>{
    private items:T[];

    constructor(){
        this.items = [];
    }


    add(item:T):void{

        if (localStorage.getItem('tasks')!=null)
        {
            this.items = JSON.parse(localStorage.getItem('tasks') || "");
        }

        this.items.push(item)
        localStorage.setItem('tasks',JSON.stringify(this.items));
    }


    getall():T[]{
        if (localStorage.getItem('tasks')!=null)
        {
            this.items = JSON.parse(localStorage.getItem('tasks') || "");
        }

            return this.items;
    
    }


    update(idItem: number, idEstadoD: string):void{
        const itemsL = JSON.parse(localStorage.getItem('tasks') || "");
        var index = itemsL.findIndex((element: { id: number; }) =>{
            return element.id == idItem;
        })
        itemsL[index].estado = idEstadoD;
        localStorage.setItem('tasks',JSON.stringify(itemsL));

    }

    updateText(text:string, elem:string, id:number){
        const itemsL = JSON.parse(localStorage.getItem('tasks') || "");
        var index = itemsL.findIndex((element: { id: number; }) =>{
            return element.id == id;
        })
        switch (elem){
            case 'title':
                itemsL[index].name = text;
                break;
            case 'priority':
                itemsL[index].priority = text;
                break;
            case 'description':
                itemsL[index].description = text;
                break;
        }
        localStorage.setItem('tasks',JSON.stringify(itemsL));
    }

    del(itemId:number){
        var itemsL = JSON.parse(localStorage.getItem('tasks') || "");
        var index = itemsL.findIndex((element: { id: number; }) =>{
            return element.id == itemId;
        })
        itemsL.splice(index,1);
        localStorage.setItem('tasks',JSON.stringify(itemsL));
    }

    delbyState(ref:number){
        var itemsL = JSON.parse(localStorage.getItem('tasks') || "")
        const estado = "estado-"+ref;

        var itemsF = itemsL.filter((elem: { estado: string; }) =>{
            return elem.estado != estado;
        })

        localStorage.setItem('tasks',JSON.stringify(itemsF));

    }


    getId(){

        var Id = 0
        
        if (localStorage.getItem('tasks')!=null)
        {
            if (JSON.parse(localStorage.getItem('tasks')!).length>0)
            {
                const tasksT = JSON.parse(localStorage.getItem('tasks') || "");

                const orden = tasksT.sort((a: { id: string; },b: { id: string; }) =>{
                return Number.parseInt(b.id) - Number.parseInt(a.id)
              });

              Id = parseInt(orden[0].id) + 1;
            }
            

        }
        
        return Id;
    }

}
class TaskModel implements ItaskModel{
    taskmodel: ArrayList<TaskItem>;
    
    private count=0;
    
    constructor(){
        this.taskmodel = new ArrayList<TaskItem>();
    }

    add(item: TaskItem): boolean {

        var id = this.taskmodel.getId();

        item.id = id;
        this.taskmodel.add(item);

        
        return true;
    }

    getItems():TaskItem[]{
        return this.taskmodel.getall();
    }


    update(idItem: number, idEstadoD: string){
        return this.taskmodel.update(idItem, idEstadoD);
    }
    del(idItem:number){
        return this.taskmodel.del(idItem);
    }
    delbyState(ref:number){
        console.log ('por aquí');
        return this.taskmodel.delbyState(ref);
    }
    updateText(text:string, elem:string, id:number){
        return this.taskmodel.updateText(text,elem,id);
    }

    getAll(){
        return this.taskmodel.getall();
    }

    getId():number{
        return this.taskmodel.getId();
    }



}
