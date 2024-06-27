import { initializeApp } from 'firebase/app';
import config from './config.js';
import {
    getFirestore,
    collection,
    addDoc,
  } from 'firebase/firestore';

export class StorageService {

    firebase = null;
    db = null;

    constructor(){
        this.firebase = initializeApp(config.firebaseConfig);
        this.db = getFirestore(this.firebase);
    }

    async insertLogEntry(logEntry){
        await addDoc(collection(this.db,"crawlerLog"), logEntry);
    }
}