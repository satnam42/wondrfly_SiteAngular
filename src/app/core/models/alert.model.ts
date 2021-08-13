
export class Alert {

    _id: string;
    email: string;
    fromDate: string;
    toDate: string;
    msg: string;
    msgType: string;
    alertFor: string;
    userId: string;
    alertId: string;

    constructor(obj?: any) {

        if (!obj) {
            return;
        }
        this.email = obj.email;
        this.fromDate = obj.fromDate;
        this.toDate = obj.toDate;
        this.msg = obj.msg;
        this.msgType = obj.msgType;
        this.alertFor = obj.alertFor;
        this.userId = obj.userId;
        this.alertId = obj.alertId;

    }
}