import { Body, Get, Post, Route, Tags } from 'tsoa';
import { Chocolates } from '../model/chocolate';
import ArrangingChocolate from './chocolate_lists';

const chocolate: Chocolates[] = [
  { name: 'dairymilk', amount: 10, quantity: 10 },
  { name: '5-star', amount: 5, quantity: 20 },
  { name: 'melody', amount: 1, quantity: 100 },
  { name: 'bournville', amount: 50, quantity: 2 },
];

@Route('chocolates')
@Tags('Chocolates')
export default class ChocolateController {
  @Get('/')
  public async getChocolates(): Promise<Array<Chocolates>> {
    return chocolate;
  }
  @Post('/')
  public async createChocolate(@Body() body: Chocolates): Promise<Chocolates> {
    return body;
  }
  //    @Get('/')
  //   public async getChocolatesQuantity(): Promise<Array<Chocolates>> {
  //     const getChocloate = new ArrangingChocolate(chocolate)
  //        const avg = getChocloate.sortChocolateByQuantity()
  //        return avg
  //     }
}
