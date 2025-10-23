const TEAMS_DATA = {
  'Long Island Ducks': [
    {
      batter: 'Chris Roller',
      handedness: 'RHB',
      pitcher: 'Tim Melville',
      pitcherThrows: 'RHP',
      context: 'Top 1st, 0-0',
      battingOrder: 1,
      pitchZones: [
        { position: [15, 80], type: 'good', pitch: 'C' },
        { position: [85, 25], type: 'good', pitch: 'S' },
        { position: [85, 15], type: 'good', pitch: 'F' },
        { position: [85, 85], type: 'good', pitch: 'C' },
        { position: [15, 25], type: 'good', pitch: 'CH' },
        { position: [50, 50], type: 'bad', pitch: 'F' },
        { position: [35, 65], type: 'bad', pitch: 'F' },
      ],
      tendencies: {
        firstStrike: 'Takes',
        buntThreat: 'Low',
        stealThreat: 'Medium',
        spray: 'Pull hitter'
      },
      powerSequence: 'Slider away → Changeup down'
    },
    {
      batter: 'River Town',
      handedness: 'LHB',
      pitcher: 'Tim Melville',
      pitcherThrows: 'RHP',
      context: 'Top 1st, 0-1',
      battingOrder: 2,
      pitchZones: [
        { position: [20, 75], type: 'good', pitch: 'C' },
        { position: [80, 20], type: 'good', pitch: 'F' },
        { position: [80, 80], type: 'good', pitch: 'S' },
        { position: [20, 20], type: 'good', pitch: 'C' },
        { position: [65, 50], type: 'good', pitch: 'S' },
        { position: [50, 50], type: 'bad', pitch: 'F' },
        { position: [35, 35], type: 'bad', pitch: 'F' },
        { position: [65, 75], type: 'bad', pitch: 'F' },
      ],
      tendencies: {
        firstStrike: 'Takes',
        buntThreat: 'Very Low',
        stealThreat: 'Low',
        spray: 'All fields'
      },
      powerSequence: 'Fastball up → Curve bury'
    },
    {
      batter: 'Ronaldo FLores',
      handedness: 'LHB',
      pitcher: 'Tim Melville',
      pitcherThrows: 'RHP',
      context: 'Top 1st, 0-2',
      battingOrder: 3,
      pitchZones: [
        { position: [25, 70], type: 'good', pitch: 'S' },
        { position: [75, 30], type: 'good', pitch: 'F' },
        { position: [50, 50], type: 'bad', pitch: 'F' },
      ],
      tendencies: {
        firstStrike: 'Swings',
        buntThreat: 'Low',
        stealThreat: 'Low',
        spray: 'Pull hitter'
      },
      powerSequence: 'Slider down → Fastball in'
    },
    {
      batter: 'Nate Scantlin',
      handedness: 'RHB',
      pitcher: 'Tim Melville',
      pitcherThrows: 'RHP',
      context: 'Top 2nd, 0-0',
      battingOrder: 4,
      pitchZones: [
        { position: [15, 15], type: 'good', pitch: 'S' },
        { position: [85, 85], type: 'good', pitch: 'C' },
        { position: [50, 50], type: 'bad', pitch: 'F' },
      ],
      tendencies: {
        firstStrike: 'Swings',
        buntThreat: 'Very Low',
        stealThreat: 'Very Low',
        spray: 'Pull hitter'
      },
      powerSequence: 'Changeup low → Fastball up'
    },
    {
      batter: 'Justin Wylie',
      handedness: 'RHB',
      pitcher: 'Tim Melville',
      pitcherThrows: 'RHP',
      context: 'Top 2nd, 1-0',
      battingOrder: 5,
      pitchZones: [
        { position: [30, 60], type: 'good', pitch: 'C' },
        { position: [70, 40], type: 'good', pitch: 'S' },
        { position: [50, 50], type: 'bad', pitch: 'F' },
      ],
      tendencies: {
        firstStrike: 'Swings',
        buntThreat: 'Low',
        stealThreat: 'Medium',
        spray: 'Gap to gap'
      },
      powerSequence: 'Fastball away → Slider down'
    },
    {
      batter: 'Cole Roederer',
      handedness: 'RHB',
      pitcher: 'Tim Melville',
      pitcherThrows: 'RHP',
      context: 'Top 2nd, 2-0',
      battingOrder: 6,
      pitchZones: [
        { position: [20, 80], type: 'good', pitch: 'C' },
        { position: [80, 20], type: 'good', pitch: 'S' },
        { position: [50, 50], type: 'bad', pitch: 'F' },
      ],
      tendencies: {
        firstStrike: 'Takes',
        buntThreat: 'Medium',
        stealThreat: 'High',
        spray: 'All fields'
      },
      powerSequence: 'Slider away → Changeup down'
    },
    {
      batter: 'Carter Aldrete',
      handedness: 'RHB',
      pitcher: 'Tim Melville',
      pitcherThrows: 'RHP',
      context: 'Top 3rd, 0-0',
      battingOrder: 7,
      pitchZones: [
        { position: [35, 65], type: 'good', pitch: 'C' },
        { position: [65, 35], type: 'good', pitch: 'S' },
        { position: [50, 50], type: 'bad', pitch: 'F' },
      ],
      tendencies: {
        firstStrike: 'Swings',
        buntThreat: 'Low',
        stealThreat: 'Low',
        spray: 'All fields'
      },
      powerSequence: 'Fastball in → Slider away'
    },
    {
      batter: 'Carter Aldrete',
      handedness: 'RHB',
      pitcher: 'Tim Melville',
      pitcherThrows: 'RHP',
      context: 'Top 3rd, 1-0',
      battingOrder: 8,
      pitchZones: [
        { position: [25, 75], type: 'good', pitch: 'C' },
        { position: [75, 25], type: 'good', pitch: 'S' },
        { position: [50, 50], type: 'bad', pitch: 'F' },
      ],
      tendencies: {
        firstStrike: 'Takes',
        buntThreat: 'Low',
        stealThreat: 'Low',
        spray: 'Gap to gap'
      },
      powerSequence: 'Changeup down → Fastball up'
    },
    {
      batter: 'Dalton Guthrie',
      handedness: 'RHB',
      pitcher: 'Tim Melville',
      pitcherThrows: 'RHP',
      context: 'Top 3rd, 2-0',
      battingOrder: 9,
      pitchZones: [
        { position: [40, 60], type: 'good', pitch: 'C' },
        { position: [60, 40], type: 'good', pitch: 'S' },
        { position: [50, 50], type: 'bad', pitch: 'F' },
      ],
      tendencies: {
        firstStrike: 'Swings',
        buntThreat: 'Low',
        stealThreat: 'High',
        spray: 'Pull hitter'
      },
      powerSequence: 'Slider down → Fastball in'
    }
  ],
  'Gastonia Ghost Peppers': [
    {
      batter: 'Dalton Guthrie',
      handedness: 'LHB',
      pitcher: 'Tim Melville',
      pitcherThrows: 'RHP',
      context: 'Top 1st, 0-0',
      battingOrder: 1,
      pitchZones: [
        { position: [20, 70], type: 'good', pitch: 'S' },
        { position: [80, 30], type: 'good', pitch: 'C' },
        { position: [50, 50], type: 'bad', pitch: 'F' },
      ],
      tendencies: {
        firstStrike: 'Swings',
        buntThreat: 'Very Low',
        stealThreat: 'Low',
        spray: 'Pull hitter'
      },
      powerSequence: 'Fastball up → Slider away'
    },
    {
      batter: 'Aaron Antonini',
      handedness: 'RHB',
      pitcher: 'Tim Melville',
      pitcherThrows: 'RHP',
      context: 'Top 1st, 0-1',
      battingOrder: 2,
      pitchZones: [
        { position: [25, 75], type: 'good', pitch: 'C' },
        { position: [75, 25], type: 'good', pitch: 'S' },
        { position: [50, 50], type: 'bad', pitch: 'F' },
      ],
      tendencies: {
        firstStrike: 'Swings',
        buntThreat: 'Low',
        stealThreat: 'Medium',
        spray: 'All fields'
      },
      powerSequence: 'Changeup down → Fastball in'
    },
    {
      batter: 'Taylor Kohlwey',
      handedness: 'RHB',
      pitcher: 'Tim Melville',
      pitcherThrows: 'RHP',
      context: 'Top 1st, 1-1',
      battingOrder: 3,
      pitchZones: [
        { position: [30, 70], type: 'good', pitch: 'S' },
        { position: [70, 30], type: 'good', pitch: 'C' },
        { position: [50, 50], type: 'bad', pitch: 'F' },
      ],
      tendencies: {
        firstStrike: 'Takes',
        buntThreat: 'Low',
        stealThreat: 'Low',
        spray: 'Opposite field'
      },
      powerSequence: 'Slider away → Fastball up'
    },
    {
      batter: 'Cody Thomas',
      handedness: 'LHB',
      pitcher: 'Tim Melville',
      pitcherThrows: 'RHP',
      context: 'Top 2nd, 0-0',
      battingOrder: 4,
      pitchZones: [
        { position: [20, 80], type: 'good', pitch: 'C' },
        { position: [80, 20], type: 'good', pitch: 'S' },
        { position: [50, 50], type: 'bad', pitch: 'F' },
      ],
      tendencies: {
        firstStrike: 'Takes',
        buntThreat: 'Low',
        stealThreat: 'Low',
        spray: 'All fields'
      },
      powerSequence: 'Fastball in → Changeup away'
    },
    {
      batter: 'Troy Viola',
      handedness: 'LHB',
      pitcher: 'Tim Melville',
      pitcherThrows: 'RHP',
      context: 'Top 2nd, 0-1',
      battingOrder: 5,
      pitchZones: [
        { position: [15, 85], type: 'good', pitch: 'S' },
        { position: [85, 15], type: 'good', pitch: 'C' },
        { position: [50, 50], type: 'bad', pitch: 'F' },
      ],
      tendencies: {
        firstStrike: 'Swings',
        buntThreat: 'Medium',
        stealThreat: 'High',
        spray: 'Gap to gap'
      },
      powerSequence: 'Slider down → Fastball up'
    },
    {
      batter: 'Eric De La Rosa',
      handedness: 'RHB',
      pitcher: 'Tim Melville',
      pitcherThrows: 'RHP',
      context: 'Top 2nd, 1-1',
      battingOrder: 6,
      pitchZones: [
        { position: [35, 65], type: 'good', pitch: 'C' },
        { position: [65, 35], type: 'good', pitch: 'S' },
        { position: [50, 50], type: 'bad', pitch: 'F' },
      ],
      tendencies: {
        firstStrike: 'Swings',
        buntThreat: 'Low',
        stealThreat: 'Medium',
        spray: 'All fields'
      },
      powerSequence: 'Changeup away → Fastball in'
    },
    {
      batter: 'Narciso Crook',
      handedness: 'RHB',
      pitcher: 'Tim Melville',
      pitcherThrows: 'RHP',
      context: 'Top 3rd, 0-0',
      battingOrder: 7,
      pitchZones: [
        { position: [25, 75], type: 'good', pitch: 'S' },
        { position: [75, 25], type: 'good', pitch: 'C' },
        { position: [50, 50], type: 'bad', pitch: 'F' },
      ],
      tendencies: {
        firstStrike: 'Takes',
        buntThreat: 'Low',
        stealThreat: 'Low',
        spray: 'Pull hitter'
      },
      powerSequence: 'Slider down → Fastball up'
    },
    {
      batter: 'Jack Reinheimer',
      handedness: 'RHB',
      pitcher: 'Tim Melville',
      pitcherThrows: 'RHP',
      context: 'Top 3rd, 0-1',
      battingOrder: 8,
      pitchZones: [
        { position: [40, 60], type: 'good', pitch: 'C' },
        { position: [60, 40], type: 'good', pitch: 'S' },
        { position: [50, 50], type: 'bad', pitch: 'F' },
      ],
      tendencies: {
        firstStrike: 'Swings',
        buntThreat: 'Medium',
        stealThreat: 'High',
        spray: 'All fields'
      },
      powerSequence: 'Fastball away → Slider in'
    },
    {
      batter: 'Kole Kaler',
      handedness: 'LHB',
      pitcher: 'Tim Melville',
      pitcherThrows: 'RHP',
      context: 'Top 3rd, 1-1',
      battingOrder: 9,
      pitchZones: [
        { position: [30, 70], type: 'good', pitch: 'S' },
        { position: [70, 30], type: 'good', pitch: 'C' },
        { position: [50, 50], type: 'bad', pitch: 'F' },
      ],
      tendencies: {
        firstStrike: 'Takes',
        buntThreat: 'High',
        stealThreat: 'High',
        spray: 'Gap to gap'
      },
      powerSequence: 'Changeup down → Fastball up'
    }
  ]
};

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

