// Guards the homepage Shorts section: URL parsing, approval/consent rules in data/shorts.json, and (after `next build`) the rendered homepage.
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { approvedVideos, parseYouTubeId } from '../lib/youtube-shorts.mjs';

const ok = 'dQw4w9WgXc_'; // syntactically valid 11-character ID used only in parser tests
for (const url of [`https://www.youtube.com/shorts/${ok}`, `https://youtube.com/shorts/${ok}?feature=share`, `https://m.youtube.com/watch?v=${ok}&t=5`, `https://youtu.be/${ok}?si=abc`, `https://www.youtube-nocookie.com/embed/${ok}`, `https://www.youtube.com/embed/${ok}`]) assert.equal(parseYouTubeId(url), ok, url);
for (const url of ['', 'not a url', 'https://example.com/shorts/' + ok, 'https://www.youtube.com/shorts/short', 'https://www.youtube.com/', 'https://www.youtube.com/watch?v=', `javascript:alert(1)//youtube.com/shorts/${ok}`, `https://evil.com/?u=https://youtube.com/shorts/${ok}`]) assert.equal(parseYouTubeId(url), null, 'must reject ' + url);

const config = JSON.parse(readFileSync('data/shorts.json', 'utf8'));
const failures = [];
const fail = (m) => failures.push(m);
const seen = new Set();
for (const [i, v] of config.videos.entries()) {
  const id = parseYouTubeId(v.url);
  if (!id) fail(`video ${i}: not a YouTube video URL`);
  else if (seen.has(id)) fail(`video ${i}: duplicate ${id}`); else seen.add(id);
  if (/PLACEHOLD/.test(v.url)) fail(`video ${i}: placeholder URL in the production list`);
  for (const key of ['title', 'description']) if (!v[key] || v[key].length < 10) fail(`video ${i}: ${key} is required`);
  if (v.approved === true && !(v.consentReference && v.consentReference.trim())) fail(`video ${i}: approved without consentReference`);
  if (v.kind && !['patient-testimonial', 'other'].includes(v.kind)) fail(`video ${i}: unknown kind`);
  if (v.thumbnail && !(v.thumbnail.startsWith('/') && existsSync('public' + v.thumbnail))) fail(`video ${i}: thumbnail ${v.thumbnail} is not a file under /public`);
  if (v.uploadDate && !/^\d{4}-\d{2}-\d{2}$/.test(v.uploadDate)) fail(`video ${i}: uploadDate must be YYYY-MM-DD`);
}
const videos = approvedVideos(config);
assert.equal(approvedVideos({ videos: [{ url: `https://youtu.be/${ok}`, approved: true }] }).length, 0, 'approval without consentReference must hide a video');
assert.equal(approvedVideos({ videos: [{ url: `https://youtu.be/${ok}`, consentReference: 'x' }] }).length, 0, 'a video without approved:true must be hidden');

const root = '.next/server/app/';
let note = 'no build present, output checks skipped';
if (existsSync(root + 'index.html')) {
  const html = readFileSync(root + 'index.html', 'utf8');
  if (/<iframe/i.test(html)) fail('homepage HTML contains an iframe before any click');
  if (/PLACEHOLD/.test(html)) fail('placeholder video in the production build');
  if (videos.length === 0) {
    if (html.includes('patient-stories')) fail('Shorts section rendered with no approved videos');
    if (/youtube(-nocookie)?\.com|ytimg\.com/.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) fail('homepage references YouTube although no video is approved');
    note = 'no approved video: the homepage has no Shorts section and no YouTube reference';
  } else {
    const at = (text) => html.indexOf(text);
    const start = at('home-doctors-title'), section = at('patient-stories-title'), after = at('home-process-title');
    if (!(start > -1 && start < section && section < after)) fail('Shorts section must follow the doctors and precede the process steps');
    if ((html.match(/class="shorts-play"/g) || []).length !== videos.length) fail('play button count differs from approved videos');
    const thumbnails = [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => tag).filter((tag) => /(?:i\.ytimg\.com|Miniatura filmu:)/.test(tag));
    if (thumbnails.length !== videos.length) fail('thumbnail count differs from approved videos');
    for (const tag of thumbnails) if (!/alt="Miniatura filmu: [^"]+"/.test(tag)) fail('video thumbnail lacks descriptive Polish alt text');
    if (/<iframe/.test(html)) fail('iframe in initial HTML');
    note = `${videos.length} approved video(s) rendered after the doctors and before the process steps, no iframe before Play`;
  }
}
if (failures.length) { console.error(`Shorts check failed with ${failures.length} issue(s):`); failures.forEach((f) => console.error('- ' + f)); process.exit(1); }
console.log(`Shorts check passed: URL parser (6 valid forms, 8 rejected), consent rules, ${config.videos.length} configured video(s); ${note}.`);
