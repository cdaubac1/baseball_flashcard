const SAMPLE_FLASHCARDS = [
  {
    playerRoleInfo: {
      pitcher: 'John Doe',
      pitcherThrows: 'RHP',
      pitcherTeam: 'ABC',
      batter: 'Alex Smith',
      batterSide: 'LHB',
      batterTeam: 'XYZ',
      catcher: 'M. Lee',
      catcherThrows: 'RTH',
      catcherTeam: 'ABC',
    },
    gameContext: {
      inning: 1,
      half: 'Top',
      outs: 0,
      balls: 0,
      strikes: 0,
      date: '2025-09-25',
      time: '7:05 PM',
      localDateTime: '2025-09-25T19:05:00',
      homeTeam: 'ABC',
      awayTeam: 'XYZ',
      league: 'AAA',
      level: 'Triple-A',
      stadium: 'ABC Park',
    },
    pitchAndOutcomeStats: {
      taggedPitchType: ['FF', 'SL', 'CH'],
      autoPitchType: ['FF', 'SL', 'CH'],
      pitchCall: ['CalledStrike', 'Whiff', 'Ball'],
      korBB: { kRate: 0.23, bbRate: 0.07 },
      taggedHitType: ['GB', 'FB', 'LD'],
      playResult: 'Weak GB mostly',
      runsScored: 0,
      outsOnPlay: 0.31,
      notes: 'Struggles with heat up-and-in; chases slider down-away',
    },
    derivedPatterns: {
      zoneOutcomes: {
        1: { whiff: 0.18, weak: 0.10, hev: 0.06 },
        2: { whiff: 0.21, weak: 0.11, hev: 0.07 },
        3: { whiff: 0.24, weak: 0.12, hev: 0.08 },
        4: { whiff: 0.17, weak: 0.09, hev: 0.09 },
        5: { whiff: 0.12, weak: 0.07, hev: 0.14 },
        6: { whiff: 0.16, weak: 0.09, hev: 0.10 },
        7: { whiff: 0.22, weak: 0.13, hev: 0.07 },
        8: { whiff: 0.26, weak: 0.15, hev: 0.05 },
        9: { whiff: 0.20, weak: 0.12, hev: 0.06 },
      },
      highExitVeloHotspots: ['5', '6'],
      firstPitchSwing: 'High',
      twoPitchSequencesToK: [
        'CH low-away → SL low-away',
        'FF up-and-in → SL down-away',
      ],
      stealOrBuntThreat: 'Low',
      sprayTendency: 'Strong pull',
      optimalPitches: [
        { situation: 'First Pitch', call: 'Slider low-away' },
        { situation: 'Put-away', call: 'Fastball up' },
        { situation: 'Sequence', call: 'Changeup → Slider' },
      ],
    },
  },
  {
    playerRoleInfo: {
      pitcher: 'John Doe',
      pitcherThrows: 'RHP',
      pitcherTeam: 'ABC',
      batter: 'Brian Torres',
      batterSide: 'RHB',
      batterTeam: 'XYZ',
      catcher: 'M. Lee',
      catcherThrows: 'RTH',
      catcherTeam: 'ABC',
    },
    gameContext: {
      inning: 1,
      half: 'Top',
      outs: 1,
      balls: 1,
      strikes: 1,
      date: '2025-09-25',
      time: '7:05 PM',
      localDateTime: '2025-09-25T19:05:00',
      homeTeam: 'ABC',
      awayTeam: 'XYZ',
      league: 'AAA',
      level: 'Triple-A',
      stadium: 'ABC Park',
    },
    pitchAndOutcomeStats: {
      taggedPitchType: ['FF', 'SL', 'CU'],
      autoPitchType: ['FF', 'SL', 'CU'],
      pitchCall: ['FoulBall', 'InPlay', 'Ball'],
      korBB: { kRate: 0.19, bbRate: 0.09 },
      taggedHitType: ['LD', 'HR', 'GB'],
      playResult: 'Damage on hanging breaking balls',
      runsScored: 0,
      outsOnPlay: 0.28,
      notes: 'Punishes mistakes over the heart; expands on curves below zone',
    },
    derivedPatterns: {
      zoneOutcomes: {
        1: { whiff: 0.14, weak: 0.08, hev: 0.11 },
        2: { whiff: 0.15, weak: 0.09, hev: 0.10 },
        3: { whiff: 0.13, weak: 0.07, hev: 0.13 },
        4: { whiff: 0.18, weak: 0.10, hev: 0.09 },
        5: { whiff: 0.10, weak: 0.06, hev: 0.18 },
        6: { whiff: 0.12, weak: 0.07, hev: 0.15 },
        7: { whiff: 0.20, weak: 0.12, hev: 0.07 },
        8: { whiff: 0.22, weak: 0.13, hev: 0.06 },
        9: { whiff: 0.17, weak: 0.10, hev: 0.09 },
      },
      highExitVeloHotspots: ['5', '6'],
      firstPitchSwing: 'Moderate',
      twoPitchSequencesToK: [
        'FF up-and-in → CU bury',
        'SL backdoor → SL down-away',
      ],
      stealOrBuntThreat: 'Very Low',
      sprayTendency: 'Gap-to-gap, pull on heaters',
      optimalPitches: [
        { situation: 'First Pitch', call: 'Curveball below zone' },
        { situation: 'Put-away', call: 'Slider down-away' },
        { situation: 'Sequence', call: 'FF up → CU bury' },
      ],
    },
  },
];

