//Custom classes for diffferent tyes pf errors

class NotFoundError extends Error {
  constructor(message = "Resource Not Found") {
    super(message);
    this.name = "NotFoundError";
    this.status = 404;
  }
}

class ValidationError extends Error {
  constructor(message = "Validation Failed") {
    super(message);
    this.name = "ValidationError";
    this.status = 400;
  }
}

module.exports = {
  NotFoundError,
  ValidationError,
};
