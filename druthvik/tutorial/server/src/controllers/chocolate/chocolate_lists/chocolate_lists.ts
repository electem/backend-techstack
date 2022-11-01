import { Chocolates } from '../model/chocolate';

export class ArrangingChocolate {
  chocolateList: Chocolates[] = [];

  constructor(chocolateList: Chocolates[]) {
    this.chocolateList = chocolateList;
  }

  //getting qunatities of chooclate by dividing the amount of chocolate by alloted rupees
  getMaxQuantityChocolate(Rupees: number) {
    let chocolateAmount = 0;
    for (const chocolate of this.chocolateList) {
      chocolateAmount = chocolate.amount;
      chocolate.quantity = Rupees / chocolateAmount;
    }
  }
  //sorting chocolates by higher amount of quantity to lower amount of quantity
  sortChocolateByQuantity() {
    return this.chocolateList.sort(this.sortChocolate);
  }
  //sort method for quantity
  //bubblesort
  sortChocolate(a: Chocolates, b: Chocolates) {
    if (a.quantity < b.quantity) {
      return 1;
    }
    if (a.quantity > b.quantity) {
      return -1;
    }
    return 0;
  }
}
export default ArrangingChocolate;
