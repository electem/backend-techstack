/* eslint-disable @typescript-eslint/no-inferrable-types */
export class PageRequest {
  public page: number;
  public size: number;

  constructor(page: number = 1, size: number = 10) {
    this.page = page;
    this.size = size;
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

  public static from(page: number, size: number): PageRequest {
    return new PageRequest(page, size);
  }
}
