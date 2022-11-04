import { Byte } from '@angular/compiler/src/util';

export interface File {
  fileId?: string;
  fileName?: string;
  fileType?: string;
  data?: Byte[];
}
