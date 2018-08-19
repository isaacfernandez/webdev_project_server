var mongoose = require('mongoose');

var feedFollowSchema = require('../feed-follow/feed-follow.schema.server');
var feedSchema = require('../feed/feed.schema.server');
var postSchema = require('../post/post.schema.server');
var userFollowSchema = require('../user-follow/user-follow.schema.server');
var userSchema = require('../user/user.schema.server');

var model = mongoose.model('UserModel', userSchema);


function findUserByCredentials(creds) {
  return model.findOne(creds);
}

function findUserByUsername(username) {
  return model.findOne({username: username});
}

function findUserById(idToFind) {
  return model.findById(idToFind);
}

function createUser(newUser) {
  return model.create(newUser);
}

function findAllUsers() {
  return model.find();
}

function deleteUserById(idToDelete) {
  return model.remove({_id: idToDelete});
}

function updateUser(user, idToUpdate) {
  return model.update({_id: idToUpdate}, {$set: user});
}

function addUserFollow(userId, userFollowId) {
  return model.update({_id: userId}, {$push: {userFollows: userFollowId}});
}

function addUserFollower(userId, userFollowId) {
  return model.update({_id: userId}, {$push: {userFollowers: userFollowId}});
}

function addFeedFollow(userId, feedFollowId) {
  return model.update({_id: userId}, {$push: {feedFollows: feedFollowId}});
}

function removeFeedFollowById(userId, feedFollowId) {
  return model.update({_id: userId}, {$pull: {feedFollows: feedFollowId}});
}

function addPost(userId, postId) {
  return model.update({_id: userId}, {$push: {posts: post}});
}

module.exports = {
  findUserByCredentials: findUserByCredentials,
  findUserByUsername: findUserByUsername,
  findUserById: findUserById,
  createUser: createUser,
  findAllUsers: findAllUsers,
  deleteUserById: deleteUserById,
  updateUser: updateUser,
  addUserFollow: addUserFollow,
  addUserFollower: addUserFollower,
  addFeedFollow: addFeedFollow,
  removeFeedFollowById: removeFeedFollowById,
  addPost: addPost
};

