const Services = require("../models/Services");

exports.fetchAll = () => {
  return new Promise((resolve, reject) => {
    Services.findAll()
      .then((gigs) => {
        console.log(gigs);
        resolve(gigs);
      })
      .catch((err) => reject(err));
  });
};
