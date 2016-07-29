'use strict';

// src/services/coleditfile/hooks/sanity.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    // The authenticated user
    const user = hook.params.user;

    // Override the original data
    hook.data = {
      // Set the user id
      userId: user._id,
      // Add the current time via `getTime`
      updatedAt: new Date().getTime(),
      name: hook.data.name,
      url: hook.data.url,
    };
  };
};
