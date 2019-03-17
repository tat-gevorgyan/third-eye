import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-clustered',
	templateUrl: './clustered.component.html',
	styleUrls: ['./clustered.component.css']
})
export class ClusteredComponent implements OnInit {

	clusteredData: Array<Object> = [];

	maxHeaderSize: number = 0;

	constructor(private dataService: DataService,
		private router: Router) { }

	ngOnInit() {
		this.clusteredData = this.dataService.getClusteredData();
		if (!this.clusteredData.length)
			this.router.navigate(['/home']);
		else this.getHeaderSize();
	}

	getHeaderSize() {
		for (let item of this.clusteredData)
			if (item['themes'].length > this.maxHeaderSize)
				this.maxHeaderSize = item['themes'].length;
	}

	getEmptyCellCountArray(item: any) {
		return new Array(this.maxHeaderSize - item['themes'].length);
	}

	getClusteredString(item: object, theme: string) {
		let keywords: Array<string> = item['keywords'].split(', ')
		for (let keyword of keywords) {
			theme = theme.replace(keyword, `<strong>${keyword}</strong>`);
		}
		return theme;
	}
}
