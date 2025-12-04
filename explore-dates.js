const axios = require('axios');

const API_KEY = 'ojgvHrY7Pu4qoE4GDsmxJ1TPZnYa9qwfL9fnI072';
const BASE_URL = 'https://1ywv9dczq5.execute-api.us-east-2.amazonaws.com/ALPBAPI';

async function analyzePitchTypes() {
  console.log('='.repeat(80));
  console.log('ANALYZING PITCH TYPES IN API DATA');
  console.log('='.repeat(80));
  
  const datesToTry = ['2024-05-19', '2024-05-17', '2024-06-01', '2024-05-10'];
  let response = null;
  let dateUsed = null;
  
  for (const date of datesToTry) {
    try {
      console.log(`\nTrying date: ${date}...`);
      response = await axios.get(`${BASE_URL}/pitches`, {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json'
        },
        params: {
          date: date,
          limit: 1000
        }
      });
      if (response.data && response.data.success) {
        dateUsed = date;
        console.log(`✅ Got data from ${date}`);
        break;
      }
    } catch (error) {
      console.log(`❌ ${date} failed: ${error.message}`);
    }
  }
  
  if (!response || !dateUsed) {
    console.log('\n❌ Could not get data from any date. API may be having issues.\n');
    return;
  }
  
  try {
    
    if (response.data && response.data.success && response.data.data) {
      const pitches = response.data.data;
      console.log(`\n✅ Analyzed ${pitches.length} pitches from ${dateUsed}\n`);
      
      // Count tagged_pitch_type values
      const taggedTypes = {};
      const autoTypes = {};
      
      pitches.forEach(pitch => {
        const tagged = pitch.tagged_pitch_type || 'null';
        const auto = pitch.auto_pitch_type || 'null';
        
        taggedTypes[tagged] = (taggedTypes[tagged] || 0) + 1;
        autoTypes[auto] = (autoTypes[auto] || 0) + 1;
      });
      
      console.log('📊 TAGGED PITCH TYPES (tagged_pitch_type field):');
      console.log('-'.repeat(80));
      Object.entries(taggedTypes)
        .sort((a, b) => b[1] - a[1])
        .forEach(([type, count]) => {
          const pct = (count / pitches.length * 100).toFixed(1);
          console.log(`  ${type.padEnd(20)} ${count.toString().padStart(5)} pitches (${pct}%)`);
        });
      
      console.log('\n📊 AUTO PITCH TYPES (auto_pitch_type field):');
      console.log('-'.repeat(80));
      Object.entries(autoTypes)
        .sort((a, b) => b[1] - a[1])
        .forEach(([type, count]) => {
          const pct = (count / pitches.length * 100).toFixed(1);
          console.log(`  ${type.padEnd(20)} ${count.toString().padStart(5)} pitches (${pct}%)`);
        });
      
      // Show some sample pitch data
      console.log('\n📋 SAMPLE PITCH DATA (first 5 pitches):');
      console.log('-'.repeat(80));
      pitches.slice(0, 5).forEach((pitch, i) => {
        console.log(`\nPitch ${i + 1}:`);
        console.log(`  tagged_pitch_type: "${pitch.tagged_pitch_type}"`);
        console.log(`  auto_pitch_type: "${pitch.auto_pitch_type}"`);
        console.log(`  pitch_call: "${pitch.pitch_call}"`);
        console.log(`  rel_speed: ${pitch.rel_speed} mph`);
      });
      
      // Recommendation
      console.log('\n' + '='.repeat(80));
      console.log('💡 RECOMMENDATION:');
      console.log('='.repeat(80));
      
      const undefinedTagged = taggedTypes['Undefined'] || 0;
      const undefinedAuto = autoTypes['Undefined'] || 0;
      const nullAuto = autoTypes['null'] || 0;
      
      if (undefinedTagged > pitches.length * 0.8) {
        console.log('\n⚠️  tagged_pitch_type is mostly "Undefined"');
        console.log('✅ Use auto_pitch_type instead (has actual pitch classifications)\n');
      } else {
        console.log('\n✅ tagged_pitch_type has good data\n');
      }
      
      // Show current mapping vs actual values
      console.log('='.repeat(80));
      console.log('🔧 MAPPING CHECK:');
      console.log('='.repeat(80));
      console.log('\nCurrent code looks for these names:');
      console.log('  Fastball, Four-Seam, TwoSeamFastball, Sinker, Cutter,');
      console.log('  Slider, Curveball, Changeup, ChangeUp, Splitter, Knuckleball');
      
      console.log('\nAPI actually returns these names (auto_pitch_type):');
      Object.keys(autoTypes)
        .filter(t => t !== 'null' && t !== 'Undefined')
        .forEach(type => console.log(`  "${type}"`));
      
      console.log('\n');
      
    } else {
      console.log('❌ Could not retrieve pitch data');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

analyzePitchTypes().catch(console.error);