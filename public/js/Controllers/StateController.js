"use strict";
class StateController {
    constructor() {
        this.statemodel = new StateModel();
        this.statemodel = new StateModel();
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
