const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const query = new URLSearchParams(event.queryStringParameters).toString();
  const scriptUrl = `${process.env.SCRIPT_URL}?${query}`;

  try {
    const response = await fetch(scriptUrl);
    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "success", response: result }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: "error", message: err.message }),
    };
  }
};
