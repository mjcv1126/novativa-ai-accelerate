

## Plan: Enable audio on TikTok video popup

### Change

**`src/pages/Legal.tsx`** (line 715):

Update the iframe `src` URL to include `&mute=0` and add `allow="autoplay; encrypted-media"` to permit autoplay with sound:

```
src="https://www.tiktok.com/player/v1/7617938736021736722?music_info=0&description=0&rel=0&autoplay=1&mute=0"
allow="autoplay; encrypted-media"
```

Note: Most browsers block autoplay with audio unless the user has interacted with the page first. Since the user clicks the profile image to open the popup, that click counts as user interaction, so autoplay with audio should work.

