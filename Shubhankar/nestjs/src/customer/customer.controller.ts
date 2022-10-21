/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Req} from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { Customer } from "./customer.entity";
import { CustomerService } from "./customer.service";
import { CustomerDto } from "./dto/customer.dto";

@Controller('customer')
export class CustomerController {
    constructor(private readonly cutomerService: CustomerService) {}
    
    @ApiCreatedResponse({type :Customer})
    @Post()
    async createCustomer(
        @Body() createCustomerDto: CustomerDto,
        @Req() request,
      ): Promise<Customer> {
        return this.cutomerService.createCustomer(request.id, createCustomerDto);
      }
      
      @Get()
      @ApiOkResponse({ type: [Customer] })
      findAll(): Promise<Customer[]> {
          return this.cutomerService.findAll();
      }

      @Get('/:id')
     async findCustomer(@Param('id') id):  Promise<Customer>{
        return this.cutomerService.findCustomerbyid(id);
     }

     @Put('/:id')
     async update(@Param('id')id, @Body() customers:CustomerDto): Promise<Customer>{
        await this.cutomerService.findCustomerbyid(id);
        return await this.cutomerService.updateCustomer(id,customers);
     }

     @Delete('/:id')
     async deletecustomer(@Param('id')id):Promise<string>{
        this.cutomerService.deleteCustomer(id);
        return 'customer deleted'
     }
 }
