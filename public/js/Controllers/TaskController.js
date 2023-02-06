"use strict";
class TaskController {
    constructor() {
        this.taskmodel = new TaskModel();
        this.count = 0;
        this.taskmodel = new TaskModel();
    }
    add(item) {
        var id = this.taskmodel.getId();
        item.id = id;
        this.taskmodel.add(item);
        return true;
    }
    getItems() {
        return this.taskmodel.getAll();
    }
    update(idItem, idEstadoD) {
        return this.taskmodel.update(idItem, idEstadoD);
    }
    del(idItem) {
        return this.taskmodel.del(idItem);
    }
    delbyState(ref) {
        return this.taskmodel.delbyState(ref);
    }
    updateText(text, elem, id) {
        return this.taskmodel.updateText(text, elem, id);
    }
}
