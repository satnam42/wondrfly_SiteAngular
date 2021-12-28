import { Category } from 'src/app/core/models';
import { Time } from '@angular/common';
import { User } from './user.model';

export class Program {
    id: string;
    // tslint:disable-next-line:variable-name
    _id: string;
    name: string;
    description: string;
    type: string;
    email: string;
    price: string;
    location: string;
    code: string;
    userId: string;
    searchData: string;
    programId: string;
    time: any = {};
    date: any = {};
    ageGroup: any = {};
    bookingCancelledIn: any = {};
    duration:any = {};

    isFree: boolean;
    isFav: boolean;
    adultAssistanceIsRequried: boolean;
    isPublished: boolean;

    pricePerParticipant: string;
    priceForSiblings: string;
    specialInstructions: string;
    capacity: any = {};
    emails: [];
    batches: any[];
    status: string;
    programCoverPic: string;
    addresses: [];
    categoryId: string;
    tags: any = [];
    timelinePics: any[];
    user: string;
    users: any;
    length: any;
    lat: any
    lng: any
    provider: User
    logo:string
    programOwner: string;
    sessions: any = [];
    programImage:string;
    pricePeriod:any={}
    averageFinalRating:any
    subCategoryIds:any=[]
    category:any = {}
    realTime:any = {}
    inpersonOrvirtual: string;
    joiningLink: string;

    constructor(obj?: any) {

        if (!obj) {
            return;
        }

        this.id = obj.id;
        this._id = obj._id;
        this.userId = obj.userId;
        this.programId = obj.programId;
        this.name = obj.name;
        this.programCoverPic = obj.programCoverPic;
        this.email = obj.name;
        this.description = obj.description;
        this.type = obj.type;
        this.price = obj.price;
        this.location = obj.location;
        this.code = obj.code;
        this.status = obj.status;
        this.time = obj.time;
        this.date = obj.date;
        this.searchData = obj.searchData;
        this.ageGroup = obj.ageGroup;
        this.bookingCancelledIn = obj.bookingCancelledIn;
        this.duration = obj.duration;
        this.isFree = obj.isFree;
        this.pricePerParticipant = obj.pricePerParticipant;
        this.priceForSiblings = obj.priceForSiblings;
        this.specialInstructions = obj.specialInstructions;
        this.adultAssistanceIsRequried = obj.adultAssistanceIsRequried;
        this.capacity = obj.capacity;
        this.emails = obj.emails;
        this.userId = obj.userId;
        this.addresses = obj.addresses;
        this.tags = obj.tags;
        this.categoryId = obj.categoryId;
        this.timelinePics = obj.timelinePics;
        this.user = obj.user;
        this.isPublished = obj.isPublished
        this.lat = obj.lat
        this.lng = obj.lng
        this.provider = obj.provider
    this.logo = obj.logo
    this.programOwner = obj.programOwner
    this.sessions=obj.sessions;
    this.programImage = obj.programImage;
    this.pricePeriod = obj.pricePeriod
    this.averageFinalRating = obj.averageFinalRating
    }
}
