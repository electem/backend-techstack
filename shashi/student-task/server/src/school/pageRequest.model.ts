/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */

export class PageRequest {
  public page: number;
  public size: number;
  public seachedString: string;
  constructor(page: number = 1, size: number = 10, seachedString: string = '') {
    this.page = page;
    this.size = size;
    this.seachedString = seachedString;
  }
  public next(totalElements: number): PageRequest {
    const totalPages: number = Math.ceil(totalElements / this.size) || 1;
    const nextPage: number = +this.page === totalPages ? 1 : +this.page + 1;
    return new PageRequest(nextPage, this.size);
  }
  public previous(totalElements: number): PageRequest {
    const totalPages: number = Math.ceil(totalElements / this.size || 1);
    const previousPage: number = +this.page === 1 ? totalPages : +this.page - 1;
    return new PageRequest(previousPage, this.size);
  }
  public static from(page: number, size: number, seachedString: string): PageRequest {
    return new PageRequest(page, size, seachedString);
  }
}
