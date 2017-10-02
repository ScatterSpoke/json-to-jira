function buildPromise(callback) {
  return new Promise((res, rej)=> {
    callback((err, val)=> {
      if (err) {
        console.error(err);
        rej(err);
      }
      else res(val);
    });
  });
}

module.exports = {
  buildPromise: buildPromise,
};
