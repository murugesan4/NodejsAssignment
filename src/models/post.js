module.exports = class Post {
    constructor(post) {
      this.id = post.id;
      this.userId = post.userId;
      this.title = post.title;
      this.body = post.body;
    }
  };