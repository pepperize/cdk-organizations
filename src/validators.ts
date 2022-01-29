export class Validators {
  public static of(): Validators {
    return new Validators();
  }
  public accountId(id: string): boolean {
    return /\d{12}/.test(id);
  }
  public accountName(name: string): boolean {
    return /[\s\S]{1,50}/.test(name);
  }
  public email(email: string): boolean {
    return /([^\s@]+@[^\s@]+\.[^\s@]+){6,64}/.test(email);
  }
  public organizationalUnitName(name: string): boolean {
    return /[\s\S]{1,128}/.test(name);
  }
  public servicePrincipal(servicePrincipal: string): boolean {
    return /[\w+=,.@-]{1,128}/.test(servicePrincipal);
  }
  public policyContent(content: string): boolean {
    return /[\s\S]{1,1000000}/.test(content);
  }
}
