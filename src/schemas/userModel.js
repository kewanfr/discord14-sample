const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userID: String,
  guildID: String,
  username: String,
  discriminator: String,
  nickname: String,
  avatar: String,
  roles: [String],
  joinedAt: Date,

  age: Number,
});

module.exports = model('User', userSchema, "users");