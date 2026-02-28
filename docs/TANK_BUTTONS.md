# In-tank buttons (bubbles & wallpaper)

You want buttons that sit **inside** the tank image, in a different color, and act as the bubble and wallpaper controls while matching the scene’s perspective.

## Best approach: layered images, same canvas size

1. **Export from the same scene**
   - Use the **same canvas size** as the tank (e.g. 624×455 to match the TV cutout).
   - Export:
     - **Base layer:** tank background **without** the button art (or with “empty” spots where buttons go).
     - **Button layer(s):** the same elements (e.g. rocks, shells) but in a **different color** or with a glow, as **separate PNGs with transparency**, so they align pixel‑for‑pixel with the base.

2. **In the app: stack layers**
   - One div with the **background image** (full tank).
   - On top, **absolutely positioned** divs for each button, each with:
     - `background-image` or `<img src="…">` for the button image
     - `position: absolute` and **same-unit positioning** (e.g. `left` / `top` in **%** or in **px** on a container that has the same aspect and size as the tank)
   - So: **same 624×455 (or 100%) coordinate system** → button images align with the background.

3. **Perspective**
   - Don’t do real 3D in the app. Instead:
     - Draw the buttons **already in perspective** in your art tool (Figma, etc.), so the PNGs look correct when overlaid.
     - Export at the same resolution and aspect ratio as the tank; then `left`/`top` (and optional `width`/`height`) in the app will keep them aligned.

4. **Interactivity**
   - Put `pointer-events: auto` on the button elements and `pointer-events: none` on the background so only the buttons receive clicks.
   - Use a **single combined button image** (bubble + wallpaper in one PNG) and **hotspots**, or **two separate PNGs** (one for bubble, one for wallpaper), each with its own hit area.

## File structure suggestion

- `public/backgrounds/` — unchanged (full tank images).
- `public/buttons/` (or inside each background folder):
  - `bubble-button.png` — bubble button art (transparent PNG), drawn to align with the tank.
  - `wallpaper-button.png` — wallpaper button art (transparent PNG), same idea.

Or one image per **background** if the button position/art changes per wallpaper:

- `public/buttons/light-bubble.png`, `public/buttons/light-wallpaper.png`, etc.

## Implementation sketch

- **TankScreen** (or a wrapper) renders:
  1. Base layer: `background-image` from wallpaper.
  2. Button layer: a div with `position: absolute; inset: 0`, same size as the tank, then inside it:
     - `<button>` (or clickable div) for **bubble**: `position: absolute; left: X%; top: Y%; width: W%; height: H%; background: url(/buttons/bubble-button.png) no-repeat center/contain;`
     - Same for **wallpaper** with its own position and image.
- You set **X, Y, W, H** (in % or px) so the hit area and image align with where the button appears in the background. If the PNG includes transparency, the hit area can be the same size as the visible art.

## Summary

- **Background** = one image (full tank).
- **Buttons** = separate PNGs, same perspective and canvas size as the tank, exported with transparency.
- **Layout** = background div + absolutely positioned button divs with the same coordinate system (e.g. 624×455 or 100% width/height).
- **No 3D in code** — perspective is baked into the assets; the app only does 2D overlay with absolute positioning.

Once you have the button PNGs and approximate positions (e.g. “bubble at 10% from left, 85% from top”), we can wire them into the existing bubble and wallpaper actions and optionally move or remove the current UI controls.
