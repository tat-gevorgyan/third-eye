import { Component, ViewChild } from '@angular/core';
import { ClusterService } from '../../service/cluster.service';
import { DataService } from '../../service/data.service';
import { ExcelService } from '../../service/excel.service';
import { Router } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {

	@ViewChild('loading') loadingComponent: LoadingComponent;

	textAreaPlaceholderText: string = 'Paste your text here. Make sure there\'s a line break between each individual piece of text.\n\nThis is the first piece of text. And this sentence is also in the first piece of text. \nThis new line starts a second piece of text'

	inputText: string = '';

	private file: File;

	constructor(
		private clusterService: ClusterService,
		private dataService: DataService,
		private excelService: ExcelService,
		private router: Router) { }

	upload(event) {
		this.loadingComponent.start();
		this.file = event.target.files[0];
		this.excelService.importExcelFile(event);
		this.loadingComponent.setPercent(100);
	}



	start() {
		this.file = null;
		this.loadingComponent.start();
		this.clusterService.cluster(this.inputText)
			.subscribe(data => {
				this.dataService.setClusteredData(data.json());
				this.loadingComponent.setPercent(100);
			})
	}

	navigate() {
		this.file ? 
			this.router.navigate(['/import']) : 
			this.router.navigate(['/clustered']);
	}
}
