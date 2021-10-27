29

import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'date-format',
    template: `{{difference}}`
})
export class DateFormatComponent implements OnInit {
    @Input() date: Date;
    difference;
    constructor() {

    }

    ngOnInit() {
    this.difference = moment(this.date).fromNow();
     }

}
