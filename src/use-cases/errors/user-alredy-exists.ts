export class UserAlredyExistsError extends Error {
  constructor() {
    super('E-mail alredy exists.')
  }
}
