const express = require('express');
const ftp = require('basic-ftp');
const cors = require('cors');
const Papa = require('papaparse');
const { Writable } = require('stream');

const app = express();
app.use(cors());
app.use(express.static('.'));

const FTP_CONFIG = {
  host: process.env.FTP_HOST || "ftp.trackmanbaseball.com",
  user: process.env.FTP_USER || "Atlantic League",
  password: process.env.FTP_PASSWORD || "TgvpVe7Eq9",
  secure: false
}

// Team name mapping
const TEAM_NAMES = {
  'YOR': 'York Revolution',
  'LI': 'Long Island Ducks',
  'LAN': 'Lancaster Stormers',
  'STA_YAN': 'Staten Island FerryHawks',
  'LEX_LEG': 'Lexington Legends',
  'WES_POW': 'Charleston Dirty Birds',
  'HP': 'High Point Rockers',
  'GAS': 'Gastonia Ghost Peppers',
  'SMD': 'Southern Maryland Blue Crabs',
  'HAG_FLY': 'Hagerstown Flying Boxcars'
};

function getFullTeamName(abbrev) {
  return TEAM_NAMES[abbrev] || abbrev;
}

function transformPitchDataToTeams(csvData, existingData = {}) {
  const parsed = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true
  });

  const teamsData = { ...existingData };
  const batterMap = new Map();

  Object.entries(teamsData).forEach(([team, batters]) => {
    batters.forEach(batter => {
      const key = `${team}_${batter.batter}`;
      batterMap.set(key, batter);
    });
  });

  parsed.data.forEach(row => {
    if (!row.Batter || !row.BatterTeam || !row.Pitcher) return;

    const teamAbbrev = row.BatterTeam;
    const teamName = getFullTeamName(teamAbbrev);
    const batterName = row.Batter;
    const batterKey = `${teamName}_${batterName}`;

    if (!teamsData[teamName]) {
      teamsData[teamName] = [];
    }

    let batterData = batterMap.get(batterKey);
    
    if (!batterData) {
      batterData = {
        batter: batterName,
        handedness: row.BatterSide === 'Left' ? 'LHB' : 'RHB',
        pitcher: row.Pitcher,
        pitcherThrows: row.PitcherThrows === 'Left' ? 'LHP' : 'RHP',
        context: `${row['Top/Bottom']} ${row.Inning}, ${row.Balls}-${row.Strikes}`,
        battingOrder: row.PAofInning || teamsData[teamName].length + 1,
        pitchZones: [],
        zoneAnalysis: {},
        stats: {
          totalPitches: 0,
          strikes: 0,
          balls: 0,
          swings: 0,
          contact: 0,
          fouls: 0,
          whiffs: 0,
          firstPitchPitches: 0,
          firstPitchSwings: 0,
          weakContact: 0,
          hardContact: 0
        },
        plateAppearances: [],
        atBats: [],
        stolenBases: 0,
        caughtStealing: 0,
        bunts: 0,
        strikeoutSequences: [],
        tendencies: {
          firstStrike: 'Calculating...',
          buntThreat: 'Low',
          stealThreat: 'Low',
          spray: 'All fields'
        },
        powerSequence: 'Calculating...'
      };
      
      batterMap.set(batterKey, batterData);
      teamsData[teamName].push(batterData);
    }

    const paKey = `${row.Inning}_${row.PAofInning}`;
    let currentPA = batterData.plateAppearances.find(pa => pa.key === paKey);
    
    if (!currentPA) {
      currentPA = {
        key: paKey,
        pitches: [],
        result: null,
        isFirstPitch: true
      };
      batterData.plateAppearances.push(currentPA);
    }

    const pitchType = getPitchAbbreviation(row.TaggedPitchType || row.AutoPitchType);
    currentPA.pitches.push({
      type: pitchType,
      call: row.PitchCall,
      count: `${row.Balls}-${row.Strikes}`
    });

    batterData.stats.totalPitches++;
    
    if (currentPA.isFirstPitch) {
      batterData.stats.firstPitchPitches++;
      if (['StrikeSwinging', 'FoulBall', 'FoulBallFieldable', 'FoulBallNotFieldable', 'InPlay'].includes(row.PitchCall)) {
        batterData.stats.firstPitchSwings++;
      }
      currentPA.isFirstPitch = false;
    }
    
    if (['StrikeCalled', 'StrikeSwinging', 'FoulBall', 'FoulBallFieldable', 'FoulBallNotFieldable'].includes(row.PitchCall)) {
      batterData.stats.strikes++;
    }
    if (row.PitchCall === 'BallCalled') {
      batterData.stats.balls++;
    }
    if (['StrikeSwinging', 'FoulBall', 'FoulBallFieldable', 'FoulBallNotFieldable', 'InPlay'].includes(row.PitchCall)) {
      batterData.stats.swings++;
    }
    if (['FoulBall', 'FoulBallFieldable', 'FoulBallNotFieldable', 'InPlay'].includes(row.PitchCall)) {
      batterData.stats.contact++;
    }
    if (['FoulBall', 'FoulBallFieldable', 'FoulBallNotFieldable'].includes(row.PitchCall)) {
      batterData.stats.fouls++;
    }
    if (row.PitchCall === 'StrikeSwinging') {
      batterData.stats.whiffs++;
    }

    if (row.ExitSpeed && row.PitchCall === 'InPlay') {
      if (row.ExitSpeed >= 95) {
        batterData.stats.hardContact++;
      } else if (row.ExitSpeed < 70) {
        batterData.stats.weakContact++;
      }
    }

    if (row.PlayResult) {
      currentPA.result = row.PlayResult;
      
      if (row.PlayResult.includes('StolenBase') || row.KorBB === 'Stolen Base') {
        batterData.stolenBases++;
      }
      if (row.PlayResult.includes('CaughtStealing')) {
        batterData.caughtStealing++;
      }
      
      if (row.PlayResult.includes('Bunt') || row.PitchCall.includes('Bunt')) {
        batterData.bunts++;
      }
      
      if (row.PitchCall === 'InPlay' && row.Angle !== null && row.ExitSpeed) {
        batterData.atBats.push({
          angle: row.Angle,
          distance: row.Distance || 0,
          exitSpeed: row.ExitSpeed,
          result: row.PlayResult
        });
      }
    }

    if (row.KorBB === 'Strikeout' && currentPA.pitches.length >= 2) {
      const lastTwo = currentPA.pitches.slice(-2);
      batterData.strikeoutSequences.push(
        `${lastTwo[0].type} → ${lastTwo[1].type}`
      );
    }

    if (row.PlateLocSide !== null && row.PlateLocHeight !== null) {
      const zone = getZoneFromLocation(row.PlateLocSide, row.PlateLocHeight, batterData.handedness);
      
      if (!batterData.zoneAnalysis[zone]) {
        batterData.zoneAnalysis[zone] = {
          pitches: 0,
          swings: 0,
          whiffs: 0,
          fouls: 0,
          weakContact: 0,
          hardHits: 0,
          contact: 0
        };
      }
      
      const zoneStats = batterData.zoneAnalysis[zone];
      zoneStats.pitches++;
      
      if (['StrikeSwinging', 'FoulBall', 'FoulBallFieldable', 'FoulBallNotFieldable', 'InPlay'].includes(row.PitchCall)) {
        zoneStats.swings++;
      }
      if (row.PitchCall === 'StrikeSwinging') {
        zoneStats.whiffs++;
      }
      if (['FoulBall', 'FoulBallFieldable', 'FoulBallNotFieldable'].includes(row.PitchCall)) {
        zoneStats.fouls++;
      }
      if (['FoulBall', 'FoulBallFieldable', 'FoulBallNotFieldable', 'InPlay'].includes(row.PitchCall)) {
        zoneStats.contact++;
      }
      if (row.ExitSpeed && row.PitchCall === 'InPlay') {
        if (row.ExitSpeed >= 95) {
          zoneStats.hardHits++;
        } else if (row.ExitSpeed < 70) {
          zoneStats.weakContact++;
        }
      }

      const xPos = 50 + (row.PlateLocSide * 25);
      const yPos = 100 - ((row.PlateLocHeight - 1.5) / 2 * 100);
      
      let isGoodPitch = false;
      
      if (row.PitchCall === 'StrikeSwinging') {
        // Whiff = excellent
        isGoodPitch = true;
      } else if (row.PitchCall === 'StrikeCalled') {
        // Called strike = good
        isGoodPitch = true;
      } else if (['FoulBall', 'FoulBallFieldable', 'FoulBallNotFieldable'].includes(row.PitchCall)) {
        // Foul = okay, pitcher avoided damage
        isGoodPitch = true;
      } else if (row.ExitSpeed && row.ExitSpeed < 70) {
        // Weak contact = good
        isGoodPitch = true;
      } else if (row.PitchCall === 'BallCalled') {
        // Ball = bad
        isGoodPitch = false;
      } else if (row.ExitSpeed && row.ExitSpeed >= 95) {
        // Hard contact = bad
        isGoodPitch = false;
      } else if (row.PitchCall === 'InPlay') {
        // In play but not hard hit = neutral to slightly bad
        isGoodPitch = false;
      }

      batterData.pitchZones.push({
        position: [
          Math.max(0, Math.min(100, xPos)),
          Math.max(0, Math.min(100, yPos))
        ],
        pitch: pitchType,
        good: isGoodPitch,
        zone: zone
      });
    }
  });

  Object.values(teamsData).forEach(batters => {
    batters.forEach(batter => {
      if (batter.stats.totalPitches > 0) {
        if (batter.stats.firstPitchPitches > 0) {
          const firstPitchSwingRate = (batter.stats.firstPitchSwings / batter.stats.firstPitchPitches * 100);
          batter.tendencies.firstStrike = firstPitchSwingRate > 50 ? 
            `Aggressive (${firstPitchSwingRate.toFixed(0)}%)` : 
            `Patient (${firstPitchSwingRate.toFixed(0)}%)`;
        }
        
        const stealAttempts = batter.stolenBases + batter.caughtStealing;
        if (stealAttempts >= 3) {
          const successRate = (batter.stolenBases / stealAttempts * 100).toFixed(0);
          batter.tendencies.stealThreat = `High (${batter.stolenBases}/${stealAttempts} - ${successRate}%)`;
        } else if (stealAttempts > 0) {
          batter.tendencies.stealThreat = `Moderate (${batter.stolenBases}/${stealAttempts})`;
        } else {
          batter.tendencies.stealThreat = 'Low';
        }
        
        if (batter.bunts >= 3) {
          batter.tendencies.buntThreat = `High (${batter.bunts} bunts)`;
        } else if (batter.bunts > 0) {
          batter.tendencies.buntThreat = `Moderate (${batter.bunts} bunts)`;
        } else {
          batter.tendencies.buntThreat = 'Low';
        }
        
        if (batter.atBats.length >= 5) {
          const pullCount = batter.atBats.filter(ab => {
            if (batter.handedness === 'LHB') return ab.angle < -15;
            else return ab.angle > 15;
          }).length;
          
          const oppoCount = batter.atBats.filter(ab => {
            if (batter.handedness === 'LHB') return ab.angle > 15;
            else return ab.angle < -15;
          }).length;
          
          const pullPct = (pullCount / batter.atBats.length * 100);
          const oppoPct = (oppoCount / batter.atBats.length * 100);
          
          if (pullPct > 60) {
            batter.tendencies.spray = `Pull hitter (${pullPct.toFixed(0)}%)`;
          } else if (oppoPct > 40) {
            batter.tendencies.spray = `Opposite field (${oppoPct.toFixed(0)}%)`;
          } else {
            batter.tendencies.spray = `All fields (P:${pullPct.toFixed(0)}% O:${oppoPct.toFixed(0)}%)`;
          }
        }
        
        if (batter.strikeoutSequences.length > 0) {
          const sequenceCounts = {};
          batter.strikeoutSequences.forEach(seq => {
            sequenceCounts[seq] = (sequenceCounts[seq] || 0) + 1;
          });
          const mostCommon = Object.entries(sequenceCounts)
            .sort((a, b) => b[1] - a[1])[0];
          batter.powerSequence = `${mostCommon[0]} (${mostCommon[1]}x)`;
        }
      }
    });
  });

  return teamsData;
}

