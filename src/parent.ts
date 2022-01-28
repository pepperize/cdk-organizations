import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from "aws-cdk-lib/custom-resources";
import { Construct, IConstruct } from "constructs";
import { IResource } from "./resource";

export interface IParent extends IConstruct, IResource {}

export interface IChild extends IConstruct, IResource {}

export interface ParentProps {
  readonly child: IChild;
}

export interface ParentBaseProps {
  readonly childId: string;
}

export abstract class ParentBase extends Construct implements IParent {
  public readonly parentId: string;

  protected constructor(scope: Construct, id: string, props: ParentBaseProps) {
    super(scope, id);

    const { childId } = props;

    const parent = new AwsCustomResource(this, "ListParentsCustomResource", {
      onCreate: {
        service: "Organizations",
        action: "listParents", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#listParents-property
        region: "us-east-1",
        physicalResourceId: PhysicalResourceId.fromResponse("Parents.0.Id"),
        parameters: {
          ChildId: childId,
        },
      },
      onUpdate: {
        service: "Organizations",
        action: "listParents", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#listParents-property
        region: "us-east-1",
        physicalResourceId: PhysicalResourceId.fromResponse("Parents.0.Id"),
        parameters: {
          ChildId: childId,
        },
      },
      onDelete: {
        service: "Organizations",
        action: "listParents", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Organizations.html#listParents-property
        region: "us-east-1",
        parameters: {
          ChildId: childId,
        },
      },
      installLatestAwsSdk: false,
      policy: AwsCustomResourcePolicy.fromSdkCalls({
        resources: AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    });

    this.parentId = parent.getResponseField("Parents.0.Id");
  }

  public identifier(): string {
    return this.parentId;
  }
}

export class Parent extends ParentBase {
  public static fromChildId(scope: Construct, id: string, childId: string): IParent {
    class Import extends ParentBase {
      public constructor() {
        super(scope, id, { childId: childId });
      }
    }

    return new Import();
  }

  public constructor(scope: Construct, id: string, props: ParentProps) {
    const { child } = props;

    super(scope, id, { childId: child.identifier() });

    this.node.addDependency(child);
  }
}
