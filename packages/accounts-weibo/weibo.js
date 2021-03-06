Accounts.oauth.registerService('weibo');

if (Meteor.isClient) {
  const loginWithWeibo = (options, callback) => {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    const credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Weibo.requestCredential(options, credentialRequestCompleteCallback);
  };
  Accounts.registerClientLoginFunction('weibo', loginWithWeibo);
  Meteor.loginWithWeibo = (...args) => 
    Accounts.applyLoginFunction('weibo', args);
} else {
  Accounts.addAutopublishFields({
    // publish all fields including access token, which can legitimately
    // be used from the client (if transmitted over ssl or on localhost)
    forLoggedInUser: ['services.weibo'],
    forOtherUsers: ['services.weibo.screenName']
  });
}
