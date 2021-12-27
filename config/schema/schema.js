var convict = require("convict");

module.exports = convict({
  environment: {
    doc: "Specifies the running environment of vt-integration-api",
    format: String,
    env: "NODE_ENV",
    default: "development",
  },
  Port: {
    doc: "Port to use for the server.",
    format: Number,
    default: 8080,
  },
  vt: {
    baseUrl: {
      doc: "Visual Touch base url.",
      format: String,
      default: "https://vtstore.vtonlineorder.com",
    },
    username: {
      doc: "Visual Touch username to get an Authentication Token",
      format: String,
      default: "SNaxmJkF-jjLKCamy-trGGCZbi-xPaCNoKc-G3rj",
    },
    password: {
      doc: "Visual Touch password to get an Authentication Token",
      format: String,
      default: "0TdifsvXSwgZvvg4OXyCBhJrI43KemPJ",
    },
    jwtSecret: {
      doc: "JWT secret to authenticate a call to Visual Touch Serve Endpoint",
      format: String,
      env: "JWT_SECRET",
      default: "qwerty",
    },
  },
  app: {
    name: {
      doc: "Tha name of the integration app",
      format: String,
      default: "Visual Touch Integration App",
    },
  },
});
