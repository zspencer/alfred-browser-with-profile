# alfred-browser-with-profile

_Warning: This doesn't work due for some reason which I cannot determine._

For a while now, I've used different Firefox Profiles depending on which company I am working for.
This contextualizes my authenticated sessions, bookmarks and browsing history to a particular workplace, which makes it easier to pick up where I left off.

I rely on [Alfred](https://www.alfredapp.com) for switching to a particular application when I want to focus on it, which mostly works.
However, because I run multiple instances of Firefox at the same time it does not have a mechanism for bringing the Firefox I _want_ to the front.
As a result, if I want to focus on something for Cohere instead of Zinc, I must alt-tab through a variety of instances until I find the one I want.

This annoys me. Not a lot, but enough to inspire a casual afternoon dive into:

- How to [manage focus on MacOS with AppleScript](https://stackoverflow.com/questions/2296812/how-to-activate-mac-os-x-application-with-a-given-process-id)
- How to write [Alfred Workflows in Node](https://github.com/sindresorhus/alfy)
- And what options are available [on the Firefox Command Line](https://developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options)

Unfortunately, I was unable to make it work.

From what I can tell, executing `firefox` or `firefox-bin` with a profile passes through to the most recently opened version of Firefox regardless of the argument passed to the `-profile` flag.

If you happen to figure out a workaround, let me know on [mastodon](https://wandering.shop/@zee) or [twitter](https://twitter.com/zspencer)

## Bummer huh? Try This Instead

That said, I did stumble upon an alternative: [Copy the Firefox application instead of using profiles](https://wesbos.com/run-two-versions-of-firefox-on-mac-osx/), which makes it possible to switch browser contexts using Alfred by typing the differentiating parts of the names.
