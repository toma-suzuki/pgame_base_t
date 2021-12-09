const CopyTargets = [
  {
    from: 'animate/pgame_canvas_*.js',
    to: 'jsgame',
    context: 'animate',
  },
  {
    from: 'animate/jsgame/images_*/*',
    to: 'jsgame',
    context: 'animate/jsgame',
  },
];

module.exports = CopyTargets;
