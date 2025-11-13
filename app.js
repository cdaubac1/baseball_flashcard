let TEAMS_DATA = {};
let METADATA = null;

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
      if (typeof child === 'string' || typeof child === 'number') {
        el.appendChild(document.createTextNode(String(child)));
      } else if (child instanceof Node) {
        el.appendChild(child);
      }
    }
  });

  return el;
}

function createPitchZone(zones, handedness) {
  const safeZones = Array.isArray(zones) ? zones : [];
  
  let displayZones = safeZones;
  if (safeZones.length > 10) {
    const step = safeZones.length / 10;
    displayZones = [];
    for (let i = 0; i < 10; i++) {
      const index = Math.floor(i * step);
      displayZones.push(safeZones[index]);
    }
  }
  
  const pitchElements = displayZones.map(zone => {
    const [x, y] = zone.position || [50, 50];
    const pitchType = zone.pitch || 'F';
    
    const isGood = zone.good === true;
    
    const colorClass = isGood ? 'pitch-circle--good' : 'pitch-circle--bad';

    return createElement('div', {
      className: `pitch-circle ${colorClass}`,
      style: { left: `${x}%`, top: `${y}%` },
      title: `${pitchType} — ${isGood ? 'Attack here' : 'Avoid this location'}`
    }, pitchType);
  });

  const isLeftHanded = handedness === 'LHB';
  const batterClass = isLeftHanded ? 'batter-graphic-left-handed' : 'batter-graphic-right-handed';
  const svgPath = isLeftHanded ? './left-hand-batter.svg' : './right-hand-batter.svg';
  
  // Create img element for SVG
  const svgImg = createElement('img', {
    src: svgPath,
    alt: isLeftHanded ? 'Left-Handed Batter' : 'Right-Handed Batter',
    style: { width: '100%', height: '100%', 'object-fit': 'contain' }
  });
  
  // Create batter graphic div with SVG
  const batterGraphic = createElement('div', { 
    className: `batter-graphic ${batterClass}`,
    title: isLeftHanded ? 'Left-Handed Batter' : 'Right-Handed Batter'
  }, svgImg);

  const pitchZone = createElement('div', { className: 'pitch-zone' }, ...pitchElements);
  
  // Order: left-handed on left (order 0), pitch zone in middle (order 1), right-handed on right (order 2)
  return createElement('div', { className: 'pitch-zone-container' },
    batterGraphic,
    pitchZone
  );
}

function createBatterGraphic(handedness, batterName, pitchZones) {
  const isLeftHanded = handedness === 'LHB';
  const totalPitches = Array.isArray(pitchZones) ? pitchZones.length : 0;
  const handText = isLeftHanded ? 'LEFT-HANDED BATTER' : 'RIGHT-HANDED BATTER';

  return createElement('div', { className: 'batter-section' },
    createElement('div', { className: 'handedness-badge' }, handText),
    createElement('div', { className: 'batter-info' },
      createElement('div', { className: 'batter-name' }, batterName || 'Unknown'),
      createElement('div', { className: 'batter-stats' },
        `Total Pitches: ${totalPitches}`)
    )
  );
}

