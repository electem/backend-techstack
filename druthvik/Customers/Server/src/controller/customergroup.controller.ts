import {
  createCustomerGroup,
  deleteCustomerGroup,
  getCustomerGroup,
  getCustomerGroupById,
  ICustomerGroupPayload,
  updateCustomerGroup,
} from '../repositories/customergroup.repository';
import { Body, Delete, Get, Path, Post, Put, Route, Tags } from 'tsoa';
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
  @Get('/:id')
  public async getCustomerGroupById(
    @Path() id: string,
  ): Promise<customerGroup | null> {
    return getCustomerGroupById(Number(id));
  }

  @Put('/')
  public async updateCustomerGroup(
    @Body() body: ICustomerGroupPayload,
  ): Promise<ICustomerGroupPayload> {
    return updateCustomerGroup(body);
  }

  @Delete('/:id')
  public async deleteCustomerGroupById(
    @Path() id: string,
  ): Promise<customerGroup | string> {
    return deleteCustomerGroup(Number(id));
  }
}
