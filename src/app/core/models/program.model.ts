
import { BooleanLiteral } from 'typescript';
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
    inpersonOrVirtual: string;
    joiningLink: string;
    isDateNotMention:boolean;
    isTimeNotMention:Boolean;
    error:any;
}