function createPitchZone(zones) {
  return createElement('div', { className: 'pitch-zone' },
    zones.map((zone, i) => {
      const [x, y] = zone.position || [50, 50];
      return createElement('div', {
        className: `pitch-circle pitch-circle--${zone.type}`,
        style: { left: `${x}%`, top: `${y}%` }
      }, zone.pitch);
    })
  );
}

function createBatterGraphic(handedness, batterName) {
  const isLeftHanded = handedness === 'LHB';
  return createElement('div', { className: 'batter-section' },
    createElement('div', { 
      className: 'batter-graphic',
      style: { transform: isLeftHanded ? 'scaleX(-1)' : 'none' }
    }),
    createElement('div', { className: 'batter-info' },
      createElement('div', { className: 'batter-name' }, batterName),
      createElement('div', { className: 'batter-details' }, 
        `${handedness} • ${isLeftHanded ? 'Left-handed' : 'Right-handed'} Batter`)
    )
  );
}

function createTendencies(tendencies, powerSequence) {
  return createElement('div', { className: 'info-section' },
    createElement('div', { className: 'tendencies' },
      createElement('h3', {}, 'Batter Tendencies'),
      createElement('div', { className: 'tendency-item' },
        createElement('span', { className: 'tendency-label' }, 'First Strike'),
        createElement('span', { className: 'tendency-value' }, tendencies.firstStrike)
      ),
      createElement('div', { className: 'tendency-item' },
        createElement('span', { className: 'tendency-label' }, 'Bunt Threat'),
        createElement('span', { className: 'tendency-value' }, tendencies.buntThreat)
      ),
      createElement('div', { className: 'tendency-item' },
        createElement('span', { className: 'tendency-label' }, 'Steal Threat'),
        createElement('span', { className: 'tendency-value' }, tendencies.stealThreat)
      ),
      createElement('div', { className: 'tendency-item' },
        createElement('span', { className: 'tendency-label' }, 'Spray'),
        createElement('span', { className: 'tendency-value' }, tendencies.spray)
      )
    ),
    createElement('div', { className: 'power-sequence' },
      createElement('h4', {}, 'Two Pitch Combo'),
      createElement('div', { className: 'power-sequence-text' }, powerSequence)
    )
  );
}

