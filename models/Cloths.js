"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cloth {
    constructor() {
    }
}
exports.Cloth = Cloth;
class Catalogue {
    constructor() {
        this.cloths = [];
    }
}
exports.Catalogue = Catalogue;
class Collection {
    constructor() {
        this.id = 0;
        this.name = '';
        this.catalogues = [];
    }
    cleanCatalogues() {
        var filtered = this.catalogues.filter(function (el) {
            return el != null;
        });
        return this.catalogues = filtered;
    }
}
exports.Collection = Collection;
