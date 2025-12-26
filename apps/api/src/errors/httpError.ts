class HttpError<T = unknown> extends Error {
  code: number;
  ok = false;
  error: T | undefined;

  constructor(code: number, message: string, error?: T) {
    super(message);
    this.code = code;
    this.error = error
  }
}

export default HttpError;
