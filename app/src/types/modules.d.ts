// Type declarations for JavaScript modules

declare module '../state/db' {
  export function openDB(): Promise<any>;
  export function dbGet(storeName: string, key: string): Promise<any>;
  export function dbPut(storeName: string, data: any): Promise<any>;
  export function dbDelete(storeName: string, key: string): Promise<any>;
  export function dbGetAll(storeName: string): Promise<any[]>;
  export function dbClear(storeName: string): Promise<any>;
  export function dbQuery(storeName: string, indexName: string, keyRange?: any): Promise<any[]>;
  export function dbBatch(storeName: string, operations: any[]): Promise<any>;
}

declare module '../services/calendarSync' {
  export function testAndListCalendars(username: string, password: string, pin?: string | null): Promise<any>;
  export function saveSelectedCalendars(calendarIds: string[]): Promise<any>;
  export function getSyncStatus(): Promise<any>;
  export function manualSync(): Promise<any>;
  export function initializeSync(pin?: string | null): Promise<any>;
  export function startPeriodicSync(): void;
  export function stopPeriodicSync(): void;
  export function cleanup(): void;
}

declare module '../services/photoIndexer' {
  export function chooseFolder(): Promise<any>;
  export function indexPhotos(): Promise<any>;
  export function getLatestStats(): Promise<any>;
  export function getSlideshowSequence(options?: { shuffle?: boolean }): Promise<any[]>;
  export function initializePhotoIndexer(): Promise<any>;
  export function startPeriodicIndexing(): void;
  export function stopPeriodicIndexing(): void;
  export function cleanup(): void;
}

declare module '../utils/crypto' {
  export function encrypt(data: any, pin: string): Promise<string>;
  export function decrypt(encryptedData: string, pin: string): Promise<any>;
  export function testPin(pin: string, testData: string): Promise<boolean>;
  export function createPinTest(pin: string): Promise<string>;
}

declare module '../services/caldavClient' {
  export function connect(params: { url: string; username: string; password: string }): Promise<any>;
  export function listCalendars(): Promise<any[]>;
  export function getEvents(params: { calendarIds: string[]; from: Date; to: Date }): Promise<any[]>;
  export function testConnection(params: { url: string; username: string; password: string }): Promise<any>;
  export function disconnect(): void;
}

