var WebRtcColl = new Meteor.Collection('webrtc_coll');

var WebrtcExtension = function() {
  this._messagesAlreadyHandled = [];
  this._callbacks = [];
};

WebrtcExtension.prototype.broadcast = function(message, payload) {
  WebRtcColl.insert({message: message, payload: payload, created_at: moment().toDate()});
};
WebrtcExtension.prototype.on = function(messageType, callback) {
  this._callbacks[messageType] = this._callbacks[messageType] || [];
  this._callbacks[messageType].push(callback);
};
WebrtcExtension.prototype.off = function(messageType, callback) {
  this._callbacks[messageType] = [];
};

MeteorWebrtc = new WebrtcExtension();

if (Meteor.isClient) {
  Meteor.subscribe('webrtc_coll_latest_messages');

  //autorun for executing callbacks set on MeteorWebrtc when new messages arrive
  Tracker.autorun(function() {
    var newMessages = _.reject(WebRtcColl.find({created_at: {$lt: moment().add({minutes: 5}).toDate()}}, {sort: {created_at: -1}}).fetch(), function(msg) {
      return _.contains(MeteorWebrtc._messagesAlreadyHandled, msg._id);
    });

    newMessages.forEach(function(msg) {
      var callbacks = MeteorWebrtc._callbacks[msg.message];

      if (! callbacks || ! callbacks.length) {
        return;
      }

      callbacks.forEach(function(cb) {
        cb(msg.payload);
      });

      MeteorWebrtc._messagesAlreadyHandled.push(msg._id);
    });
  });
}


if (Meteor.isServer) {
  WebRtcColl.allow({
    insert: function() {
      return true;
    }
  });

  Meteor.publish('webrtc_coll_latest_messages', function(limit) {
    limit = limit || 30;
    //publish latest 30 messages which are at most 2 minutes old
    var webrtcMessages = WebRtcColl.find({created_at: {$lt: moment().add({minutes: 5}).toDate()}}, {sort: {created_at: -1}, limit: limit});
    return webrtcMessages;
  });
}
