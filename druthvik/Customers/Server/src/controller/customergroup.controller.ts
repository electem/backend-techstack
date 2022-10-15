import { getCustomerGroup } from '../repositories/customergroup.repository';
import { Get, Route, Tags } from 'tsoa';
import { customerGroup } from '../models';

@Route('customergroup')
@Tags('CustomerGroup')
export default class CustomerGroupController {
  @Get('/')
  public async getCustomerGroup(): Promise<Array<customerGroup>> {
    return getCustomerGroup();
  }
}
