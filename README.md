# SimpleWebRTC for meteor

We run the signalmaster server from within meteor on port 8080. Shall
make this configurable in future. Right now, there is absolutely no way
to configure anything about this package.

It simply exports `SimpleWebRTC` to the client which is just the global
object exported by `SimpleWebRTC` itself, no strings attached.

## Gotchas:
SimpleWebRTC's latest.js script had problems when it was loaded from
within meteor as a regular javascript. I could not make it work from
within meteor, it might be possible though. There were too many things
not working at the moment, so I decided to not bang my head for too long
on this and get the whole thing working first. So right now we inject
the script into the HTML page. Because of this, for a tiny fraction of
time, `window.SimpleWebRTC` might not be available. We have to use a
Meteor.setInterval to overcome this. Later, even if it's impossible to
use the SimpleWebRTC script from within meteor, we can overcome this by
creating a thin wrapper and accepting a callback which executes when
SimpleWebRTC is available (look into nucleuside:transcompiler package).
SimpleWebRTC is available (look into nucleuside:transcompiler package).
