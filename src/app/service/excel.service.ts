import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { DataService } from './data.service';

type AOA = any[][]

@Injectable()
export class ExcelService {

	constructor(private dataService: DataService) { }

	importExcelFile(evt: any) {
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) throw new Error('Cannot use multiple files');
		const reader: FileReader = new FileReader();

		reader.onload = (e: any) => {
			const bstr: string = e.target.result;
			const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

			for (let i = 0; i < wb.SheetNames.length; ++i) {
				const wsname: string = wb.SheetNames[i];
				const ws: XLSX.WorkSheet = wb.Sheets[wsname];

				this.dataService.setImportedExcelData(i, wsname, <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 })))
			}
		};

		reader.readAsBinaryString(target.files[0]);
	}
}