function getZoneFromLocation(plateSide, plateHeight, handedness) {
  const isInside = (handedness === 'LHB' && plateSide > 0.33) || 
                   (handedness === 'RHB' && plateSide < -0.33);
  const isOutside = (handedness === 'LHB' && plateSide < -0.33) || 
                    (handedness === 'RHB' && plateSide > 0.33);
  
  const horizontal = isInside ? 'In' : (isOutside ? 'Out' : 'Mid');
  
  const isHigh = plateHeight > 3.0;
  const isLow = plateHeight < 2.0;
  const vertical = isHigh ? 'High' : (isLow ? 'Low' : 'Mid');
  
  return `${vertical}-${horizontal}`;
}

function getPitchAbbreviation(pitchType) {
  if (!pitchType) return 'F';
  
  const abbrev = {
    'Fastball': 'F',
    'Four-Seam': 'F',
    'TwoSeamFastball': 'F',
    'Sinker': 'S',
    'Cutter': 'C',
    'Slider': 'S',
    'Curveball': 'C',
    'Changeup': 'CH',
    'ChangeUp': 'CH',
    'Splitter': 'CH',
    'Knuckleball': 'CH'
  };
  
  return abbrev[pitchType] || 'F';
}

function getDaysInRange(startDate, endDate) {
  const days = [];
  const current = new Date(startDate);
  const end = new Date(endDate);
  
  while (current <= end) {
    days.push({
      year: current.getFullYear().toString(),
      month: (current.getMonth() + 1).toString().padStart(2, '0'),
      day: current.getDate().toString().padStart(2, '0')
    });
    current.setDate(current.getDate() + 1);
  }
  
  return days;
}

