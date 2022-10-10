import { JsonObject, JsonProperty } from "typescript-json-serializer";

   @JsonObject()
    export class EmployeeDetils {

    @JsonProperty()
    name?: string;

   @JsonProperty()
    address?: string;

    @JsonProperty()
    gender?:string;
    
    @JsonProperty()
    salary?: number;
}