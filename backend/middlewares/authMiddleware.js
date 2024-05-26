// authGuard.js
function authenticateUser(req, res, next) {
    // Check if user is authenticated
    if (!req.user) {
      return res.redirect('/login'); // Redirect to login page if not authenticated
    }
    next();
  }
  
  module.exports = authenticateUser;
  