function createTendencies(tendencies, stats, zoneAnalysis, powerSequence) {
  const safeStats = stats || {};
  const swingRate = safeStats.totalPitches > 0
    ? `${(safeStats.swings / safeStats.totalPitches * 100).toFixed(0)}%`
    : 'N/A';

  const contactRate = safeStats.swings > 0
    ? `${(safeStats.contact / safeStats.swings * 100).toFixed(0)}%`
    : 'N/A';

  const whiffRate = safeStats.swings > 0
    ? `${(safeStats.whiffs / safeStats.swings * 100).toFixed(0)}%`
    : 'N/A';

  const firstPitchSwingRate = safeStats.firstPitchPitches > 0
    ? `${(safeStats.firstPitchSwings / safeStats.firstPitchPitches * 100).toFixed(0)}%`
    : 'N/A';

  const vulnerableZones = [];
  const hotZones = [];
  
  if (zoneAnalysis) {
    Object.entries(zoneAnalysis).forEach(([zone, stats]) => {
      if (stats.swings > 3) {
        const whiffPct = (stats.whiffs / stats.swings * 100);
        const weakContactPct = stats.contact > 0 ? (stats.weakContact / stats.contact * 100) : 0;
        const foulPct = (stats.fouls / stats.swings * 100);
        const combinedVulnerability = whiffPct + (weakContactPct * 0.5) + (foulPct * 0.3);
        
        if (combinedVulnerability > 45) {
          vulnerableZones.push({ zone, score: combinedVulnerability.toFixed(0) });
        }
        
        const hardHitPct = stats.contact > 0 ? (stats.hardHits / stats.contact * 100) : 0;
        if (hardHitPct > 40 && stats.hardHits >= 2) {
          hotZones.push({ zone, hardHitPct: hardHitPct.toFixed(0) });
        }
      }
    });
  }

  vulnerableZones.sort((a, b) => b.score - a.score);
  hotZones.sort((a, b) => b.hardHitPct - a.hardHitPct);

  // Extract text from first pitch approach, removing percentages
  let firstPitchText = tendencies?.firstStrike || `Swings ${firstPitchSwingRate} on first pitch`;
  // Remove percentages from first pitch text
  firstPitchText = firstPitchText.replace(/\(\d+%\)/g, '').replace(/\d+%/g, '').trim();
  
  // Extract text from spray, removing percentages
  let sprayText = tendencies?.spray || 'All fields';
  // Remove percentages and percentage patterns from spray text
  sprayText = sprayText.replace(/\s*\([^)]*%[^)]*\)/g, '') // Remove (X%) patterns
    .replace(/P:\d+%\s*O:\d+%[^)]*/g, '') // Remove P:X% O:Y% patterns
    .replace(/\s*\(\d+%\)/g, '') // Remove trailing (X%)
    .trim();

  return createElement('div', { className: 'info-section' },
    createElement('div', { className: 'power-sequence stats-box' },
      createElement('h4', {}, 'First-Pitch Approach'),
      createElement('div', { className: 'power-sequence-text' }, firstPitchText)
    ),

    vulnerableZones.length > 0 ? createElement('div', { className: 'power-sequence vulnerable-zone' },
      createElement('h4', {}, 'Vulnerable Zones'),
      createElement('div', { className: 'power-sequence-text' }, 
        vulnerableZones.slice(0, 2).map(z => z.zone).join(', ') || 'Calculating...')
    ) : null,

    hotZones.length > 0 ? createElement('div', { className: 'power-sequence hot-zone' },
      createElement('h4', {}, 'Hot Zones (Avoid)'),
      createElement('div', { className: 'power-sequence-text' }, 
        hotZones.slice(0, 2).map(z => z.zone).join(', ') || 'None identified')
    ) : null,

    createElement('div', { className: 'power-sequence' },
      createElement('h4', {}, 'Strikeout Sequence'),
      createElement('div', { className: 'power-sequence-text' }, powerSequence || 'Insufficient data')
    ),

    createElement('div', { className: 'power-sequence threat-box' },
      createElement('h4', {}, 'Threats & Tendencies'),
      createElement('div', { className: 'threat-item' },
        createElement('span', { className: 'threat-label' }, 'Steal:'),
        createElement('span', { className: 'threat-value' }, tendencies?.stealThreat || 'Low')
      ),
      createElement('div', { className: 'threat-item' },
        createElement('span', { className: 'threat-label' }, 'Bunt:'),
        createElement('span', { className: 'threat-value' }, tendencies?.buntThreat || 'Low')
      ),
      createElement('div', { className: 'threat-item' },
        createElement('span', { className: 'threat-label' }, 'Spray:'),
        createElement('span', { className: 'threat-value' }, sprayText)
      )
    )
  );
}

class FlashcardApp {
  constructor(container) {
    this.container = container;
    this.currentScreen = 'dateSelect';
    this.selectedTeam = null;
    this.selectedBatterIndex = 0;
    this.showInfoPanel = false;
    this.render();
  }

  toggleInfo() {
    this.showInfoPanel = !this.showInfoPanel;
    this.render();
  }

  async loadDataRange(startDate, endDate) {
    try {
      this.currentScreen = 'loading';
      this.loadingMessage = `Loading data from ${startDate} to ${endDate}...`;
      this.render();

      const response = await fetch(
        `http://localhost:3000/api/teams/range?startDate=${startDate}&endDate=${endDate}`
      );

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const data = await response.json();
      TEAMS_DATA = data.teamsData;
      METADATA = data.metadata;

      this.currentScreen = 'teamSelect';
      this.render();
    } catch (err) {
      console.error(err);
      this.currentScreen = 'error';
      this.error = err.message;
      this.render();
    }
  }