async function downloadFile(client, filename) {
  const chunks = [];
  const writableStream = new Writable({
    write(chunk, encoding, callback) {
      chunks.push(chunk);
      callback();
    }
  });
  
  await client.downloadTo(writableStream, filename);
  return Buffer.concat(chunks).toString('utf-8');
}

app.get('/api/teams/range', async (req, res) => {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  
  try {
    const { startDate, endDate } = req.query; // Format: YYYYMMDD
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate are required' });
    }
    
    console.log(`Fetching data from ${startDate} to ${endDate}`);
    
    const start = new Date(
      startDate.substring(0, 4),
      parseInt(startDate.substring(4, 6)) - 1,
      startDate.substring(6, 8)
    );
    const end = new Date(
      endDate.substring(0, 4),
      parseInt(endDate.substring(4, 6)) - 1,
      endDate.substring(6, 8)
    );
    
    const days = getDaysInRange(start, end);
    let teamsData = {};
    let filesProcessed = 0;
    let filesSkipped = 0;
    
    await client.access(FTP_CONFIG);
    
    for (const day of days) {
      const ftpPath = `v3/${day.year}/${day.month}/${day.day}/CSV`;
      
      try {
        await client.cd('/');
        await client.cd(ftpPath);
        const files = await client.list();
        
        const gameFiles = files.filter(f => 
          f.name.includes('_unverified.csv') && 
          !f.name.includes('playerpositioning')
        );
        
        console.log(`Found ${gameFiles.length} games on ${day.year}-${day.month}-${day.day}`);
        
        for (const file of gameFiles) {
          try {
            console.log(`Processing: ${file.name}`);
            const csvData = await downloadFile(client, file.name);
            teamsData = transformPitchDataToTeams(csvData, teamsData);
            filesProcessed++;
          } catch (fileError) {
            console.error(`Error processing file ${file.name}:`, fileError.message);
            filesSkipped++;
          }
        }
      } catch (dayError) {
        console.log(`No data for ${day.year}-${day.month}-${day.day}`);
        filesSkipped++;
      }
    }
    
    console.log(`Successfully processed ${filesProcessed} files, skipped ${filesSkipped}`);
    
    res.json({
      teamsData,
      metadata: {
        startDate,
        endDate,
        filesProcessed,
        filesSkipped
      }
    });
  } catch (error) {
    console.error('Error fetching range data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch data',
      details: error.message 
    });
  } finally {
    client.close();
  }
});

