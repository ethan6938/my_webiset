// Global namespace to avoid redeclarations
window.DR = window.DR || {};
window.DR.utils = window.DR.utils || {};

window.DR.utils.FINISH_BY_TRACK = { track: 1000, track2: 1800, track3: 2600 };
window.DR.utils.getFinishDistance = (track) => window.DR.utils.FINISH_BY_TRACK[track] ?? 1400;
