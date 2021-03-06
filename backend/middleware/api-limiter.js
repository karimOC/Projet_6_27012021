const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  //On limite le nombre de requête à notre API
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Commence le blocage après 100 requêtes
});

module.exports = apiLimiter;
