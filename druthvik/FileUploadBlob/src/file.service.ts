/* eslint-disable prettier/prettier */
export declare class FileSaverService {
  readonly isFileSaverSupported: boolean;
  genType(fileName?: string): string;
  save(blob: Blob, fileName?: string, filtType?: string): void;
  saveText(txt: string, fileName?: string): void;
}
