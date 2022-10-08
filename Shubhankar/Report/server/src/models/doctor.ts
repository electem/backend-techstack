import { JsonObject, JsonProperty } from "typescript-json-serializer";

@JsonObject()
export class Doctor{

    @JsonProperty()
    id?:number;

    @JsonProperty()
    name?: string;

    @JsonProperty()
    specilization?:string;

    @JsonProperty()
    salary?:number;

    @JsonProperty('childrenIdentifiers')
    childrenIds?: Array<number>;
} 