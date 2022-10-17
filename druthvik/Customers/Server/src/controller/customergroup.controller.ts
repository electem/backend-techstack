import {
  createCustomerGroup,
  getCustomerGroup,
  ICustomerGroupPayload,
} from '../repositories/customergroup.repository';
import { Body, Get, Post, Route, Tags } from 'tsoa';
import { customerGroup } from '../models';

@Route('customergroup')
@Tags('CustomerGroup')
export default class CustomerGroupController {
  @Get('/')
  public async getCustomerGroup(): Promise<Array<customerGroup>> {
    return getCustomerGroup();
  }
  @Post('/')
  public async createCustomerGroup(
    @Body() body: ICustomerGroupPayload,
  ): Promise<customerGroup> {
    return createCustomerGroup(body);
  }
}