app.get('/api/game/:date/:stadium', async (req, res) => {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  
  try {
    const { date, stadium } = req.params;
    
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    
    const ftpPath = `v3/${year}/${month}/${day}/CSV`;
    const filename = `${date}-${stadium}_unverified.csv`;
    
    console.log(`Connecting to FTP and navigating to: ${ftpPath}`);
    await client.access(FTP_CONFIG);
    await client.cd(ftpPath);
    
    console.log(`Downloading file: ${filename}`);
    const csvData = await downloadFile(client, filename);
    const teamsData = transformPitchDataToTeams(csvData);
    
    res.json(teamsData);
  } catch (error) {
    console.error('Error fetching game data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch game data',
      details: error.message 
    });
  } finally {
    client.close();
  }
});

app.get('/api/games/range', async (req, res) => {
  const client = new ftp.Client();
  
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate are required' });
    }
    
    const start = new Date(
      startDate.substring(0, 4),
      parseInt(startDate.substring(4, 6)) - 1,
      startDate.substring(6, 8)
    );
    const end = new Date(
      endDate.substring(0, 4),
      parseInt(endDate.substring(4, 6)) - 1,
      endDate.substring(6, 8)
    );
    
    const days = getDaysInRange(start, end);
    const games = [];
    
    await client.access(FTP_CONFIG);
    
    for (const day of days) {
      try {
        await client.cd('/');
        await client.cd(`v3/${day.year}/${day.month}/${day.day}/CSV`);
        const files = await client.list();
        
        const gameFiles = files.filter(f => 
          f.name.includes('_unverified.csv') && 
          !f.name.includes('playerpositioning')
        );
        
        gameFiles.forEach(file => {
          const parts = file.name.replace('_unverified.csv', '').split('-');
          games.push({
            date: parts[0],
            stadium: parts.slice(1).join('-'),
            filename: file.name
          });
        });
      } catch (err) {
      }
    }
    
    res.json({ games });
  } catch (error) {
    console.error('Error listing games:', error);
    res.status(500).json({ 
      error: 'Failed to list games',
      details: error.message 
    });
  } finally {
    client.close();
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:3000/`);
});