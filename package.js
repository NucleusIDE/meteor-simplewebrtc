Package.describe({
  name: 'nucleuside:webrtc',
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

  //simplewebrtc_latest.js file wasn't working well when included as a regular js file. So we are loading it as an asset, and injecting it into the webpage manually
  api.addFiles('lib/simplewebrtc_latest.js', 'client', {isAsset: true});
  api.addFiles('client/inject_simplewebrtc.js', 'client');

  api.addFiles('lib/simplewebrtc_server.js', 'server');

  // we don't need to export this global because SimpleWebRTC script exports it to window by itself
  // api.export('SimpleWebRTC', ['client']);
});
