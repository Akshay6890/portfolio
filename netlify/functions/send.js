const allowedOrigin = "https://akshaypendyala.netlify.app";
const SCRIPT_URL = process.env.SCRIPT_URL;

exports.handler = async (event) => {
  const headers = event.headers;
  const origin = headers.origin || headers.referer || "";

  const isAllowedOrigin = origin.startsWith("https://akshaypendyala.netlify.app");

  if (!isAllowedOrigin) {
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
    const result = await response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "success", message: "Message sent!" })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: "error", message: "message not sent" })
    };
  }
};
