// Expose constants via a global namespace for simplicity (no bundler)
window.DRUtils = window.DRUtils || {};
window.DRUtils.FINISH_BY_TRACK = { track: 1000, track2: 1800, track3: 2600 };
window.DRUtils.getFinishDistance = (track) => window.DRUtils.FINISH_BY_TRACK[track] ?? 1400;
