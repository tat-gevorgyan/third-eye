import { Injectable } from '@angular/core';
// import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { DataService } from './data.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

type AOA = any[][]

@Injectable()
export class ExcelService {

	constructor(private dataService: DataService) { }

	/*public importExcelFile(file: File): void {
		let arrayBuffer: any;
		let fileReader = new FileReader();
		let resultArray: any[];
		fileReader.onload = (e) => {
			arrayBuffer = fileReader.result;
			var data = new Uint8Array(arrayBuffer);
			var arr = new Array();
			for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
			var bstr = arr.join("");
			var workbook = XLSX.read(bstr, { type: "binary" });
			var first_sheet_name = workbook.SheetNames[0];
			var worksheet = workbook.Sheets[first_sheet_name];
			resultArray = XLSX.utils.sheet_to_json(worksheet, { raw: false });
			this.dataService.setImportedExcelData(resultArray);
		}
		fileReader.readAsArrayBuffer(file);
	}*/

	importExcelFile(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.dataService.setImportedExcelData(<AOA>(XLSX.utils.sheet_to_json(ws, {header: 1})))
      // this.data = ;
    };
    reader.readAsBinaryString(target.files[0]);
  }

	/*public exportAsExcelFile(json: any[], excelFileName: string): void {

		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
		console.log('worksheet', worksheet);
		const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
		const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		// const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
		this.saveAsExcelFile(excelBuffer, excelFileName);
	}

	private saveAsExcelFile(buffer: any, fileName: string): void {
		const data: Blob = new Blob([buffer], {
			type: EXCEL_TYPE
		});
		FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
	}*/

}