"use strict";
class ArrayL {
    constructor() {
        this.stateItems = [];
    }
    initStates() {
        const statesini = [
            {
                'id': 'titestado-1',
                'title': 'Primer Estado',
                'ref': 1
            },
            {
                'id': 'titestado-2',
                'title': 'Segudo Estado',
                'ref': 2
            },
            {
                'id': 'titestado-3',
                'title': 'Tercer Estado',
                'ref': 3
            },
        ];
        localStorage.setItem('states', JSON.stringify(statesini));
    }
    getStates() {
        this.stateItems = JSON.parse(localStorage.getItem('states') || "");
        return this.stateItems;
    }
    addState(item) {
        this.stateItems = JSON.parse(localStorage.getItem('states') || "");
        this.stateItems.push(item);
        localStorage.setItem('states', JSON.stringify(this.stateItems));
    }
    updateState(idest, title) {
        const states = JSON.parse(localStorage.getItem('states') || "");
        var index = states.findIndex((element) => {
            return element.id == idest;
        });
        states[index].title = title;
        localStorage.setItem('states', JSON.stringify(states));
    }
    del(ref) {
        var itemsL = JSON.parse(localStorage.getItem('states') || "");
        var index = itemsL.findIndex((element) => {
            return element.ref == ref;
        });
        itemsL.splice(index, 1);
        localStorage.setItem('states', JSON.stringify(itemsL));
    }
    getRef() {
        var ref = 0;
        if (localStorage.getItem('states') != null) {
            if (JSON.parse(localStorage.getItem('states')).length > 0) {
                const statesT = JSON.parse(localStorage.getItem('states') || "");
                const orden = statesT.sort((a, b) => {
                    return Number.parseInt(b.ref) - Number.parseInt(a.ref);
                });
                ref = parseInt(orden[0].ref) + 1;
            }
        }
        return ref;
    }
}
class StateModel {
    constructor() {
        this.statemodel = new ArrayL();
    }
    initStates() {
        return this.statemodel.initStates();
    }
    getStates() {
        return this.statemodel.getStates();
    }
    addState(item) {
        this.statemodel.addState(item);
    }
    updateState(id, title) {
        return this.statemodel.updateState(id, title);
    }
    del(ref) {
        return this.statemodel.del(ref);
    }
    getRef() {
        return this.statemodel.getRef();
    }
}
