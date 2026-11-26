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
  // CDK invokes aspects again when an app is synthesized again, for example by `app.synth({ force: true })`.
  // Chaining a construct twice would make it depend on the last construct of the previous pass and form a cycle.
  private readonly chained = new WeakSet<IConstruct>();

  visit(current: IConstruct): void {
    if (!this.needsChaining(current) || this.chained.has(current)) {
      return;
    }
    this.chained.add(current);

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
