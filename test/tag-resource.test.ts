import { Template } from "@aws-cdk/assertions";
import { App, Aspects, Construct, Stack, TagManager, Tags, TagType } from "@aws-cdk/core";
import { AwsSolutionsChecks } from "cdk-nag";
import { ITaggableResource, TagResource } from "../src";

describe("TagResource", () => {
  it("Should match snapshot", () => {
    // Given
    const app = new App();
    const stack = new Stack(app, "Stack");
    const resource = new (class extends Construct implements ITaggableResource {
      readonly tags: TagManager = new TagManager(TagType.KEY_VALUE, "Custom::Organization_TagResource");

      identifier(): string {
        return "t-1234";
      }
    })(stack, "Resource");

    // When
    Tags.of(resource).add("foo", "bar");
    new TagResource(stack, "TagResource", {
      resource: resource,
    });

    // Then
    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();
  });

  it("Should comply to best practices", () => {
    // Given
    const app = new App();
    const stack = new Stack(app, "Stack");
    const resource = new (class extends Construct implements ITaggableResource {
      readonly tags: TagManager = new TagManager(TagType.KEY_VALUE, "Custom::Organization_TagResource");

      identifier(): string {
        return "t-1234";
      }
    })(stack, "Resource");

    // When
    Tags.of(resource).add("foo", "bar");
    new TagResource(stack, "TagResource", {
      resource: resource,
    });

    // Then
    Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
  });
});
