import Logger from './logger';
import {
  renderBadRequest,
  renderForbidden,
  renderUnauthorized,
  renderNotFound,
  renderConflict,
  renderInternalServerError,
  renderBadGateway,
  renderServiceUnavailable,
} from './responses';

/**
 * Only return stack traces in local env
 */
function filterStackTrace(stack) {
  return stack;
}

/**
 * Setup default error data
 */
class DefaultError extends Error {

  constructor(message, data, ...args) {
    super(message, data, ...args);
    this.message = message;
    this.data = typeof data === 'object' ? JSON.stringify(data) : data;
    this.content = {
      name: this.name,
      message: this.message,
      data: filterStackTrace(data),
      stack: filterStackTrace(this.stack),
    };
  }

}

/**
 * 400 - Bad request
 */
export class BadRequestError extends DefaultError {

  constructor(message, data, ...args) {
    super(message, data, ...args);
    Error.captureStackTrace(this, BadRequestError);
    this.name = BadRequestError.name;
    this.content.statusCode = 400;
  }

}

/**
 * 401 - Unauthorized
 */
export class UnauthorizedError extends DefaultError {

  constructor(message, data, ...args) {
    super(message, data, ...args);
    Error.captureStackTrace(this, UnauthorizedError);
    this.name = UnauthorizedError.name;
    this.content.statusCode = 401;
  }

}

/**
 * 403 - Forbidden
 */
export class ForbiddenError extends DefaultError {

  constructor(message, data, ...args) {
    super(message, data, ...args);
    Error.captureStackTrace(this, ForbiddenError);
    this.name = ForbiddenError.name;
    this.content.statusCode = 403;
  }

}

/**
 * 404 - Not found
 */
export class NotFoundError extends DefaultError {

  constructor(message, data, ...args) {
    super(message, data, ...args);
    Error.captureStackTrace(this, NotFoundError);
    this.name = NotFoundError.name;
    this.content.statusCode = 404;
  }

}

/**
 * 409 - Conflict
 */
export class ConflictError extends DefaultError {

  constructor(message, data, ...args) {
    super(message, data, ...args);
    Error.captureStackTrace(this, ConflictError);
    this.name = ConflictError.name;
    this.content.statusCode = 409;
  }

}

/**
 * 500 - Internal Server Error
 */
export class InternalServerError extends DefaultError {

  constructor(message, data, ...args) {
    super(message, data, ...args);
    Error.captureStackTrace(this, InternalServerError);
    this.name = InternalServerError.name;
    this.content.statusCode = 500;
  }

}

/**
 * 502 - Bad Gateway
 */
export class BadGatewayError extends DefaultError {

  constructor(message, data, ...args) {
    super(message, data, ...args);
    Error.captureStackTrace(this, BadGatewayError);
    this.name = BadGatewayError.name;
    this.content.statusCode = 502;
  }

}

/**
 * 503 - Service unavailable
 */
export class ServiceError extends DefaultError {

  constructor(message, data, ...args) {
    super(message, data, ...args);
    Error.captureStackTrace(this, ServiceError);
    this.name = ServiceError.name;
    this.content.statusCode = 503;
  }

}

/**
 * Render the appropriate error
 */
export const renderBackendError = (res, err) => {
  if (res.headersSent) return;
  if (err.data) Logger.error(err.data);
  if (err.stack) {
    Logger.error(err.stack);
  }
  else {
    Logger.error(err);
  }
  switch (err.name) {
    case 'NotFoundError':
      return renderNotFound(res, err.content);
    case 'BadRequestError':
      return renderBadRequest(res, err.content);
    case 'ForbiddenError':
      return renderForbidden(res, err.content);
    case 'UnauthorizedError':
      return renderUnauthorized(res, err.content);
    case 'ConflictError':
      return renderConflict(res, err.content);
    case 'BadGatewayError':
      return renderBadGateway(res, err.content);
    case 'ServiceError':
      return renderServiceUnavailable(res, err.content);
    case 'InternalServerError':
      return renderInternalServerError(res, err.content);

    default:
      return renderInternalServerError(res, err);
  }


};