  showDateSelect() { this.currentScreen = 'dateSelect'; this.render(); }
  showTeamSelect() { this.currentScreen = 'teamSelect'; this.selectedTeam = null; this.render(); }
  showLineup(team) { 
    this.currentScreen = 'lineup'; 
    this.selectedTeam = team; 
    this.render(); 
  }
  showFlashcard(index) { this.currentScreen = 'flashcard'; this.selectedBatterIndex = index; this.setupKeyboard(); this.render(); }

  setupKeyboard() {
    if (this.keyHandler) window.removeEventListener('keydown', this.keyHandler);
    this.keyHandler = e => {
      if (this.currentScreen !== 'flashcard') return;
      const lineup = TEAMS_DATA[this.selectedTeam];
      if (e.key === 'ArrowRight') {
        this.selectedBatterIndex = (this.selectedBatterIndex + 1) % lineup.length;
        this.render();
      } else if (e.key === 'ArrowLeft') {
        this.selectedBatterIndex = (this.selectedBatterIndex - 1 + lineup.length) % lineup.length;
        this.render();
      }
    };
    window.addEventListener('keydown', this.keyHandler);
  }

  renderLoading() {
    return createElement('div', { className: 'team-select-screen' },
      createElement('h1', {}, 'Loading...'),
      createElement('p', {}, this.loadingMessage)
    );
  }

  renderError() {
    return createElement('div', { className: 'team-select-screen' },
      createElement('h1', {}, 'Error Loading Data'),
      createElement('p', {}, this.error),
      createElement('button', { className: 'team-btn', onclick: () => this.showDateSelect() }, 'Back')
    );
  }

  renderDateSelect() {
    return createElement('div', { className: 'team-select-screen' },
      createElement('h1', {}, 'Select Date Range'),
      createElement('input', { id: 'startDate', type: 'date', value: '2025-04-25' }),
      createElement('input', { id: 'endDate', type: 'date', value: '2025-04-30' }),
      createElement('button', {
        className: 'team-btn',
        onclick: () => {
          const s = document.getElementById('startDate').value.replace(/-/g, '');
          const e = document.getElementById('endDate').value.replace(/-/g, '');
          this.loadDataRange(s, e);
        }
      }, 'Load Data')
    );
  }

  renderTeamSelect() {
    const teams = Object.keys(TEAMS_DATA);
    if (teams.length === 0) {
      return createElement('div', { className: 'team-select-screen' },
        createElement('p', {}, 'No team data.'),
        createElement('button', { className: 'team-btn', onclick: () => this.showDateSelect() }, 'Back')
      );
    }

    const teamButtons = teams.map(t => {
      const playerCount = TEAMS_DATA[t].length;
      const totalPitches = TEAMS_DATA[t].reduce((sum, b) => sum + (b.stats?.totalPitches || 0), 0);
      
      return createElement('div', { className: 'team-card', onclick: () => this.showLineup(t) },
        createElement('div', { className: 'team-card-name' }, t),
        createElement('div', { className: 'team-card-stats' },
          createElement('div', { className: 'stat-item' },
            createElement('span', { className: 'stat-number' }, playerCount),
            createElement('span', { className: 'stat-label' }, 'Players')
          ),
          createElement('div', { className: 'stat-item' },
            createElement('span', { className: 'stat-number' }, totalPitches),
            createElement('span', { className: 'stat-label' }, 'Pitches')
          )
        )
      );
    });

    return createElement('div', { className: 'team-select-screen' },
      createElement('div', { className: 'team-select-header' },
        createElement('h1', {}, 'Select a Team'),
        createElement('p', {}, `${teams.length} teams available • Date range: ${METADATA?.startDate || 'N/A'} - ${METADATA?.endDate || 'N/A'}`),
        createElement('button', { className: 'back-btn', onclick: () => this.showDateSelect() }, '← Change Dates')
      ),
      createElement('div', { className: 'team-grid' }, ...teamButtons)
    );
  }

