const express = require("express");
const jwt = require("jsonwebtoken"); // JWT
const cors = require("cors"); // CORS - Cross Origin Resource Sharing
const bodyParser = require("body-parser");
const config = require("../config");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const knexFile = require("../knexfile")[process.env.NODE_ENV || "development"];
const knex = require("knex")(knexFile);

exports.postAddBlog = async function (req, res) {
  // unpack token and get the user id

  let token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  let decoded = jwt.verify(token, config.jwtSecret);
  // console.log(decoded);

  // insert data

  if (req.body) {
    let { headline, content } = req.body;
    // console.log(req.body);

    let query = await knex
      .select("headline")
      .from("blogs")
      .where("headline", headline)
      .then((query) => {
        if (query.length == 0) {
          return knex("blogs")
            .insert({
              headline: headline,
              content: content,
            })
            .returning("id")
            .then(async (data) => {
              await knex
                .insert({
                  blog_id: data[0],
                  user_id: decoded.id,
                })
                .into("user_blog")
                .returning("id")
                .catch((err) => {
                  console.log(err);
                });

              let blog = {
                id: data[0],
                headline,
                content,
              };
              res.send(blog);
            });
        }
      });
    // res.send(data, "addblog done");
    //insert user id and blog id into user_blog table

    //then send the done msg or all the blogs
    // where user id == user id
  }
};

// list blog

exports.getBlogList = async function (req, res) {
  let token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  let decoded = jwt.verify(token, config.jwtSecret);
  // console.log(decoded);

  let data = await knex("user_blog").select("blog_id").where("user_id", "=", decoded.id);
  // .orderBy("id");

  // console.log(data);
  let blogArray = [];
  let info = data.map(async (blog, i) => {
    let blogs = await knex("blogs").select("*").where("blogs.id", "=", blog.blog_id);
    // console.log(blogs[0]);
    blogArray.push(blogs[0]);
  });

  Promise.all(info).then(() => {
    blogArray.sort(function (a, b) {
      return a.id - b.id;
    });
    console.log(blogArray, "BLOG ARRAY");
    console.log("read done");
    res.send(blogArray);
  });
};

// edit blog

exports.putEditBlog = async function (req, res) {
  // console.log(req.headers);
  let token = req.headers.authorization.split(" ")[1];

  let decoded = jwt.verify(token, config.jwtSecret);

  if (req.body) {
    let { headline, content } = req.body;
    console.log(req.body, "EDIT BLOG");

    let query = await knex("user_blog").select("blog_id").where("user_id", "=", decoded.id);

    await knex("user_blog")
      .where({
        "user_blog.user_id": decoded.id,
        "user_blog.blog_id": req.params.id,
      })
      .then(async (query) => {
        console.log(query, "EDIT QUERY");
        console.log(headline, content);
        if (query[0]) {
          await knex("blogs").where("blogs.id", "=", req.params.id).update({
            headline: headline,
            content: content,
          });
        }
      });

    res.send("edit done");
  }
};

// delete blog

exports.deleteBlog = async function (req, res) {
  console.log(req.headers);
  let token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  let decoded = jwt.verify(token, config.jwtSecret);
  // console.log(decoded);

  let query = await knex("user_blog").select("blog_id").where("user_id", decoded.id);

  // console.log(query); // [ { blog_idq: 32 }, { blog_id: 33 }, { blog_id: 34 }, { blog_id: 35 } ]
  // console.log(decoded.id); // 18
  console.log(req.params.id);

  await knex("user_blog")
    .where({
      "user_blog.user_id": decoded.id,
      "user_blog.blog_id": req.params.id,
    })
    .del()
    .then(async (query) => {
      console.log(query);
      if (query === 1) {
        await knex("blogs").where("blogs.id", "=", req.params.id).del();
      }
    });
  res.send("delete done");
};
