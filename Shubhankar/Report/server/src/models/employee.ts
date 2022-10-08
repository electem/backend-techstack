import { JsonObject, JsonProperty } from "typescript-json-serializer";

@JsonObject()
export class Employee {
  @JsonProperty()
  id!: number;

  @JsonProperty()
  name?: string;
  
  @JsonProperty()
  address?: string;
}
