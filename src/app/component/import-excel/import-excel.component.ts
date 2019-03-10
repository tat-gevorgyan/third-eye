import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import { ClusterService } from '../../service/cluster.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
	selector: 'app-import-excel',
	templateUrl: './import-excel.component.html',
	styleUrls: ['./import-excel.component.css']
})
export class ImportExcelComponent implements OnInit {

	@ViewChild('loading') loadingComponent: LoadingComponent;

	importedData: Array<any> = [];

	private selectedCells = [];

	constructor(private dataService: DataService,
		private clusterService: ClusterService,
		private router: Router) { }

	ngOnInit() {
		this.importedData = this.dataService.getImportedExcelData();
	}

	setSelection(index1: number, index2: number) {
		let result = this.isSelected(index1, index2)
		result == null
			? this.selectedCells.push({ index1: index1, index2: index2 })
			: this.selectedCells.splice(result, 1)
	}

	isSelected(index1: number, index2: number): any {
		for (let i = 0; i < this.selectedCells.length; i++)
			if (this.selectedCells[i].index1 == index1
				&& this.selectedCells[i].index2 == index2)
				return i;
		return null;
	}

	start() {
		let text = '';
		for(let cell of this.selectedCells) {
			if(text!='')
				text += '\n';
			text += this.importedData[cell.index1][cell.index2];
		}
		this.loadingComponent.start();
		this.clusterService.cluster(text)
			.subscribe(data => {
				this.dataService.setClusteredData(data.json());
				this.loadingComponent.setPercent(100);
			})
	}

	navigate() {
		this.router.navigate(['/clustered']);
	}
}
