Package.describe({
  name: 'nucleuside:simplewebrtc',
  version: '0.0.1',
  summary: 'Video chat using webrtc for Nucleus',
  git: '',
  documentation: 'README.md'
});

Npm.depends({
  "getconfig": "0.3.0",
  "node-uuid": "1.2.0",
  "socket.io": "0.9.16",
  "yetify": "0.0.1"
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');

  // SimpleWebRTC's latest.js script had problems when it was loaded from
  // within meteor as a regular javascript. I could not make it work from
  // within meteor, it might be possible though. There were too many things
  // not working at the moment, so I decided to not bang my head for too long
  // on this and get the whole thing working first. So right now we inject
  // the script into the HTML page. Because of this, for a tiny fraction of
  // time, `window.SimpleWebRTC` might not be available. We have to use a
  // Meteor.setInterval to overcome this. Later, even if it's impossible to
  // use the SimpleWebRTC script from within meteor, we can overcome this by
  // creating a thin wrapper and accepting a callback which executes when
  // SimpleWebRTC is available (look into nucleuside:transcompiler package).
  //   SimpleWebRTC is available (look into nucleuside:transcompiler package).
  api.addFiles('lib/simplewebrtc_latest.js', 'client', {isAsset: true});
  //TODO: Make this script work from within meteor as a regular javascript file so it won't need to be injected
  api.addFiles('client/inject_simplewebrtc.js', 'client');

  //TODO: Make it configurable whether to run the server or not
  api.addFiles('lib/simplewebrtc_server.js', 'server');

  // we don't need to export this global because SimpleWebRTC script exports it to window by itself
  // api.export('SimpleWebRTC', ['client']);
});
