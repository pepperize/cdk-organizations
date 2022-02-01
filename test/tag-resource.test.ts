import { App, Stack, TagManager, Tags, TagType } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { TagResource } from "../src";

describe("TagResource", () => {
  it("Should match snapshot", () => {
    // Given
    const app = new App();
    const stack = new Stack(app, "Stack");
    const tags = new TagManager(TagType.KEY_VALUE, "Custom::Organizations_TagResource");

    // When
    Tags.of(stack).add("foo", "bar");
    new TagResource(stack, "Tag", {
      resourceId: "t-1234",
      tags: tags.renderedTags,
    });

    // Then
    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();
  });
});
