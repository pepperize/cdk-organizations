import { IAspect, Stack } from "aws-cdk-lib";
import { IConstruct } from "constructs";
import { Account } from "./account";

export class AccountSequence implements IAspect {
  private sequences: { [stackName: string]: Account[] } = {};

  visit(current: IConstruct): void {
    if (!(current instanceof Account)) {
      return;
    }

    const stackName = Stack.of(current).stackName;
    const sequence = this.sequences[stackName];

    if (sequence) {
      const previous = sequence[sequence.length - 1];
      current.node.addDependency(previous);
      sequence.push(current);
    }

    this.sequences[stackName] = [current];
  }
}
