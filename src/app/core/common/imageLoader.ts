import { Injectable } from "@angular/core";
@Injectable()
export class Globals {
    public isLoad = true;
    public img = "assets/loader.gif";
    public logo = "assets/logo.png";
    public noCat = "assets/guitar.png";
    
    tools_replaceAll(str, find, replace) {
        var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        return str.replace(new RegExp(escapedFind, 'g'), replace);
      }
}