import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

import { environment } from '../../environments/environment';
const API_END_POINT = environment.APIEndpoint;

@Injectable()
export class ClusterService {
	private API_URL: string = `${API_END_POINT}/api/cluster`;

	constructor(private http: Http) { }

	public cluster(text: string): Observable<any> {
		return this.http.post(this.API_URL, {txt: text});
	}
}
