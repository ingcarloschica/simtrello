class TaskController{
    public taskmodel = new TaskModel();
    
    private count=0;
    
    constructor(){
        this.taskmodel = new TaskModel();
    }

    add(item: TaskItem): boolean {

        var id = this.taskmodel.getId();

        item.id = id;
        this.taskmodel.add(item);

        return true;
    }

    getItems():TaskItem[]{
        return this.taskmodel.getAll();
    }

    update(idItem: number, idEstadoD: string){
        return this.taskmodel.update(idItem, idEstadoD);
    }
    del(idItem:number){
        return this.taskmodel.del(idItem);
    }
    delbyState(ref:number){
        return this.taskmodel.delbyState(ref);
    }
    updateText(text:string, elem:string, id:number){
        return this.taskmodel.updateText(text,elem,id);
    }



}