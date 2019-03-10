import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ClusteredComponent } from './component/clustered/clustered.component';
import { ImportExcelComponent } from './component/import-excel/import-excel.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },

	{ path: 'home', component: HomeComponent },
	{ path: 'clustered', component: ClusteredComponent },
	{ path: 'import', component: ImportExcelComponent },

	{ path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}