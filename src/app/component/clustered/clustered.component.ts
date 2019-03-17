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

	private inputText: string = '';

	constructor(private dataService: DataService,
		private router: Router) { }

	ngOnInit() {
		this.clusteredData = this.dataService.getClusteredData();
		if (!this.clusteredData.length)
			this.router.navigate(['/home']);
		else {
			this.getHeaderSize();
			this.inputText = this.dataService.getInputText();
		};
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
		let clusteredStringWords: Array<string> = [];

		theme.split(' ').forEach(word => {
			let matched = false;
			for (let keyword of keywords) {
				if (word.toLocaleLowerCase().includes(keyword)) {
					clusteredStringWords.push(this.getWordFromOnlyLetters(word));
					matched = true;
					break;
				}
			}
			!matched && clusteredStringWords.push(word);
		})

		return clusteredStringWords.join(' ');
	}

	private getWordFromOnlyLetters(word: string): string {
		let startIndex = 0, endIndex = word.length - 1;
		let result = '';
		if (word.substr(startIndex, 1).includes('"')
			|| word.substr(startIndex, 1).includes('.')
			|| word.substr(startIndex, 1).includes(','))
			++startIndex;
		if (word.substr(endIndex, 1).includes('"')
			|| word.substr(endIndex, 1).includes('.')
			|| word.substr(endIndex, 1).includes(','))
			--endIndex;
		return [word.slice(0, startIndex),
			'<b>', word.slice(startIndex, endIndex + 1),
			'</b>', word.slice(endIndex + 1)].join('');
	}

	sortKeywords(keywords: string): string {
		return keywords.split(', ').sort((a: string, b: string) => {
			return this.inputText.toLocaleLowerCase().indexOf(a)
				- this.inputText.toLocaleLowerCase().indexOf(b)
		}).join(', ')
	}
}
