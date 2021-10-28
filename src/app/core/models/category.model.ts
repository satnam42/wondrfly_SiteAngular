
export class Category {

    _id: string;
    id: string;
    token: string;
    name: string;
    description: String;
    length: any;
    isActivated:boolean;

    constructor(obj?: any) {

        if (!obj) {
            return;
        }
        this._id = obj._id;
        this.id = obj.id;
        this.token = obj.token;
        this.name = obj.name;
        this.description = obj.description
        this.isActivated = obj.isActivated

    }
}