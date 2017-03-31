class Response {
  constructor(header, body) {
    this.header = header;
    if (body) {
      this.body = body;
    }
  }

  static ok(body) {
    return new Response({ status: 200 }, body);
  }

  static notFound(body) {
    return new Response({ status: 404 }, body);
  }

  static serverError(body) {
    return new Response({ status: 500 }, body);
  }

  static created(body) {
    return new Response({ status: 201 }, body);
  }
}

export default Response;
