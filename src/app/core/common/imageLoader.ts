import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
@Injectable()
export class Globals {

  public isLoad = true;
  public img = "assets/loader.gif";
  public logo = "assets/logo.png";
  public noCat = "assets/guitar.png";
  date = '2022-01-01'
  constructor(public datePipe: DatePipe) {

  }
  tools_replaceAll(str, find, replace) {
    var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    str = this.date + " " + str?.replace(new RegExp(escapedFind, 'g'), replace)
    return str = this.datePipe.transform(str, 'h:mm a')
  }

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
  //  timeConvert (time) {
  //   // Check correct time format and split into components
  //   time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  //   if (time.length > 1) { // If time format correct
  //     time = time.slice (1);  // Remove full string match value
  //     time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
  //     time[0] = +time[0] % 12 || 12; // Adjust hours
  //   }
  //   return time.join (''); // return adjusted time or original string
  // }

}