class FlashcardApp {
  constructor(container) {
    this.container = container;
    this.currentScreen = 'teamSelect'; // 'teamSelect', 'lineup', 'flashcard'
    this.selectedTeam = null;
    this.selectedBatterIndex = 0;
    this.render();
  }

  showTeamSelect() {
    this.currentScreen = 'teamSelect';
    this.selectedTeam = null;
    this.render();
  }

  showLineup(team) {
    this.currentScreen = 'lineup';
    this.selectedTeam = team;
    this.render();
  }

  showFlashcard(batterIndex) {
    this.currentScreen = 'flashcard';
    this.selectedBatterIndex = batterIndex;
    this.setupKeyboardListeners();
    this.render();
  }

  setupKeyboardListeners() {
    if (this.keyboardHandler) {
      window.removeEventListener('keydown', this.keyboardHandler);
    }
    
    this.keyboardHandler = (e) => {
      if (this.currentScreen !== 'flashcard') return;
      
      const lineup = TEAMS_DATA[this.selectedTeam];
      if (e.key === 'ArrowRight') {
        this.selectedBatterIndex = Math.min(lineup.length - 1, this.selectedBatterIndex + 1);
        this.render();
      }
      if (e.key === 'ArrowLeft') {
        this.selectedBatterIndex = Math.max(0, this.selectedBatterIndex - 1);
        this.render();
      }
    };
    
    window.addEventListener('keydown', this.keyboardHandler);
  }

