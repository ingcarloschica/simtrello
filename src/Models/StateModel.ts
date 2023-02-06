interface StateItem {
    id: string,
    title: string,
    ref: number,
}

interface IstateModel{
    statemodel:ArrayL<StateItem>,
}

class ArrayL<T>{
    private stateItems:T[];

    constructor(){
        this.stateItems = [];
    }

    initStates(){
        const statesini = [
            {
                'id'    : 'titestado-1',
                'title' : 'Primer Estado',
                'ref'   : 1
            },
            {
                'id'    : 'titestado-2',
                'title' : 'Segudo Estado',
                'ref'   : 2
            },
            {
                'id'    : 'titestado-3',
                'title' : 'Tercer Estado',
                'ref'   : 3
            },
    ];

    localStorage.setItem('states', JSON.stringify(statesini));

    }

    getStates():T[]{
        this.stateItems = JSON.parse(localStorage.getItem('states') || "");

        return this.stateItems;

    }

    addState(item:T){
        this.stateItems = JSON.parse(localStorage.getItem('states') || "")

        this.stateItems.push(item);

        localStorage.setItem('states',JSON.stringify(this.stateItems));

    }

    updateState(idest:string, title:string){
        const states = JSON.parse(localStorage.getItem('states') || "");

        var index = states.findIndex((element: { id: string; }) =>{
            return element.id == idest;
        })

        states[index].title = title;

        localStorage.setItem('states',JSON.stringify(states));

    }

    del(ref:number){
        var itemsL = JSON.parse(localStorage.getItem('states') || "");
        var index = itemsL.findIndex((element: { ref: number; }) =>{
            return element.ref == ref;
        })
        itemsL.splice(index,1);
        localStorage.setItem('states',JSON.stringify(itemsL));

        
    }

    getRef():number{
        var ref = 0;
        
        if (localStorage.getItem('states')!=null)
        {
            if (JSON.parse(localStorage.getItem('states')!).length>0)
            {
                const statesT = JSON.parse(localStorage.getItem('states') || "");

                const orden = statesT.sort((a: { ref: string; },b: { ref: string; }) =>{
                return Number.parseInt(b.ref) - Number.parseInt(a.ref)
              });

              ref = parseInt(orden[0].ref) + 1;
            }
        }
        return ref;
    }

}

class StateModel implements IstateModel{
    statemodel: ArrayL<StateItem>;

    constructor(){
        this.statemodel = new ArrayL<StateItem>();
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