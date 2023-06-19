import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import User from "../models/User.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // Verificar coincidencia del email
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: "Usuario no Encontrado." });
      }

      // Verificar coincidencia de la contraseña
      const isMatch = await user.matchPassword(password);
      if (!isMatch)
        return done(null, false, { message: "Contraseña Incorrecta." });
      
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
