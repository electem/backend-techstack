import {
  createCustomer,
  getCustomers,
  ICustomerPaylod,
} from '../repositories/customer.repository';
import { Route, Tags, Post, Body, Get } from 'tsoa';
import { customerModel } from '../models/customer.model';

@Route('createCustomer')
@Tags('CreateCustomer')
export default class customerController {
  @Post('/')
  public async createCustomer(
    @Body() body: ICustomerPaylod,
  ): Promise<customerModel> {
    return createCustomer(body);
  }

  @Get('/')
  public async getCustomers(): Promise<Array<customerModel>> {
    return getCustomers();
  }
}
