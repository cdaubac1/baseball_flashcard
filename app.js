const FLASHCARD_DATA = [
  {
    batter: 'Alex Smith',
    handedness: 'LHB',
    pitcher: 'John Doe',
    pitcherThrows: 'RHP',
    context: 'Top 1st, 0-0',
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
    batter: 'Brian Torres',
    handedness: 'RHB', 
    pitcher: 'John Doe',
    pitcherThrows: 'RHP',
    context: 'Top 1st, 1-1',
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
      firstStrike: 'Swings',
      buntThreat: 'Very Low',
      stealThreat: 'Low',
      spray: 'Gap to gap'
    },
    powerSequence: 'Fastball up → Curve bury'
  }
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

// Main widget class
class FlashcardWidget {
  constructor(container) {
    this.container = container;
    this.index = 0;
    this.setupKeyboardListeners();
    this.render();
  }

  setupKeyboardListeners() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        this.index = Math.min(FLASHCARD_DATA.length - 1, this.index + 1);
        this.render();
      }
      if (e.key === 'ArrowLeft') {
        this.index = Math.max(0, this.index - 1);
        this.render();
      }
    });
  }

  render() {
    const data = FLASHCARD_DATA[this.index];
    this.container.innerHTML = '';
    
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
            className: 'chip',
            onclick: () => {
              this.index = Math.max(0, this.index - 1);
              this.render();
            }
          }, '◀ Prev'),
          createElement('span', { 
            className: 'chip',
            onclick: () => {
              this.index = Math.min(FLASHCARD_DATA.length - 1, this.index + 1);
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