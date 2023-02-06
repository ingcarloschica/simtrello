class StateController{
    public statemodel = new StateModel();

    constructor(){
        this.statemodel = new StateModel();
    }

    initStates(){
        return this.statemodel.initStates();
    }

    getStates(){
        return this.statemodel.getStates();
    }

    addState(item:StateItem){
        this.statemodel.addState(item);
    }

    updateState(id:string, title:string){
        return this.statemodel.updateState(id,title);
    }

    del(ref:number){
        return this.statemodel.del(ref);
    }

    getRef():number{
        return this.statemodel.getRef();
    }
}