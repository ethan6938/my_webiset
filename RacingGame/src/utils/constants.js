export const FINISH_BY_TRACK = {
  track: 1000,  // Easy
  track2: 1800, // Medium
  track3: 2600, // Hard
};

export const getFinishDistance = (track) => FINISH_BY_TRACK[track] ?? 1400;
