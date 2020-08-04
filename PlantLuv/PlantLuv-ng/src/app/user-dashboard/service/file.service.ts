import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { memorize } from '../../shared/utilities/observable-utils'
import { FileMetadata } from '../models/file.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { clientGuidPrefix } from '../../shared/utilities/type-utils';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.server + environment.apiUrl + 'file';
  }

  public getFileMetadata(fileId: string): Observable<FileMetadata> {
    if (fileId.startsWith(clientGuidPrefix)) {
      return of({fileId, size: 0, extension: '', contentType: ''});
    }
    return this.http
      .get<FileMetadata>(this.baseUrl + '/' + fileId + '/metadata')
      .pipe(memorize());
  }

  public thumbnailUrl(fileId: string, fileUse: string): string {
    if (!fileId || fileId.startsWith(clientGuidPrefix)) {
      return '/assets/placeholder-' + fileUse + '.jpg';
    }
    return '/api/file/' + fileId + '/thumbnail';
  }

  public mediumUrl(fileId: string, fileUse: string): string {
    if (!fileId || fileId.startsWith(clientGuidPrefix)) {
      return '/assets/placeholder-' + fileUse + '.jpg';
    }
    return '/api/file/' + fileId + '/medium';
  }

  public largeUrl(fileId: string, fileUse: string): string {
    if (!fileId || fileId.startsWith(clientGuidPrefix)) {
      return '/assets/placeholder-' + fileUse + '.jpg';
    }
    return '/api/file/' + fileId + '/large';
  }

  upload(file: FormData): Observable<FileMetadata> {
    return this.http.post<FileMetadata[]>('api/file/upload', file)
      .pipe(
        map(list => list[0]),
        memorize()
      );
  }

  deleteByOwner(fileId: string): Observable<{}> {

    var fakeId = '1685FA9C-988C-4D48-95B4-7EDECC647F1C'
    this.http.delete(this.baseUrl + '/' + fakeId).subscribe((result) =>
    // this.http.delete(this.baseUrl + '/' + fileId).subscribe((result) =>
    {
      console.log("from success ", typeof(result), result);
      return of(result);
    },
    (err) => {
      console.log("from failure ", typeof(err), err);
      return of(err);
    });
    return;
  }
}
