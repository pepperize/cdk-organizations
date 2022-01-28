/**
 * Interface for an AWS Organizations resource.
 */
export interface IResource {
  /**
   * The unique identifier (ID) of the parent root, organizational unit (OU), account, or policy that you want to create the new OU in.
   */
  identifier(): string;
}
