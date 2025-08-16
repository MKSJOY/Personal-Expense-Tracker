export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
    if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
  }
}
export const httpBadRequest = (m='Bad Request') => new HttpError(400, m);
export const httpUnauthorized = (m='Unauthorized') => new HttpError(401, m);
export const httpForbidden = (m='Forbidden') => new HttpError(403, m);
export const httpNotFound  = (m='Not Found')    => new HttpError(404, m);
