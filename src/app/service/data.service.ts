import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
	private clusteredData: Array<Object> = [];

	private importedExcelData: any = [];

	constructor() { }

	public setClusteredData(clusteredData: Array<Object>): void {
		this.clusteredData = clusteredData;
	}

	public getClusteredData(): Array<Object> {
		return this.clusteredData;
	}

	public setImportedExcelData(excelData: any): void {
		this.importedExcelData = excelData;
	}

	public getImportedExcelData(): any {
		return this.importedExcelData;
	}
}
