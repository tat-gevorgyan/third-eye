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

	sheetNames: Array<string> = [];

	chechkedSheetIndex: number = 0;

	maxHeaderSize: number = 0;

	private selectedCells = [];

	private selectedColumns = [];

	constructor(private dataService: DataService,
		private clusterService: ClusterService,
		private router: Router) { }

	ngOnInit() {
		this.importedData = this.dataService.getImportedExcelData();
		this.sheetNames = this.dataService.getSheetNames();

		if (!this.importedData.length)
			this.router.navigate(['/home'])
		else this.getHeaderSize();

		console.log(this.importedData)
	}

	setSelection(sheetIndex: number, index1: number, index2: number) {
		let result = this.isSelected(index1, index2)
		result == null
			? this.selectedCells.push({
				sheetIndex: sheetIndex,
				index1: index1,
				index2: index2
			})
			: this.selectedCells.splice(result, 1)
	}

	setColumnSelection(columnIndex: number) {
		let result = this.isColumnSelected(columnIndex);

		if (result < 0) {
			for (let i = 0; i < this.importedData[this.chechkedSheetIndex].length; ++i) {
				let result = this.isSelected(i, columnIndex);
				result == null && this.selectedCells.push({
					sheetIndex: this.chechkedSheetIndex,
					index1: i,
					index2: columnIndex
				})
			}
			this.selectedColumns.push({
				sheetIndex: this.chechkedSheetIndex,
				columnIndex: columnIndex
			});
		}
		else {
			for (let i = 0; i < this.importedData[this.chechkedSheetIndex].length; ++i) {
				this.isSelected(i, columnIndex) != null
					&& this.setSelection(this.chechkedSheetIndex, i, columnIndex);
			}
			this.selectedColumns.splice(result, 1)
		}
	}

	isSelected(index1: number, index2: number): any {
		for (let i = 0; i < this.selectedCells.length; ++i)
			if (this.selectedCells[i].sheetIndex == this.chechkedSheetIndex
				&& this.selectedCells[i].index1 == index1
				&& this.selectedCells[i].index2 == index2)
				return i;
		return null;
	}

	isColumnSelected(columnIndex: number): any {
		return this.selectedColumns.findIndex(item =>
			item.sheetIndex == this.chechkedSheetIndex
			&& item.columnIndex == columnIndex);
	}

	updateExcelView(sheetIndex: number) {
		this.chechkedSheetIndex = sheetIndex;
		this.getHeaderSize();
	}

	getHeaderSize() {
		this.maxHeaderSize = 0;
		for (let item of this.importedData[this.chechkedSheetIndex])
			if (item.length > this.maxHeaderSize)
				this.maxHeaderSize = item.length;
	}

	getEmptyCellCountArray(item: any): Array<any> {
		if (!item || this.maxHeaderSize - item.length < 0)
			return [];
		return new Array(this.maxHeaderSize - item.length);
	}

	getEmptyArrayWithLength(length: number): Array<any> {
		if (length < 0)
			return [];
		return new Array(length)
	}

	start() {
		let text = '';
		for (let cell of this.selectedCells) {
			if (text != '')
				text += '\n';
			text += this.importedData[cell.sheetIndex][cell.index1][cell.index2];
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

	toExcelHeader = function(index) {
		if (index <= 0) {
			throw new Error("index must be 1 or greater");
		}
		index--;
		var charCodeOfA = ("a").charCodeAt(0);
		var charCodeOfZ = ("z").charCodeAt(0);
		var excelStr = "";
		var base24Str = (index).toString(charCodeOfZ - charCodeOfA + 1);
		for (var base24StrIndex = 0; base24StrIndex < base24Str.length; base24StrIndex++) {
			var base24Char = base24Str[base24StrIndex];
			var alphabetIndex = (base24Char * 1 == base24Char) ? base24Char : (base24Char.charCodeAt(0) - charCodeOfA + 10);
			// bizarre thing, A==1 in first digit, A==0 in other digits
			if (base24StrIndex == 0) {
				alphabetIndex -= 1;
			}
			excelStr += String.fromCharCode(charCodeOfA * 1 + alphabetIndex * 1);
		}
		return excelStr.toUpperCase();
	}

	isCurrentSheet(sheetIndex: number): boolean {
		return sheetIndex == this.chechkedSheetIndex;
	}
}
