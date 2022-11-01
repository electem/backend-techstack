/* eslint-disable prettier/prettier */
import { Department } from './department.entity'
import { DepartmentService } from './department.service'
import { Body, Controller, Get, Post,Req} from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { DepertmentDto } from './dto/depertment.dto';





@Controller('department')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) {}
    

 @ApiCreatedResponse({type :Department})
 @Post()
 async createCompany(
     @Body() createdepertment: DepertmentDto,
     @Req() request,
   ): Promise<Department> {
     return this.departmentService.createDepartment(request.id, createdepertment);
   }

   @Get()
   @ApiOkResponse({ type: [Department] })
   getAllcompany(): Promise<Department[]> {
       return this.departmentService.getAllDepertment();
   }
}