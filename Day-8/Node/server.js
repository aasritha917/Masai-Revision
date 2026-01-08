class BlogDB {
  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.comments = new Map();
  }

  createUser(id, name) {
    this.users.set(id, { id, name });
  }

  createPost(id, userId, title) {
    if (!this.users.has(userId)) {
      throw new Error("User not found");
    }
    this.posts.set(id, { id, userId, title });
  }

  createComment(id, postId, userId, text) {
    if (!this.posts.has(postId)) {
      throw new Error("Post not found");
    }
    this.comments.set(id, { id, postId, userId, text });
  }

  getPostsByUser(userId) {
    return Array.from(this.posts.values()).filter(
      post => post.userId === userId
    );
  }

  getCommentsByPost(postId) {
    return Array.from(this.comments.values()).filter(
      comment => comment.postId === postId
    );
  }

  deleteUser(userId) {
    for (let post of this.posts.values()) {
      if (post.userId === userId) {
        this.deletePost(post.id);
      }
    }
    this.users.delete(userId);
  }

  deletePost(postId) {
    for (let comment of this.comments.values()) {
      if (comment.postId === postId) {
        this.comments.delete(comment.id);
      }
    }
    this.posts.delete(postId);
  }
}


const db = new BlogDB();

db.createUser(1, "Alice");
db.createUser(2, "Bob");

db.createPost(101, 1, "My First Post");
db.createPost(102, 1, "Second Post");

db.createComment(1001, 101, 2, "Nice post!");
db.createComment(1002, 101, 1, "Thanks!");

console.log("Posts by User 1:", db.getPostsByUser(1));
console.log("Comments on Post 101:", db.getCommentsByPost(101));

db.deleteUser(1);

console.log("Users:", db.users);
console.log("Posts:", db.posts);
console.log("Comments:", db.comments);
