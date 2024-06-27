import { initializeApp } from 'firebase/app';
import config from './config.js';
import {
    getFirestore,
    collection,
    addDoc,
  } from 'firebase/firestore';

/**
 * Storage service that interacts with Firebase Firestore.
 *
 * @export
 * @class StorageService
 * @typedef {StorageService}
 */
export class StorageService {

    firebase = null;
    db = null;

    /**
     * Creates an instance of StorageService and initializes Firebase app and Firestore database.
     *
     * @constructor
     */
    constructor(){
        this.firebase = initializeApp(config.firebaseConfig);
        this.db = getFirestore(this.firebase);
    }

    /**
     * Inserts a log entry into the Firestore "crawlerLog" collection.
     *
     * @async
     * @param {object} logEntry - The log entry to insert.
     * @returns {Promise<void>} - A promise that resolves when the log entry is successfully inserted.
     */
    async insertLogEntry(logEntry){
        await addDoc(collection(this.db,"crawlerLog"), logEntry);
    }
}