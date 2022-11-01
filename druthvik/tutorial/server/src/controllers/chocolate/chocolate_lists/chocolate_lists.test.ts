import { ArrangingChocolate } from './chocolate_lists';
import { Chocolates } from '../model/chocolate';

const chocolate: Chocolates[] = [
  { name: 'dairymilk', amount: 10, quantity: 10 },
  { name: '5-star', amount: 5, quantity: 20 },
  { name: 'melody', amount: 1, quantity: 100 },
  { name: 'bournville', amount: 50, quantity: 2 },
];
describe('calculate qunatity of all chocolates ', () => {
  test('chocolate with differnt quantity', async () => {
    chocolate.push({ name: 'mentos', amount: 2, quantity: 50 });
    const getChocolate = new ArrangingChocolate(chocolate);
    const chocolateAmt = getChocolate.getMaxQuantityChocolate(100);
    expect(chocolate[0].quantity).toBe(10);
    expect(chocolate[1].quantity).toBe(20);
    expect(chocolate[2].quantity).toBe(100);
    expect(chocolate[3].quantity).toBe(2);
    expect(chocolate[4].quantity).toBe(50);
  });
});
describe('sort chocolates according to quantity', () => {
  test('sorting chocolates', async () => {
    const getChocolate = new ArrangingChocolate(chocolate);
    const chocolateSort = getChocolate.sortChocolateByQuantity();
    expect(chocolate[0].name).toBe('melody');
    expect(chocolate[1].name).toBe('mentos');
    expect(chocolate[2].name).toBe('5-star');
    expect(chocolate[3].name).toBe('dairymilk');
    expect(chocolate[4].name).toBe('bournville');
  });
});
