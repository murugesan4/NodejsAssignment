module.exports = class Comment {
    constructor(comment) {
      this.id = comment.id;
      this.postId = comment.postId;
      this.name = comment.name;
      this.email = comment.email;
      this.body = comment.body;
    }
  };