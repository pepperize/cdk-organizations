import { IDependable } from "constructs";

export interface IParent extends IDependable {
  /**
   * The unique identifier (ID) of the parent root or OU that you want to create the new OU in.
   */
  identifier(): string;
}
