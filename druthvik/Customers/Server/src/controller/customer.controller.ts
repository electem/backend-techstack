import {
  createCustomer,
  getCustomerById,
  getCustomers,
  ICustomerPaylod,
  updateCustomer,
} from '../repositories/customer.repository';
import { Route, Tags, Post, Body, Get, Path, Put } from 'tsoa';
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
  @Get('/:id')
  public async getCustomerById(
    @Path() id: string,
  ): Promise<customerModel | null> {
    return getCustomerById(Number(id));
  }

  @Put('/')
  public async updateCustomer(
    @Body() body: ICustomerPaylod,
  ): Promise<ICustomerPaylod> {
    return updateCustomer(body);
  }
}
