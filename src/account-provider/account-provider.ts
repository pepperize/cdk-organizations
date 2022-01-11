import { Function } from "@aws-cdk/aws-lambda";
import { Construct, Duration } from "@aws-cdk/core";
import { Provider } from "@aws-cdk/custom-resources";
import { IsCompleteHandlerFunction } from "./is-complete-handler-function";
import { OnEventHandlerFunction } from "./on-event-handler-function";

export interface AccountProviderProps {}

export class AccountProvider extends Construct {
  public readonly onEventHandler: Function;
  public readonly isCompleteHandler: Function;
  public readonly provider: Provider;

  public constructor(scope: Construct, id: string, props: AccountProviderProps) {
    super(scope, id);

    props;

    this.onEventHandler = new OnEventHandlerFunction(this, "OnEventHandlerFunction", {});

    this.isCompleteHandler = new IsCompleteHandlerFunction(this, "IsCompleteHandlerFunction", {});

    this.provider = new Provider(this, "Provider", {
      onEventHandler: this.onEventHandler,
      isCompleteHandler: this.isCompleteHandler,
      queryInterval: Duration.seconds(5),
    });
  }
}
