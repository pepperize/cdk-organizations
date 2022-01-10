import { Construct } from "constructs";

export interface OrganizationalUnitProps {
  /**
   * The friendly name to assign to the new OU.
   */
  organizationalUnitName: string;

  /**
   * The unique identifier (ID) of the parent root or OU that you want to create the new OU in.
   */
  parentId: string;

  /**
   * A list of tags that you want to attach to the newly created organizational unit. For each tag in the list, you must specify both a tag key and a value. You can set the value to an empty string, but you can't set it to null.
   */
  tags: { [key: string]: string };
}

/**
 * A container for accounts within a root. An OU also can contain other OUs, enabling you to create a hierarchy that resembles an upside-down tree, with a root at the top and branches of OUs that reach down, ending in accounts that are the leaves of the tree. When you attach a policy to one of the nodes in the hierarchy, it flows down and affects all the branches (OUs) and leaves (accounts) beneath it. An OU can have exactly one parent, and currently each account can be a member of exactly one OU.
 */
export class OrganizationalUnitProps extends Construct {
  public constructor(scope: Construct, id: string, props: OrganizationalUnitProps) {
    super(scope, id);

    props;
  }
}
