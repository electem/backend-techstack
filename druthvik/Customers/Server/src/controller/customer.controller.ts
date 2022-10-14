import {
  createCustomer,
  ICustomerPaylod,
} from '../repositories/customer.repository';
import { Route, Tags, Post, Body } from 'tsoa';
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
}
