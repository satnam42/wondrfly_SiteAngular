import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
@Injectable()
export class Globals {

  public isLoad = true;
  public img = "assets/loader.gif";
  public logo = "assets/logo.png";
  public noCat = "assets/guitar.png";
  date = 'Wed Mar 03 2021'
  constructor(public datePipe: DatePipe) {

  }
  // ---time converter
  tools_replaceAll(str, find, replace) {
    var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    str = this.date + " " + str?.replace(new RegExp(escapedFind, 'g'), replace)
    try {
      return str = this.datePipe.transform(str, 'h:mm a')
    }
    catch (err) {
    }
    finally {
      return str
    }
  }
  // ---get duration by start and end time
  timeDifference(from, end) {
    var timeStart: any = new Date("01/01/2007 " + from)
    var timeEnd: any = new Date("01/01/2007 " + end)
    var diffMs = timeEnd - timeStart;
    var hours = Math.floor((diffMs % 86400000) / 3600000); // hours
    var minutes = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    if (hours == 1 && !minutes) {
      var duration = hours + ':' + '00' + ' Hour'
    }
    else if (hours > 1 && !minutes) {
      var duration = hours + ':' + '00' + ' Hours'
    }
    else if (minutes == 1 && !hours) {
      var duration = '00' + ':' + minutes + ' Minute'
    }
    else if (minutes > 1 && !hours) {
      var duration = '00' + ':' + minutes + ' Minutes'
    }
    else {
      var duration = hours + ':' + minutes + ' Hours'
    }
    return duration
  }
  // ---get hours or minutes 
  getHourOrMinute(str, find, replace) {
    var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    str = this.date + " " + str?.replace(new RegExp(escapedFind, 'g'), replace)
    return str = this.datePipe.transform(str, 'mm')
  }

}