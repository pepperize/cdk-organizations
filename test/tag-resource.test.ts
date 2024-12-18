import { Stack, TagManager, Tags, TagType } from "aws-cdk-lib";
import { TagResource } from "../src";
import "jest-cdk-snapshot";

describe("TagResource", () => {
  it("Should match snapshot", () => {
    // Given
    const stack = new Stack(undefined, undefined, { env: { account: "123456789012", region: "us-east-1" } });
    const tags = new TagManager(TagType.KEY_VALUE, "Custom::Organizations_TagResource");

    // When
    Tags.of(stack).add("foo", "bar");
    new TagResource(stack, "Tag", {
      resourceId: "t-1234",
      tags: tags.renderedTags,
    });

    // Then

    expect(stack).toMatchCdkSnapshot({
      ignoreAssets: true,
      ignoreCurrentVersion: true,
      ignoreMetadata: true,
      ignoreTags: true,
    });
  });
});
