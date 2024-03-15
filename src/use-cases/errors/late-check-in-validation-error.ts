export class LateCheckInValidationError extends Error {
  constructor() {
    super('The check-in can only be validated until twenty minutes of its creation.')
  }
}
