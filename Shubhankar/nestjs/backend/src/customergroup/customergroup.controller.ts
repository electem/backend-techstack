/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { Customergroup } from "./customergroup.entity";
import { CustomergroupService } from "./customergroup.service";
import { CustomergroupDto } from "./dto/customergroup";

@Controller('customergroup')
export class CustomergroupController {
    constructor(private readonly cutomergroupService: CustomergroupService) {}
    
    @ApiCreatedResponse({type :Customergroup})
    @Post()
    async createCustomer(
        @Body() createCustomergroupDto: CustomergroupDto,
        @Req() request,
      ): Promise<Customergroup> {
        return this.cutomergroupService.createCustomer(request.id, createCustomergroupDto);
      }
      
      @Get()
      @ApiOkResponse({ type: [Customergroup] })
      findAll(): Promise<Customergroup[]> {
          return this.cutomergroupService.findAll();
      }

      @Get('/:id')
      async findCustomergroup(@Param('id') id):  Promise<Customergroup>{
         return this.cutomergroupService.findCustomergroupbyid(id);
      }

      @Put('/:id')
      async updateCustomergroup(@Body() @Param('id')id,customers:Customergroup){
         await this.cutomergroupService.findCustomergroupbyid(id);
         return await this.cutomergroupService.updateCustomergroup(id,customers);
      }
 
      @Delete('/:id')
      async deletecustomergroup(@Param('id')id):Promise<string>{
         this.cutomergroupService.findCustomergroupbyid(id);
         return 'customer deleted'
      }
 
}