  renderTeamSelect() {
    return createElement('div', { className: 'team-select-screen' },
      createElement('h1', {}, 'Select a Team'),
      createElement('p', {}, 'Choose a team to view their batting lineup'),
      createElement('div', { className: 'team-buttons' },
        Object.keys(TEAMS_DATA).map(team =>
          createElement('button', {
            className: 'team-btn',
            onclick: () => this.showLineup(team)
          }, team)
        )
      )
    );
  }

  renderLineup() {
    const lineup = TEAMS_DATA[this.selectedTeam];
    
    return createElement('div', { className: 'lineup-screen' },
      createElement('button', {
        className: 'back-btn',
        onclick: () => this.showTeamSelect()
      }, '← Back to Teams'),
      createElement('div', { className: 'lineup-header' },
        createElement('h1', {}, `${this.selectedTeam} Batting Lineup`),
        createElement('p', {}, 'Click on any batter to view detailed scouting report')
      ),
      createElement('div', { className: 'lineup-grid' },
        lineup.map((batter, index) =>
          createElement('div', {
            className: 'mini-card',
            onclick: () => this.showFlashcard(index)
          },
            createElement('div', { className: 'mini-card-order' }, `#${batter.battingOrder}`),
            createElement('div', { className: 'mini-card-name' }, batter.batter),
            createElement('div', { className: 'mini-card-hand' }, batter.handedness)
          )
        )
      )
    );
  }

