import { Test } from './test.model';

export interface Panel {
  id?: number;
  name?: string;
  description?: string;
  tests?: Test[];
}
