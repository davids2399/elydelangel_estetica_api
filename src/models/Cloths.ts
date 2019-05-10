export class Cloth{

    id: number | undefined;
    name: string | undefined;
    color: string | undefined;
    width: string | undefined;
    composition: string | undefined;

    constructor(){

    }
}

export class Catalogue{
    id: number | undefined;
    name: string | undefined;
    cloths: Cloth[] = [];

    constructor(){}

}

export class Collection{
    id: number | undefined;
    name: string | undefined;
    catalogues: Catalogue[];

    constructor(){
        this.id = 0;
        this.name = '';
        this.catalogues = [];
    }

    cleanCatalogues(): Catalogue[]{
        var filtered = this.catalogues.filter(
            function (el) {
                return el != null;
            }
        );

        return this.catalogues = filtered;
    }
}