  renderFlashcard() {
    const lineup = TEAMS_DATA[this.selectedTeam];
    const data = lineup[this.selectedBatterIndex];
    
    const widget = createElement('div', { className: 'widget' },
      createElement('div', { className: 'header' },
        createElement('div', { className: 'header__title' },
          createElement('span', { className: 'name' }, data.batter),
          createElement('span', { className: 'meta' }, 'vs'),
          createElement('span', { className: 'name', style: { color: 'var(--accent)' } }, data.pitcher),
          createElement('span', { className: 'meta' }, `• ${data.context}`)
        ),
        createElement('div', { className: 'header__controls' },
          createElement('span', { 
            className: 'chip back-chip',
            onclick: () => this.showLineup(this.selectedTeam)
          }, '← Lineup'),
          createElement('span', { 
            className: 'chip',
            onclick: () => {
              this.selectedBatterIndex = Math.max(0, this.selectedBatterIndex - 1);
              this.render();
            }
          }, '◀ Prev'),
          createElement('span', { 
            className: 'chip',
            onclick: () => {
              this.selectedBatterIndex = Math.min(lineup.length - 1, this.selectedBatterIndex + 1);
              this.render();
            }
          }, 'Next ▶')
        )
      ),
      createElement('div', { className: 'pitch-zone-section' },
        createPitchZone(data.pitchZones),
        createBatterGraphic(data.handedness, data.batter)
      ),
      createTendencies(data.tendencies, data.powerSequence)
    );

    return widget;
  }

  render() {
    this.container.innerHTML = '';
    
    let content;
    if (this.currentScreen === 'teamSelect') {
      content = this.renderTeamSelect();
    } else if (this.currentScreen === 'lineup') {
      content = this.renderLineup();
    } else if (this.currentScreen === 'flashcard') {
      content = this.renderFlashcard();
    }
    
    this.container.appendChild(content);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new FlashcardApp(document.getElementById('app'));
  });
} else {
  new FlashcardApp(document.getElementById('app'));
}