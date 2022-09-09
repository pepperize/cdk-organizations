import { IAspect, Stack } from "aws-cdk-lib";
import { IConstruct } from "constructs";
import { Account } from "./account";
import { DelegatedAdministrator } from "./delegated-administrator";
import { EnableAwsServiceAccess } from "./enable-aws-service-access";
import { EnablePolicyType } from "./enable-policy-type";
import { OrganizationalUnit } from "./organizational-unit";
import { PolicyAttachment } from "./policy-attachment";

/**
 * Aspect to create dependency chain of organization resource that needs to be deployed sequentially
 * @experimental
 */
export class DependencyChain implements IAspect {
  private previous: { [stackName: string]: IConstruct } = {};

  visit(current: IConstruct): void {
    if (!this.needsChaining(current)) {
      return;
    }

    const stackName = Stack.of(current).stackName;

    if (this.previous[stackName]) {
      current.node.addDependency(this.previous[stackName]);
    }

    this.previous[stackName] = current;
  }

  private needsChaining(current: IConstruct): boolean {
    switch (true) {
      case current instanceof EnablePolicyType:
        return true;
      case current instanceof EnableAwsServiceAccess:
        return true;
      case current instanceof DelegatedAdministrator:
        return true;
      case current instanceof Account:
        return true;
      case current instanceof OrganizationalUnit:
        return true;
      case current instanceof PolicyAttachment:
        return true;
      default:
        return false;
    }
  }
}
