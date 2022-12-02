import { Test } from "./test.type";

export interface Panel {
    id?: number;
    name?: string;
    description?: string;
    tests?: Test[];
  }