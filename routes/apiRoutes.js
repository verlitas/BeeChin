var db = require("../models");
var validator = require("validator");

module.exports = function (app) {
  // ---------------------------------- Get Routes
  // // Home
  // app.get("/home", async function (req, res) {
  //   try {
  //     const posts = await db.user.findAll(
  //       {
  //         raw: true,
  //         include: db.post
  //       }
  //     );

  //     res.json(posts);
  //   }
  //   catch (err) {
  //     console.log(err)
  //     res.status(500).end();
  //   };
  // });

  // Posts
  app.get("/api/posts", async function (req, res) {
    try {
      const posts = await db.post.findAll({
        order: [
          ['createdAt', 'DESC']
        ]
      })
      res.json(posts);
    }
    catch (err) {
      console.log(err)
      res.status(500).end();
    };
  });

  // Comment
  app.get("/api/posts/:id/comments", async function (req, res) {
    try {
      const postId = await db.post.findOne({
        where: {
          id: req.params.id
        },
        include: [db.comment]
      })
      console.log(postId)
      res.json(postId);
    }
    catch (err) {
      console.log(err)
      res.status(500).end();
    };
  });
  // // Users
  // app.get("/api/users", async function (req, res) {
  //   try {
  //     const users = await db.user.findAll()
  //     res.json(users);
  //   }
  //   catch (err) {
  //     console.log(err)
  //     res.status(500).end();
  //   };
  // });

  // // Username of a Specific User
  // app.get("/api/users/:username", async function (req, res) {
  //   try {
  //     const usernames = await db.user.findOne({
  //       where: {
  //         username: req.params.username
  //       }
  //     })
  //     res.json(usernames);
  //   }
  //   catch (err) {
  //     console.log(err)
  //     res.status(500).end();
  //   };
  // });

  // // Posts Associated with Specific Username
  // app.get("/api/users/:username/posts", async function (req, res) {
  //   try {
  //     const { posts } = await db.user.findOne({
  //       where: {
  //         username: req.params.username
  //       },
  //       include: [db.post]
  //     })
  //     res.json(posts);
  //   }
  //   catch (err) {
  //     console.log(err)
  //     res.status(500).end();
  //   };
  // });

  // // Comments Associated with Specific Username
  // app.get("/api/users/:username/comments", async function (req, res) {
  //   try {
  //     const { posts } = await db.user.findOne({
  //       where: {
  //         username: req.params.username
  //       },
  //       include: [
  //         { model: db.post, include: [db.comment] }
  //       ]
  //     })

  //     const comments = [];

  //     posts.forEach(post => {
  //       return post.comments.forEach(comment => {
  //         return comments.push(comment);
  //       });
  //     });

  //     res.json(comments);
  //     console.log(comments);
  //   }
  //   catch (err) {
  //     console.log(err)
  //     res.status(500).end();
  //   };
  // });

  // ---------------------------------- Post Routes
  // Posts
  app.post("/api/posts", async function (req, res) {
    console.log(req.body.avatar);
    const inputValues = {
      displayName: req.body.displayName,
      avatar: validator.isInt(req.body.avatar) ? req.body.avatar : 1,
      text: req.body.text
    }
    console.log(inputValues.avatar);
    try {
      const posts = await db.post.create(inputValues);

      res.json(posts);
    }
    catch (err) {
      console.log(err)
      res.status(500).end();
    };
  });

  // Comment
  app.post("/api/posts/:postid/comments", async function (req, res) {
    try {
      const { text, displayName, avatar } = req.body;
      const postId = req.params.postid;
      const posts = await db.comment.create({
        postId,
        text,
        displayName,
        avatar: validator.isInt(avatar) ? avatar : 1
      });
      res.json(posts);
    }
    catch (err) {
      console.log(err)
      res.status(500).end();
    };
  });

  // // Username
  // app.post("/api/users", async function (req, res) {
  //   try {
  //     const { bio, username, firstName, lastName } = req.body;
  //     // const username = req.params.username;
  //     const posts = await db.user.create({
  //       bio,
  //       username,
  //       firstName,
  //       lastName
  //     });
  //     res.json(posts);
  //   }
  //   catch (err) {
  //     console.log(err)
  //     res.status(500).end();
  //   };
  // });
  // ----------------------------------- Put Route
  app.put("/api/posts/:id", async function (req, res) {
    console.log(req.body);

    try {
      db.post.update(
        {
          score: db.sequelize.literal(`score${req.body.score}`)
        },
        {
          where: {
            id: req.body.id
          }
        });
      res.status(200)
    }
    catch (err) {
      console.log(err)
      res.status(500).end();
    }
  });

  // // ---------------------------------- Delete Route
  // // Delete Post by ID
  // app.delete("/api/posts/:id", async function (req, res) {
  //   try {
  //     const posts = await db.post.destroy({
  //       where: {
  //         id: req.params.id
  //       }
  //     });
  //     res.json(posts);
  //   }
  //   catch (err) {
  //     console.log(err)
  //     res.status(500).end();
  //   };
  // });
}