import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
	private clusteredData: Array<Object> = [];

	private importedExcelData: Array<any> = [];

	private sheetNames: Array<string> = [];

	private inputText: string = '';

	constructor() { }

	public setClusteredData(clusteredData: Array<Object>): void {
		this.clusteredData = clusteredData;
	}

	public getClusteredData(): Array<Object> {
		return this.clusteredData;
	}

	public resetExcelData(): void {
		this.importedExcelData = [];
	}

	public setImportedExcelData(index: number, sheetName: string, excelData: any): void {
		this.importedExcelData[index] = excelData;
		this.sheetNames[index] = sheetName;
	}

	public getImportedExcelData(): any {
		return this.importedExcelData;
	}

	public getSheetNames(): Array<string> {
		return this.sheetNames;
	}

	public getInputText(): string {
		return this.inputText;
	}

	public setInputText(text: string): void {
		this.inputText = text;
	}
}
