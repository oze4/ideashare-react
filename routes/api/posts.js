const express = require('express');
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

const router = express.Router();

// @ route    POST api/posts
// @desc      Create a post
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');

      //user information (name and avatar) comes from the databse, not the request
      const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @ route    GET api/posts
// @desc      Get all posts
// @access    Public
router.get('/', async (req, res) => {
  try {
    //no need to populate because the name and avatar are already in the post model
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.send(500).send('Server Error');
  }
});

// @ route    GET api/posts
// @desc      Get all posts of a single user to show in dashboard
// @access    Public
// router.get('/mypost', auth, async (req, res) => {
//   try {
//     //no need to populate because the name and avatar are already in the post model
//     const posts = await Post.find({ user: req.user.id }).sort({ date: -1 });
//     res.json(posts);
//   } catch (err) {
//     console.error(err.message);
//     res.send(500).send('Server Error');
//   }
// });

// @ route    GET api/posts/:post_id
// @desc      Get a single post by ID
// @access    Public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //if cannot find the post with that id
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.send(500).send('Server Error');
  }
});

// @ route    DELETE api/posts/:id
// @desc      Delete a post by Id
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    //Check whether it's the authenticated user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized ' });
    }
    await post.remove();

    res.json({ msg: 'Post deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.send(500).send('Server Error');
  }
});

// @ route    PUT api/posts/togglelike/:id
// @desc      Like and dislike a post (toggle)
// @access    Private
router.put('/togglelike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if the post has already been liked by this user
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      const removeIndex = post.likes
        .map(like => like.user.toString())
        .indexOf(req.user.id);
      post.likes.splice(removeIndex, 1);

      await post.save();
      return res.json(post.likes);
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ route    PUT api/posts/comment/:id/:comment_id/togglelike
// @desc      Like and dislike a comment (toggle)
// @access    Private
router.put(
  '/comment/:id/:comment_id/togglelike_comment',
  auth,
  async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);

      //Check if the comment of the post has already been liked by this user

      const comments = post.comments.map((comment, index) => {
        // check whether it is the right comment or not
        if (comment._id.toString() === req.params.comment_id) {
          // check whether the user already liked?
          if (
            comment.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            const removeIndex = comment.likes
              .map(like => like.user.toString())
              .indexOf(req.user.id);
            comment.likes.splice(removeIndex, 1);
          } else {
            comment.likes.unshift({ user: req.user.id });
          }
          return comment;
        } else {
          return comment;
        }
      });
      post.comments = comments;
      await post.save();
      res.json(comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @ route    POST api/posts/comment/subcomment/:id/:comment_id/:subcomment_id
// @desc      Post a comment to a comment
// @access    Private
router.post('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    console.log('1');
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);
    console.log('2');
    //user information (name and avatar) comes from the databse, not the request
    const newSubComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };
    console.log('3');
    post.comments.map(comment => {
      if (comment._id.toString() === req.params.comment_id) {
        comment.subComments.unshift(newSubComment);
      }
      console.log('4');
    });
    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ route    POST api/posts/comment/subcomment/:id/:comment_id/:subcomment_id
// @desc      Post a comment to a comment
// @access    Private
router.post(
  '/comment/subcomment/:id/:comment_id/:subcomment_id',
  auth,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      //Pull out a comment from the post
      const comment = post.comments.find(
        comment => comment.id === req.params.comment_id
      );

      const subcomment = comment.subComments.filter(subcomment => {
        subcomment._id.toString() === req.params.subcomment_id;
      });

      //Make sure the comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }
      //Check whether it's the right user
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      //Get the remove index

      const removeIndex = comment.subComments
        .map((subcomment, index) => {
          console.log(`index: ${index}`);
          console.log(comment);
          return subcomment.user.toString();
        })
        .indexOf(req.user.id);

      console.log(`remove index ${removeIndex}`);

      comment.subcomments.splice(removeIndex, 1);

      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @ route    PUT api/posts/like/:id
// @desc      Like a post (only once)
// @access    Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if the post has already been liked by this user
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ route    PUT api/posts/unlike/:id
// @desc      Unlike a post (only once)
// @access    Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if the poast has not liked yet
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'Post has not been liked yet' });
    }

    //Get the remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Comment Section

// @ route    POST api/posts/comment/:id
// @desc      Comment a post
// @access    Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      //user information (name and avatar) comes from the databse, not the request
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);
      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @ route    DELETE api/posts/comment/:id/:comment_id
// @desc      Delete a comment (of a post)
// @access    Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Pull out a comment from the post
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );
    //Make sure the comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    //Check whether it's the right user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    //Get the remove index

    const removeIndex = post.comments
      .map((comment, index) => {
        console.log(`index: ${index}`);
        console.log(comment);
        return comment.user.toString();
      })
      .indexOf(req.user.id);

    console.log(`remove index ${removeIndex}`);

    post.comments.splice(removeIndex, 1);

    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ route    POST api/posts/comment/:id
// @desc      Comment a post
// @access    Private
router.post(
  '/subcomment/:id/:comment_id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      //user information (name and avatar) comes from the databse, not the request
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.map(comment => {
        comment._id.toString() === req.params.comment_id && console.log('hi');
        comment.subComments.unshift(newComment);
      });
      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @ route    DELETE api/posts/comment/:id/:comment_id/:subcomment_id
// @desc      Delete a subcomment of a comment (of a post)
// @access    Private
router.delete(
  '/comment/subcomment/:id/:comment_id/:subcomment_id',
  auth,
  async (req, res) => {
    try {
      console.log('1');
      const post = await Post.findById(req.params.id);
      console.log('2');
      //Pull out a comment from the post
      const comment = post.comments.find(
        comment => comment.id === req.params.comment_id
      );

      console.log('3');
      const subcomment = comment.subComments.find(
        subcomment => subcomment.id === req.params.subcomment_id
      );
      console.log('4');
      //Make sure the comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }
      //Check whether it's the right user
      if (subcomment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      console.log('5');
      //Get the remove index
      const removeIndex = comment.subComments
        .map(subcomment => subcomment.user.toString())
        .indexOf(req.user.id);
      console.log('6');

      post.comments.map((comment, index) => {
        if (comment._id.toString() === req.params.comment_id) {
          console.log(post.comments[index]);
          post.comments[index].subComments.splice(removeIndex, 1);
          // comment.subComments.map(subcomment => {
          //   console.log('7');
          //   if (subcomment._id.toString() === req.params.subcomment_id) {
          //     console.log('8');
          //     console.log('removeindex');
          //     console.log(removeIndex);
          //     console.log(subcomment);
        }
      });

      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// update the status of the post
// only the post owner can do it
router.put('/status/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    if (post.status === 'red') {
      post.status = 'yellow';
    } else if (post.status === 'yellow') {
      post.status = 'green';
    } else if (post.status === 'green') {
      post.status = 'default';
    } else {
      post.status = 'red';
    }
    await post.save();

    res.json(post.status);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
