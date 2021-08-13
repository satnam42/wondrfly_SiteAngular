
export class Forum {

    _id: string;
    id: string;
    creator: string;
    creatorName: string;
    text: string;
    postId: string   ;
     tags: [];
    title: string;
    description: String;
    comments: [];
    likesCount: string;
    viewCount: string;
    like: boolean;

    constructor(obj?: any) {

        if (!obj) {
            return;
        }
        this._id = obj._id;
        this.id = obj.id;
        this.tags = obj.tags;
        this.title = obj.title;
        this.description = obj.description;
        this.comments = obj.comments;
        this.likesCount = obj.likesCount;
        this.viewCount = obj.viewCount;
        this.like = obj.like;
        this.creator = obj.creator;
        this.creatorName = obj.creatorName;
        this.postId = obj.postId;
        this.text = obj.text;
        this.text = obj.text;

    }
}