  renderLineup() {
    const lineup = TEAMS_DATA[this.selectedTeam];
    
    const cards = lineup.map((batter, i) => {
      return createElement('div', { 
        className: 'mini-card',
        onclick: () => this.showFlashcard(i)
      },
        createElement('div', { className: 'mini-card-order' }, `#${i + 1}`),
        createElement('div', { className: 'mini-card-name' }, batter.batter),
        createElement('div', { className: 'mini-card-hand' }, batter.handedness),
        createElement('div', { className: 'mini-card-pitches' }, `${batter.stats?.totalPitches || 0} pitches`)
      );
    });

    return createElement('div', { className: 'lineup-screen' },
      createElement('div', { className: 'lineup-header' },
        createElement('button', { className: 'back-btn', onclick: () => this.showTeamSelect() }, '← Teams'),
        createElement('h1', {}, `${this.selectedTeam} Lineup`),
        createElement('p', {}, `${lineup.length} batters`)
      ),
      createElement('div', { className: 'lineup-grid' }, ...cards)
    );
  }

  renderFlashcard() {
    const lineup = TEAMS_DATA[this.selectedTeam];
    const data = lineup[this.selectedBatterIndex];

    return createElement('div', { className: 'widget' },
      createElement('div', { className: 'header' },
        createElement('div', { className: 'header__title' },
          createElement('span', { className: 'name' }, data.batter || 'Unknown'),
          createElement('span', { className: 'meta' }, data.handedness || ''),
          createElement('span', { className: 'meta' }, `• ${data.stats?.totalPitches || 0} pitches`),
          createElement('button', { 
            className: 'info-btn',
            onclick: () => this.toggleInfo()
          }, '?')
        ),
        createElement('div', { className: 'header__controls' },
          createElement('span', { className: 'chip back-chip', onclick: () => this.showLineup(this.selectedTeam) }, '← Lineup'),
          createElement('span', { className: 'chip', onclick: () => { 
            this.selectedBatterIndex = (this.selectedBatterIndex - 1 + lineup.length) % lineup.length;
            this.render(); 
          } }, '◀ Prev'),
          createElement('span', { className: 'chip', onclick: () => { 
            this.selectedBatterIndex = (this.selectedBatterIndex + 1) % lineup.length;
            this.render(); 
          } }, 'Next ▶')
        )
      ),
      this.showInfoPanel ? createElement('div', { className: 'info-overlay', onclick: () => this.toggleInfo() },
        createElement('div', { className: 'info-modal', onclick: (e) => e.stopPropagation() },
          createElement('h3', {}, 'Understanding this Widget'),
          createElement('div', { className: 'info-content' },
            createElement('p', {}, createElement('strong', {}, 'Strike Zone:'), ' Green circles = attack these locations (whiffs, weak contact). Red circles = avoid (hard contact, balls). Letters show pitch type: F (Fastball), S (Sinker/Slider), C (Cutter/Curve), CH (Changeup). The batter icon shows their batting stance.'),
            createElement('p', {}, createElement('strong', {}, 'Vulnerable Zones:'), ' Where batter struggles most. High whiff rates, weak contact, or lots of fouls. Attack here!'),
            createElement('p', {}, createElement('strong', {}, 'Hot Zones:'), ' Danger zones where batter hits hard (95+ mph exit velo). Avoid pitching here.'),
            createElement('p', {}, createElement('strong', {}, 'Strikeout Sequence:'), ' Most common 2-pitch combo that gets strikeouts against this batter.'),
            createElement('p', {}, createElement('strong', {}, 'Threats:'), ' Steal threat (base running), bunt threat, and spray chart tendency (pull/opposite field).'),
            createElement('p', {}, createElement('strong', {}, 'First-Pitch:'), ' Shows if batter is aggressive (>50% swing rate) or patient on first pitch.')
          ),
          createElement('button', { className: 'close-info-btn', onclick: () => this.toggleInfo() }, 'Close')
        )
      ) : null,
      createElement('div', { className: 'pitch-zone-section' }, createPitchZone(data.pitchZones || [], data.handedness)),
      createBatterGraphic(data.handedness, data.batter, data.pitchZones),
      createTendencies(data.tendencies, data.stats, data.zoneAnalysis, data.powerSequence)
    );
  }

  render() {
    this.container.innerHTML = '';
    let content;
    if (this.currentScreen === 'loading') content = this.renderLoading();
    else if (this.currentScreen === 'error') content = this.renderError();
    else if (this.currentScreen === 'dateSelect') content = this.renderDateSelect();
    else if (this.currentScreen === 'teamSelect') content = this.renderTeamSelect();
    else if (this.currentScreen === 'lineup') content = this.renderLineup();
    else if (this.currentScreen === 'flashcard') content = this.renderFlashcard();
    this.container.appendChild(content);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new FlashcardApp(document.getElementById('app')));
} else {
  new FlashcardApp(document.getElementById('app'));
}