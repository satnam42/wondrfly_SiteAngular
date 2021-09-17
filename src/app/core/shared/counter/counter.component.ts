29

import { Component, ElementRef, OnDestroy, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
    selector: 'counter',
    template: `
    {{message}}
`
})
export class CounterComponent implements OnInit, OnDestroy {

     future: Date;
     @Input() futureString: Date;
     counter$: Observable<number>;
     subscription: Subscription;
     message: string;

    constructor(elm: ElementRef) {
          this.futureString

    }

    dhms(t) {
        var days, hours, minutes, seconds;
        days = Math.floor(t / 86400);
        t -= days * 86400;
        hours = Math.floor(t / 3600) % 24;
        t -= hours * 3600;
        minutes = Math.floor(t / 60) % 60;
        t -= minutes * 60;
        seconds = t % 60;

        return [
            days + 'd',
            hours + 'h',
            minutes + 'm',
            seconds + 's'
        ].join(' ');
    }


    ngOnInit() {
        this.future = new Date(this.futureString);
        this.future.setDate( this.future.getDate() + 3 )
        this.counter$ = Observable.interval(1000).map((x) => {
           return Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
        });

        this.subscription = this.counter$.subscribe((x) => this.message = this.dhms(x));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
