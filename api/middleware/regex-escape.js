const escapeRegex = (string) => {
    return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/, "\\$&");
  };
  // Exporting Function
  module.exports = escapeRegex;
  