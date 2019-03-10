import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

@Injectable()
export class ClusterService {
	private API_URL: string = 'http://46.101.42.31:9999/api/cluster'

	constructor(private http: Http) { }

	public cluster(text: string): Observable<any> {
		return this.http.post(this.API_URL, {txt: text});
	}
}
