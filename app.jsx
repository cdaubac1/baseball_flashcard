function Section({ title, children, right }) {
  return (
    <div className="widget__section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <h3>{title}</h3>
        {right}
      </div>
      {children}
    </div>
  );
}

// Sample dataset representing a few upcoming batters and game contexts
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

function Header({ pitcherName = 'Pitcher', batterName = 'Batter', context = 'Top 1st, 0-0', onPrev, onNext }) {
  return (
    <div className="header">
      <div className="header__title">
        <span className="name">{batterName}</span>
        <span className="meta">vs</span>
        <span className="name" style={{ color: 'var(--accent)' }}>{pitcherName}</span>
        <span className="meta">• {context}</span>
      </div>
      <div className="header__controls">
        <span className="chip" title="Previous batter" onClick={onPrev} role="button">◀ Prev</span>
        <span className="chip" title="Next batter" onClick={onNext} role="button">Next ▶</span>
      </div>
    </div>
  );
}

function FlashcardWidget() {
  // Placeholder state (to be wired to real data)
  const [index, setIndex] = React.useState(0);
  const [section, setSection] = React.useState(0);

  React.useEffect(() => {
    function handler(e) {
      if (e.key === 'ArrowRight') setIndex((v) => Math.min(SAMPLE_FLASHCARDS.length - 1, v + 1));
      if (e.key === 'ArrowLeft') setIndex((v) => Math.max(0, v - 1));
      if (e.key === 'ArrowUp') setSection((s) => (s + 1) % 3);
      if (e.key === 'ArrowDown') setSection((s) => (s + 2) % 3);
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const card = SAMPLE_FLASHCARDS[index] ?? SAMPLE_FLASHCARDS[0];
  const { playerRoleInfo: pri, gameContext: gc, pitchAndOutcomeStats: pos, derivedPatterns: dp } = card;
  const headerContext = `${gc.half} ${gc.inning}, ${gc.balls}-${gc.strikes}, ${gc.outs} out${gc.outs === 1 ? '' : 's'}`;

  return (
    <div className="widget" aria-label="Pitcher Flashcard Widget">
      <Header
        pitcherName={`${pri.pitcher} • ${pri.pitcherThrows}`}
        batterName={`${pri.batter} • ${pri.batterSide}`}
        context={headerContext}
        onPrev={() => setIndex((v) => Math.max(0, v - 1))}
        onNext={() => setIndex((v) => Math.min(SAMPLE_FLASHCARDS.length - 1, v + 1))}
      />

      <div className="widget__grid">
        <Section
          title="Players & Roles"
          right={<span className="chip">Roster</span>}
        >
          <div className="kv">
            <div className="k">Pitcher</div><div className="v">{pri.pitcher} • {pri.pitcherThrows} • {pri.pitcherTeam}</div>
            <div className="k">Batter</div><div className="v">{pri.batter} • {pri.batterSide} • {pri.batterTeam}</div>
            <div className="k">Catcher</div><div className="v">{pri.catcher} • {pri.catcherThrows} • {pri.catcherTeam}</div>
          </div>
        </Section>

        <Section
          title="Game Context"
          right={<span className="chip chip--warn">Situational</span>}
        >
          <div className="kv">
            <div className="k">Inning</div><div className="v">{gc.half} {gc.inning}</div>
            <div className="k">Count</div><div className="v">{gc.balls}-{gc.strikes} • {gc.outs} out{gc.outs === 1 ? '' : 's'}</div>
            <div className="k">Stadium</div><div className="v">{gc.stadium}</div>
            <div className="k">Date</div><div className="v">{gc.date} • {gc.time}</div>
            <div className="k">Matchup</div><div className="v">{gc.awayTeam} @ {gc.homeTeam}</div>
            <div className="k">League/Level</div><div className="v">{gc.league} / {gc.level}</div>
          </div>
        </Section>

        <Section
          title="Recommended Pitches"
          right={<span className="chip chip--good">Go-To</span>}
        >
          <div className="list">
            {dp.optimalPitches.map((p, i) => (
              <div className="list__item" key={i}><span>{i + 1}) {p.situation}</span><span>{p.call}</span></div>
            ))}
          </div>
        </Section>

        <Section title="Zone Outcomes">
          <div className="zones">
            {[1,2,3,4,5,6,7,8,9].map((z) => {
              const stats = dp.zoneOutcomes[z] || { whiff: 0, weak: 0, hev: 0 };
              return (
                <div className="zone" key={z}>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>Zone {z}</div>
                  <div style={{ fontWeight: 700 }}>Whiff {(stats.whiff * 100).toFixed(0)}%</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>Weak {(stats.weak * 100).toFixed(0)}% • EV {(stats.hev * 100).toFixed(0)}%</div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Tendencies">
          <div className="list">
            <div className="list__item"><span>1st pitch swing</span><span>{dp.firstPitchSwing}</span></div>
            <div className="list__item"><span>Pull vs oppo</span><span>{dp.sprayTendency}</span></div>
            <div className="list__item"><span>Steal/Bunt</span><span>{dp.stealOrBuntThreat}</span></div>
            {dp.twoPitchSequencesToK.map((seq, i) => (
              <div className="list__item" key={i}><span>To K seq {i + 1}</span><span>{seq}</span></div>
            ))}
          </div>
        </Section>

        <Section title="Outcomes & Notes" right={<span className="chip">Coach</span>}>
          <div className="list">
            <div className="list__item"><span>KorBB</span><span>{(pos.korBB.kRate * 100).toFixed(0)}% K • {(pos.korBB.bbRate * 100).toFixed(0)}% BB</span></div>
            <div className="list__item"><span>PlayResult</span><span>{pos.playResult}</span></div>
            <div className="list__item"><span>Notes</span><span>{pos.notes}</span></div>
          </div>
        </Section>
      </div>

      <div className="footer">
        <div>
          <span className="kbd">←</span>
          <span style={{ margin: '0 6px' }}>Prev</span>
          <span className="kbd">→</span>
          <span style={{ marginLeft: 6 }}>Next</span>
        </div>
        <div>
          <span className="kbd">↑</span>
          <span style={{ margin: '0 6px' }}>Next section</span>
          <span className="kbd">↓</span>
          <span style={{ marginLeft: 6 }}>Prev section</span>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<FlashcardWidget />);


