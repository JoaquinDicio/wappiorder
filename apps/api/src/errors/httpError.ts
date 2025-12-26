class HttpError extends Error {
  code = 500;
  ok = false;

  constructor(code: number, ok: boolean, message: string) {
    super(message);
    this.code = code;
    this.ok = ok;
  }
}

export default HttpError;
