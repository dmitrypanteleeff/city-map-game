import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { RecordModel } from '../models';

@Injectable({ providedIn: 'root' })
export class RecordsApiService {
  private firestore = inject(Firestore);
  private recordsCollection = collection(this.firestore, 'records');

  getRecords(): Observable<RecordModel[]> {
    return collectionData(this.recordsCollection, {
      idField: 'id',
    }) as Observable<RecordModel[]>;
  }

  addRecord(name: string, score: number): Observable<string> {
    const userRecord = { name, score };
    const promise = addDoc(this.recordsCollection, userRecord).then(
      (response) => response.id
    );
    return from(promise);
  }
}
