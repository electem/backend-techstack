import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { JsonObject, JsonProperty } from "typescript-json-serializer";
  
     @JsonObject()
    export class EmployeeDetils {
     @JsonProperty()
    id?:number;

     @JsonProperty()
     name?: string;
    
    @JsonProperty()
    address?: string;
   

    @JsonProperty()
    gender?:string;
   
    @JsonProperty()
    salary?: number;
    }