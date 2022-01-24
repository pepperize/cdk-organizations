import { App, Stack, TagManager, Tags, TagType } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { Construct } from "constructs";
import { ITaggableResource, TagResource } from "../src";

describe("TagResource", () => {
  it("Should match snapshot", () => {
    // Given
    const app = new App();
    const stack = new Stack(app, "Stack");
    const resource = new (class extends Construct implements ITaggableResource {
      readonly tags: TagManager = new TagManager(TagType.KEY_VALUE, "Custom::Organizations_TagResource");

      identifier(): string {
        return "t-1234";
      }
    })(stack, "Resource");

    // When
    Tags.of(resource).add("foo", "bar");
    new TagResource(stack, "Tag", {
      resource: resource,
    });

    // Then
    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();
  });
});
