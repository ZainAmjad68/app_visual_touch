const { default: axios } = require("axios");
const _ = require("lodash");
const urljoin = require("url-join");

const config = require("../config");
const VTurls = require("../data/VT_urls");

exports.servePortal = async function (req, res) {
  try {
    let authUrl = urljoin(config.get("vt").baseUrl, VTurls.OAuthUrl);

    let username = config.get("vt").username;
    let password = config.get("vt").password;

    console.log("username", username);
    console.log("password", password);

    var base64encodedAuthHeader = Buffer.from(
      username + ":" + password
    ).toString("base64");

    console.log("base64encodedAuthHeader", base64encodedAuthHeader);

    let response = await axios.get(authUrl, {
      headers: {
        Authorization: "Basic " + base64encodedAuthHeader,
        acct: req.acct,
      },
    });

    req.log.info("Response From VT:", response);
    console.log("Response From VT:", response);

    if (response.data && !response.data.Error) {
      console.log("response Token:", response.data.Token);
      let portalUrl = urljoin(config.get("vt").baseUrl, VTurls.HomePageUrl);

      let urlWithQueryParams = `${portalUrl}?token=${response.data.Token}&acct=${req.acct}`;
      /*
      urlWithQueryParams = new URL(portalUrl);
      let searchParams = urlWithQueryParams.searchParams;
      searchParams.set("token", response.data.Token);
      searchParams.set("acct", req.acct);
      console.log("final URL href:", urlWithQueryParams);
      */
      res.redirect(urlWithQueryParams);
    } else {
      throw new Error({
        message: "Invalid Credentials Provided to Visual Touch",
        acct: req.acct,
      });
    }
  } catch (err) {
    req.log.info("Error: failed to serve the Visual Touch Portal to the User.");
    req.log.info({ err: err });
    res.status(err.statusCode || 500).send(err.message);
  }
};
