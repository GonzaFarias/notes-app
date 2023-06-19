export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "No Autorizado.");
  res.redirect("/auth/signup");
};
