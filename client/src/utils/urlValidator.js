export const isValidURL = (url) => {
  // Regular expression to validate URL
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol (optional)
      "((([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,})|" + // domain name or
      "localhost|" + // localhost or
      "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})" + // IP address (v4)
      "(\\:\\d+)?" + // port (optional)
      "(\\/[-a-zA-Z0-9@:%._\\+~#=]*)*" + // path (optional)
      "(\\?[;&a-zA-Z0-9%_\\+.~#?&=]*)?" + // query string (optional)
      "(\\#[-a-zA-Z0-9_]*)?$", // fragment identifier (optional)
    "i" // case-insensitive flag
  );

  return pattern.test(url);
};