// Helper function to create elements
function createElement(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'className') {
      el.className = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(el.style, value);
    } else if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.substring(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  });
  
  children.flat().forEach(child => {
    if (child != null) {
      el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    }
  });
  
  return el;
}

// Component functions
function createSection(title, children, right = null) {
  const rightEl = right || createElement('span');
  
  return createElement('div', { className: 'widget__section' },
    createElement('div', { 
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }
    },
      createElement('h3', {}, title),
      rightEl
    ),
    ...children
  );
}

function createHeader(pitcherName, batterName, context, onPrev, onNext) {
  return createElement('div', { className: 'header' },
    createElement('div', { className: 'header__title' },
      createElement('span', { className: 'name' }, batterName),
      createElement('span', { className: 'meta' }, 'vs'),
      createElement('span', { className: 'name', style: { color: 'var(--accent)' } }, pitcherName),
      createElement('span', { className: 'meta' }, `• ${context}`)
    ),
    createElement('div', { className: 'header__controls' },
      createElement('span', { className: 'chip', title: 'Previous batter', onclick: onPrev, role: 'button' }, '◀ Prev'),
      createElement('span', { className: 'chip', title: 'Next batter', onclick: onNext, role: 'button' }, 'Next ▶')
    )
  );
}

// Main widget class
class FlashcardWidget {
  constructor(container) {
    this.container = container;
    this.index = 0;
    this.section = 0;
    this.setupKeyboardListeners();
    this.render();
  }

