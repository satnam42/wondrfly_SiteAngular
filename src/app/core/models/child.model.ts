
export class Child {
  id: string;
  userId: string;
  addressLine1: string;
  addressLine2: string;
  emailId: string;
  email: string;
  mobile: number;
  phoneNumber: string;
  _id: string;
  parent: string;
  name: string;
  age: string;
  sex: string;
  dob: string;
  interestInfo = [];
  relationToChild: string;
  avtar: string;
  contactOtherInfo: string;
  schoolInfo: string;
  dislikes: string;
  alergies: string;
  parentNotes: string;
  parentId: string;
  length: any;
  isActivated:boolean;
  gradeLevel:string;
  fromWhereYouHeard:string;


  constructor(obj?: any) {

    if (!obj) {
      return;
    }

    this.id = obj.id;
    this.name = obj.name;
    this.emailId = obj.emailId;
    this.email = obj.email;
    this.addressLine1 = obj.addressLine1;
    this.addressLine2 = obj.addressLine2;
    this.mobile = obj.mobile;
    this.phoneNumber = obj.phoneNumber;


    this._id = obj._id;
    this.parent = obj.parent;
    this.dob = obj.dob;
    this.age = obj.age;
    this.interestInfo = obj.interestInfo;
    this.relationToChild = obj.relationToChild;
    this.avtar = obj.avtar;
    this.contactOtherInfo = obj.contactOtherInfo;
    this.schoolInfo = obj.schoolInfo;
    this.dislikes = obj.dislikes;
    this.alergies = obj.alergies;
    this.parentNotes = obj.parentNotes;
    this.parentId = obj.parentId;
    this.isActivated = obj.isActivated;
    this.gradeLevel = obj.gradeLevel;
    this.fromWhereYouHeard = obj.fromWhereYouHeard;


  }
}
