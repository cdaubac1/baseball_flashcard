const axios = require('axios');

async function testServerData() {
  console.log('='.repeat(80));
  console.log('TESTING SERVER TENDENCIES DATA');
  console.log('='.repeat(80));
  
  try {
    const response = await axios.get('http://localhost:3000/api/teams/range', {
      params: {
        startDate: '20240517',
        endDate: '20240519'
      }
    });
    
    if (response.data && response.data.teamsData) {
      console.log('\n✅ Got data from server\n');
      
      // Look at first team, first few batters
      const teams = Object.keys(response.data.teamsData);
      console.log(`Found ${teams.length} teams: ${teams.join(', ')}\n`);
      
      teams.slice(0, 2).forEach(teamName => {
        const batters = response.data.teamsData[teamName];
        console.log(`\n${'='.repeat(80)}`);
        console.log(`TEAM: ${teamName} (${batters.length} batters)`);
        console.log('='.repeat(80));
        
        batters.slice(0, 3).forEach((batter, i) => {
          console.log(`\n${i + 1}. ${batter.batter} (${batter.handedness})`);
          console.log(`   Pitcher: ${batter.pitcher} (${batter.pitcherThrows})`);
          console.log(`   Context: ${batter.context}`);
          console.log(`   Total Pitches: ${batter.stats.totalPitches}`);
          console.log(`   Plate Appearances: ${batter.plateAppearances.length}`);
          console.log(`   At Bats: ${batter.atBats.length}`);
          
          console.log(`\n   📊 TENDENCIES:`);
          console.log(`      First Strike: ${batter.tendencies.firstStrike}`);
          console.log(`      Steal Threat: ${batter.tendencies.stealThreat}`);
          console.log(`      Bunt Threat: ${batter.tendencies.buntThreat}`);
          console.log(`      Spray: ${batter.tendencies.spray}`);
          
          console.log(`\n   📈 STATS:`);
          console.log(`      Swings: ${batter.stats.swings}`);
          console.log(`      Contact: ${batter.stats.contact}`);
          console.log(`      Weak Contact: ${batter.stats.weakContact}`);
          console.log(`      Hard Contact: ${batter.stats.hardContact}`);
          console.log(`      Whiffs: ${batter.stats.whiffs}`);
          
          if (batter.atBats.length > 0) {
            console.log(`\n   🏏 AT BATS:`);
            batter.atBats.forEach((ab, j) => {
              console.log(`      ${j + 1}. ${ab.exitSpeed?.toFixed(1) || 'N/A'} mph, ${ab.angle?.toFixed(1) || 'N/A'}°, ${ab.distance?.toFixed(0) || 'N/A'} ft → ${ab.result}`);
            });
          }
        });
      });
      
      console.log('\n' + '='.repeat(80));
      console.log('✅ TEST COMPLETE');
      console.log('='.repeat(80));
      console.log('\nIf tendencies show "Low" for everything, the server logic is working');
      console.log('but players may not have enough data to trigger higher threat levels.\n');
      console.log('If tendencies show proper details, then the frontend display is the issue.\n');
      
    } else {
      console.log('❌ No data returned from server');
    }
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testServerData().catch(console.error);