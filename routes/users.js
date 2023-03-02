const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => { //login automatically after registering
            if (err) return next(err);
            req.flash('success', 'Welcome to American Campgrounds!');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', 
passport.authenticate('local', 
{ failureFlash: true, failureRedirect: '/login', failureMessage: true,  keepSessionInfo: true}), 
(req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds'; //redirect to original route or campgrounds
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); } //add this function after passport 6.0
        req.flash('success', "Goodbye!");
    res.redirect('/campgrounds');
      });
    });

module.exports = router;