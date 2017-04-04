class Response {
  ok() {
    this.status = 200;
    return this;
  }

  created() {
    this.status = 201;
    return this;
  }

  notFound() {
    this.status = 404;
    return this;
  }

  serverError() {
    this.status = 500;
    return this;
  }

  withHeader(fields) {
    this.header = fields;
    return this;
  }

  withBody(data) {
    this.body = data;
    return this;
  }
}

export default Response;
