import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
	selector: 'app-clustered',
	templateUrl: './clustered.component.html',
	styleUrls: ['./clustered.component.css']
})
export class ClusteredComponent implements OnInit {

	clusteredData: Array<Object> = [];

	maxHeaderSize: number = 0;

	constructor(private dataService: DataService) { }

	ngOnInit() {
		this.clusteredData = this.dataService.getClusteredData();
		this.getHeaderSize();
	}

	getHeaderSize() {
		for (let item of this.clusteredData)
			if (item['themes'].length > this.maxHeaderSize)
				this.maxHeaderSize = item['themes'].length;
	}

	getEmptyCellCountArray(item: any) {
		return new Array(this.maxHeaderSize - item['themes'].length);
	}

}
