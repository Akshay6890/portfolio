/*exports.handler = async (event) => {
  
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const allowedOrigin = "https://akshaypendyala.netlify.app";

  const origin = event.headers.origin;

  if (origin !== allowedOrigin) {
    return {
      statusCode: 403,
      body: JSON.stringify({ status: "error", message: "Forbidden origin" })
    };
  }

  const query = new URLSearchParams(event.queryStringParameters).toString();
  const scriptUrl = `${process.env.SCRIPT_URL}?${query}`;

  console.log(scriptUrl);
  

  try {
    const response = await fetch(scriptUrl);
    const result = await response.json();

    console.log(result);

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
};*/




const allowedOrigin = "https://akshaypendyala.netlify.app";
const SCRIPT_URL = process.env.SCRIPT_URL;

exports.handler = async (event) => {
  const origin = event.headers.origin;

  console.log(origin);

  if (origin !== allowedOrigin) {
    return {
      statusCode: 403,
      body: JSON.stringify({ status: "error", message: "Not Authorized" })
    };
  }

  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Invalid Request" };
  }

  const { name, email, message } = event.queryStringParameters || {};

  // Sanitize helper
  const sanitize = (str) =>
    String(str || "")
      .trim()
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const safeName = sanitize(name);
  const safeEmail = sanitize(email);
  const safeMessage = sanitize(message);

  // Validation helpers
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!safeName || !safeEmail || !safeMessage) {
    return {
      statusCode: 400,
      body: JSON.stringify({ status: "error", message: "All fields are required" })
    };
  }

  if (!isValidEmail(safeEmail)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ status: "error", message: "Invalid email format" })
    };
  }

  if (safeName.length > 100 || safeMessage.length > 1000) {
    return {
      statusCode: 400,
      body: JSON.stringify({ status: "error", message: "Input too long" })
    };
  }

  // Send to Google Apps Script
  const query = new URLSearchParams({
    name: safeName,
    email: safeEmail,
    message: safeMessage
  }).toString();

  try {
    const response = await fetch(`${SCRIPT_URL}?${query}`);
    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "success", response: "Message sent!" })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: "error", message: "message not sent" })
    };
  }
};
