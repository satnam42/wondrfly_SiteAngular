
export class Batch {

    name = '';
    startDate = new Date;
    endDate = new Date;
    startTime = new Date;
    endTime = new Date;
    length: any;
    
    constructor(obj?: any) {

        if (!obj) {
            return;
        }
        this.name = obj.name;
        this.startDate = obj.startDate;
        this.endDate = obj.endDate;
        this.startTime = obj.startTime;
        this.endTime = obj.endTime;
   
    }
}