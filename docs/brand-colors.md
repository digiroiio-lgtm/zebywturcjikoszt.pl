# Brand colors

The palette follows the Polish flag: white surfaces, red accent, minimal black. Purple appears only as the end of a red-to-purple gradient.

| Token | Value | Use |
| --- | --- | --- |
| `--green` (accent, name kept to limit the diff) | `#dc213c` | buttons, brand mark, bars; white text on it is 4.85:1 |
| `--green-dark` | `#b3122a` | text links, eyebrows, hover; 6.9:1 on white |
| `--ink` | `#161213` | body text and black surfaces |
| `--muted` | `#5a5256` | secondary text |
| `--mint` / `--sand` / `--line` | `#fdf1f2` / `#f7f4f2` / `#e6dfe0` | light surfaces and borders |
| Gradient | `#b3122a → #7b1fa2` (text), `#dc213c → #7b1fa2` (glow) | hero accent, hero glow |
| Light red on black | `#ff8a9b` | small labels on black surfaces |

Rules: `#dc213c` is for large surfaces and buttons, not for small text on cream (4.46:1). Use `#b3122a` for text. The form selection blue and the form error red are state colors and are not part of the palette. YouTube's play button keeps YouTube's red.

Checked with a computed-style scan on `/`, `/koszt`, `/implanty`, `/kontakt` and `/poradniki`: no text below 4.5:1 (3:1 for large text).
