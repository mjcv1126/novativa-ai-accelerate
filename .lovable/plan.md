

## Plan: Auto-close TikTok video popup after 60 seconds

### Change

**`src/pages/Legal.tsx`**:
- Add a `useEffect` that starts a 60-second `setTimeout` when `tiktokOpen` becomes `true`
- When the timer fires, set `tiktokOpen` to `false`
- Clear the timer on cleanup (if user closes manually before 60s)

```tsx
useEffect(() => {
  if (!tiktokOpen) return;
  const timer = setTimeout(() => setTiktokOpen(false), 60000);
  return () => clearTimeout(timer);
}, [tiktokOpen]);
```

Single file, ~4 lines of code added.

