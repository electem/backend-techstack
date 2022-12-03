/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */

export class PageRequest {
  public page: number;
  public size: number;
  public search: string;
  constructor(page: number = 1, size: number = 10, search: string ='') {
    this.page = page;
    this.size = size;
    this.search = search;
    
  }
  public next(totalElements: number): PageRequest {
    const totalPages: number = Math.ceil(totalElements / this.size) || 1;
    const nextPage: number = +this.page === totalPages ? 1 : +this.page + 1;
    return new PageRequest(nextPage, this.size, this.search);
  }
  public previous(totalElements: number): PageRequest {
    const totalPages: number = Math.ceil(totalElements / this.size || 1);
    const previousPage: number = +this.page === 1 ? totalPages : +this.page - 1;
    return new PageRequest(previousPage, this.size, this.search);
  }
  public static from(page: number, size: number, search:string): PageRequest {
    return new PageRequest(page, size, search);
  }
}
