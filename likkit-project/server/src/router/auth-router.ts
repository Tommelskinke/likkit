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

router.get('/logout', (request, response) => {
  request.logout((error) => {
    if (error) {
      // Handle the error
      return response.status(500).send('Could not log out, please try again.');
    }
    // Destroying the session and sending a response
    if (request.session) {
      console.log('User logged out');
      request.session.destroy((error) => {
        if (error) {
          // Handle the error
          return response.status(500).send('Could not log out, please try again.');
        }
        response.clearCookie('connect.sid'); // Clear the session cookie
        return response.redirect('/'); // Redirect to home page or login page
      });
    } else {
      response.redirect('/');
    }
  });
});

export default router;
