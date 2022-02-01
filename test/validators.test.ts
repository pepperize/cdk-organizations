import { Validators } from "../src";

describe("validators", () => {
  it("Should be valid email", () => {
    // Given
    const email = "info+valid@pepperize.com";

    // When
    const result = Validators.of().email(email);

    // Then
    expect(result).toBeTruthy();
  });
});
