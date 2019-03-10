import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { timer } from 'rxjs';

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

	@Output() onDone: EventEmitter<any> = new EventEmitter();

	percent: number = 0;

	private finished: boolean = false;

	private started: boolean = false;

	private interval;

	constructor() { }

	public start() {
		this.started = true;
		this.interval = setInterval(() => {
			this.percent += 25;
			if(this.percent === 75) 
				clearInterval(this.interval);
		}, 200);
	}

	public setPercent(percent: number) {
		this.percent = percent;
		if (percent === 100) {
			clearInterval(this.interval)
			setTimeout(() => {
				this.finished = true;
				this.onDone.emit();
				this.started = false;
			}, 1000)
		}
	}

	getDisplay() {
		return !this.started || this.finished ? 'none' : 'flex';
	}
}
