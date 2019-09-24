const express = require('express');
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const Notification = require('../../models/Notification');

const router = express.Router();

// @ route    GET api/notification
// @desc      Get the notification of the current user
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const notification = await Notification.findOne({ user: req.user.id });
    if (!notification) {
      const newNoti = new Notification({
        user: req.params.id,
        seen: false
      });
      try {
        const noti = await newNoti.save();
        return res.json(noti);
      } catch (err) {
        console.error(err.message);
        return res.sendStatus(500).send('Server Error');
      }
    }
    console.log(notification);
    res.json(notification);
    console.log(notification);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500).send('Server Error');
  }
});

// @ route    PUT api/posts
// @desc      Update a "seen" of the notification of the post's owner to false if the
// @access    Private
router.post('/unsee/:id', auth, async (req, res) => {
  try {
    let notification = await Notification.findOne({ user: req.params.id });
    if (!notification) {
      const newNoti = new Notification({
        user: req.params.id,
        seen: false
      });
      try {
        const noti = await newNoti.save();
        return res.json(noti);
      } catch (err) {
        console.error(err.message);
        return res.sendStatus(500).send('Server Error');
      }
    }
    console.log('4');
    notification.seen = false;
    console.log(notification);
    const noti = await notification.save();
    res.json(noti);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500).send('Server Error');
  }
});

// @ route    PUT api/posts
// @desc      Update a "seen" of the notification of the post's owner to true
// @access    Private
router.post('/see', auth, async (req, res) => {
  try {
    let notification = await Notification.findOne({ user: req.user.id });
    // if (!notification) {
    //   const newNoti = new Notification({
    //     user: req.user.id,
    //     seen: true
    //   });
    //   try {
    //     const noti = await newNoti.save();
    //     return res.json(noti);
    //   } catch (err) {
    //     console.error(err.message);
    //     return res.sendStatus(500).send('Server Error');
    //   }
    // }
    notification.seen = true;
    const noti = await notification.save();
    res.json(noti);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500).send('Server Error');
  }
});

module.exports = router;