  setupKeyboardListeners() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        this.index = Math.min(SAMPLE_FLASHCARDS.length - 1, this.index + 1);
        this.render();
      }
      if (e.key === 'ArrowLeft') {
        this.index = Math.max(0, this.index - 1);
        this.render();
      }
      if (e.key === 'ArrowUp') {
        this.section = (this.section + 1) % 3;
      }
      if (e.key === 'ArrowDown') {
        this.section = (this.section + 2) % 3;
      }
    });
  }

  render() {
    const card = SAMPLE_FLASHCARDS[this.index] ?? SAMPLE_FLASHCARDS[0];
    const { playerRoleInfo: pri, gameContext: gc, pitchAndOutcomeStats: pos, derivedPatterns: dp } = card;
    const headerContext = `${gc.half} ${gc.inning}, ${gc.balls}-${gc.strikes}, ${gc.outs} out${gc.outs === 1 ? '' : 's'}`;

    this.container.innerHTML = '';
    
    const widget = createElement('div', { className: 'widget', 'aria-label': 'Pitcher Flashcard Widget' },
      createHeader(
        `${pri.pitcher} • ${pri.pitcherThrows}`,
        `${pri.batter} • ${pri.batterSide}`,
        headerContext,
        () => { this.index = Math.max(0, this.index - 1); this.render(); },
        () => { this.index = Math.min(SAMPLE_FLASHCARDS.length - 1, this.index + 1); this.render(); }
      ),

      createElement('div', { className: 'widget__grid' },
        // Players & Roles Section
        createSection('Players & Roles', [
          createElement('div', { className: 'kv' },
            createElement('div', { className: 'k' }, 'Pitcher'),
            createElement('div', { className: 'v' }, `${pri.pitcher} • ${pri.pitcherThrows} • ${pri.pitcherTeam}`),
            createElement('div', { className: 'k' }, 'Batter'),
            createElement('div', { className: 'v' }, `${pri.batter} • ${pri.batterSide} • ${pri.batterTeam}`),
            createElement('div', { className: 'k' }, 'Catcher'),
            createElement('div', { className: 'v' }, `${pri.catcher} • ${pri.catcherThrows} • ${pri.catcherTeam}`)
          )
        ], createElement('span', { className: 'chip' }, 'Roster')),

        // Game Context Section
        createSection('Game Context', [
          createElement('div', { className: 'kv' },
            createElement('div', { className: 'k' }, 'Inning'),
            createElement('div', { className: 'v' }, `${gc.half} ${gc.inning}`),
            createElement('div', { className: 'k' }, 'Count'),
            createElement('div', { className: 'v' }, `${gc.balls}-${gc.strikes} • ${gc.outs} out${gc.outs === 1 ? '' : 's'}`),
            createElement('div', { className: 'k' }, 'Stadium'),
            createElement('div', { className: 'v' }, gc.stadium),
            createElement('div', { className: 'k' }, 'Date'),
            createElement('div', { className: 'v' }, `${gc.date} • ${gc.time}`),
            createElement('div', { className: 'k' }, 'Matchup'),
            createElement('div', { className: 'v' }, `${gc.awayTeam} @ ${gc.homeTeam}`),
            createElement('div', { className: 'k' }, 'League/Level'),
            createElement('div', { className: 'v' }, `${gc.league} / ${gc.level}`)
          )
        ], createElement('span', { className: 'chip chip--warn' }, 'Situational')),

        // Recommended Pitches Section
        createSection('Recommended Pitches', [
          createElement('div', { className: 'list' },
            ...dp.optimalPitches.map((p, i) =>
              createElement('div', { className: 'list__item' },
                createElement('span', {}, `${i + 1}) ${p.situation}`),
                createElement('span', {}, p.call)
              )
            )
          )
        ], createElement('span', { className: 'chip chip--good' }, 'Go-To')),

        // Zone Outcomes Section
        createSection('Zone Outcomes', [
          createElement('div', { className: 'zones' },
            ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((z) => {
              const stats = dp.zoneOutcomes[z] || { whiff: 0, weak: 0, hev: 0 };
              return createElement('div', { className: 'zone' },
                createElement('div', { style: { fontSize: '12px', color: 'var(--muted)' } }, `Zone ${z}`),
                createElement('div', { style: { fontWeight: '700' } }, `Whiff ${(stats.whiff * 100).toFixed(0)}%`),
                createElement('div', { style: { fontSize: '12px', color: 'var(--muted)' } }, 
                  `Weak ${(stats.weak * 100).toFixed(0)}% • EV ${(stats.hev * 100).toFixed(0)}%`)
              );
            })
          )
        ]),

        // Tendencies Section
        createSection('Tendencies', [
          createElement('div', { className: 'list' },
            createElement('div', { className: 'list__item' },
              createElement('span', {}, '1st pitch swing'),
              createElement('span', {}, dp.firstPitchSwing)
            ),
            createElement('div', { className: 'list__item' },
              createElement('span', {}, 'Pull vs oppo'),
              createElement('span', {}, dp.sprayTendency)
            ),
            createElement('div', { className: 'list__item' },
              createElement('span', {}, 'Steal/Bunt'),
              createElement('span', {}, dp.stealOrBuntThreat)
            ),
            ...dp.twoPitchSequencesToK.map((seq, i) =>
              createElement('div', { className: 'list__item' },
                createElement('span', {}, `To K seq ${i + 1}`),
                createElement('span', {}, seq)
              )
            )
          )
        ]),

        // Outcomes & Notes Section
        createSection('Outcomes & Notes', [
          createElement('div', { className: 'list' },
            createElement('div', { className: 'list__item' },
              createElement('span', {}, 'KorBB'),
              createElement('span', {}, `${(pos.korBB.kRate * 100).toFixed(0)}% K • ${(pos.korBB.bbRate * 100).toFixed(0)}% BB`)
            ),
            createElement('div', { className: 'list__item' },
              createElement('span', {}, 'PlayResult'),
              createElement('span', {}, pos.playResult)
            ),
            createElement('div', { className: 'list__item' },
              createElement('span', {}, 'Notes'),
              createElement('span', {}, pos.notes)
            )
          )
        ], createElement('span', { className: 'chip' }, 'Coach'))
      ),

      createElement('div', { className: 'footer' },
        createElement('div', {},
          createElement('span', { className: 'kbd' }, '←'),
          createElement('span', { style: { margin: '0 6px' } }, 'Prev'),
          createElement('span', { className: 'kbd' }, '→'),
          createElement('span', { style: { marginLeft: '6px' } }, 'Next')
        ),
        createElement('div', {},
          createElement('span', { className: 'kbd' }, '↑'),
          createElement('span', { style: { margin: '0 6px' } }, 'Next section'),
          createElement('span', { className: 'kbd' }, '↓'),
          createElement('span', { style: { marginLeft: '6px' } }, 'Prev section')
        )
      )
    );

    this.container.appendChild(widget);
  }
}

// Initialize the widget when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new FlashcardWidget(document.getElementById('app'));
  });
} else {
  new FlashcardWidget(document.getElementById('app'));
}
