"use strict";
class ArrayList {
    constructor() {
        this.items = [];
    }
    add(item) {
        if (localStorage.getItem('tasks') != null) {
            this.items = JSON.parse(localStorage.getItem('tasks') || "");
        }
        this.items.push(item);
        localStorage.setItem('tasks', JSON.stringify(this.items));
    }
    getall() {
        if (localStorage.getItem('tasks') != null) {
            this.items = JSON.parse(localStorage.getItem('tasks') || "");
        }
        return this.items;
    }
    update(idItem, idEstadoD) {
        const itemsL = JSON.parse(localStorage.getItem('tasks') || "");
        var index = itemsL.findIndex((element) => {
            return element.id == idItem;
        });
        itemsL[index].estado = idEstadoD;
        localStorage.setItem('tasks', JSON.stringify(itemsL));
    }
    updateText(text, elem, id) {
        const itemsL = JSON.parse(localStorage.getItem('tasks') || "");
        var index = itemsL.findIndex((element) => {
            return element.id == id;
        });
        switch (elem) {
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
        localStorage.setItem('tasks', JSON.stringify(itemsL));
    }
    del(itemId) {
        var itemsL = JSON.parse(localStorage.getItem('tasks') || "");
        var index = itemsL.findIndex((element) => {
            return element.id == itemId;
        });
        itemsL.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(itemsL));
    }
    delbyState(ref) {
        var itemsL = JSON.parse(localStorage.getItem('tasks') || "");
        const estado = "estado-" + ref;
        var itemsF = itemsL.filter((elem) => {
            return elem.estado != estado;
        });
        localStorage.setItem('tasks', JSON.stringify(itemsF));
    }
    getId() {
        var Id = 0;
        if (localStorage.getItem('tasks') != null) {
            if (JSON.parse(localStorage.getItem('tasks')).length > 0) {
                const tasksT = JSON.parse(localStorage.getItem('tasks') || "");
                const orden = tasksT.sort((a, b) => {
                    return Number.parseInt(b.id) - Number.parseInt(a.id);
                });
                Id = parseInt(orden[0].id) + 1;
            }
        }
        return Id;
    }
}
class TaskModel {
    constructor() {
        this.count = 0;
        this.taskmodel = new ArrayList();
    }
    add(item) {
        var id = this.taskmodel.getId();
        item.id = id;
        this.taskmodel.add(item);
        return true;
    }
    getItems() {
        return this.taskmodel.getall();
    }
    update(idItem, idEstadoD) {
        return this.taskmodel.update(idItem, idEstadoD);
    }
    del(idItem) {
        return this.taskmodel.del(idItem);
    }
    delbyState(ref) {
        console.log('por aquí');
        return this.taskmodel.delbyState(ref);
    }
    updateText(text, elem, id) {
        return this.taskmodel.updateText(text, elem, id);
    }
    getAll() {
        return this.taskmodel.getall();
    }
    getId() {
        return this.taskmodel.getId();
    }
}
