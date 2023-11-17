import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/oauth2/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  },
);

router.get('/api/userinfo', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      user_id: req.user.user_id,
      email: req.user.email,
      user_type: req.user.user_type,
      username: req.user.username,
      user_pfp: req.user.user_pfp,
    });
  } else {
    res.status(401).json({ message: 'User not authenticated' });
  }
});

export default router;
