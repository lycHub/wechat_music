function isEmptyObject(obj) {
  return JSON.stringify(obj) == "{}";
}

module.exports = {
  isEmptyObject
}
