exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const TABLE_NAME = 'Recruiting Discovery';

  try {
    const data = JSON.parse(event.body);

    const fields = {
      'Timestamp': data.Timestamp || '',
      'Role': data.Role || '',
      'Grad Year': data['Grad Year'] || '',
      'Divisions Targeted': data['Divisions Targeted'] || '',
      'Hardest Parts of Recruiting': data['Hardest Parts of Recruiting'] || '',
      'Current Outreach Method': data['Current Outreach Method'] || '',
      'RANK: Matching Engine (Platform)': data['RANK: Matching Engine (Platform)'] || '',
      'RANK: College Program Database (Platform)': data['RANK: College Program Database (Platform)'] || '',
      'RANK: Email Templates (Platform)': data['RANK: Email Templates (Platform)'] || '',
      'RANK: Gmail Integration (Platform)': data['RANK: Gmail Integration (Platform)'] || '',
      'RANK: Mass Personalized Outreach (Platform)': data['RANK: Mass Personalized Outreach (Platform)'] || '',
      'RANK: Coach Engagement Score (Platform)': data['RANK: Coach Engagement Score (Platform)'] || '',
      'IMP: School Matching Accuracy': data['IMP: School Matching Accuracy'] || '',
      'IMP: Verified Coach Contacts': data['IMP: Verified Coach Contacts'] || '',
      'IMP: High-Volume Outreach': data['IMP: High-Volume Outreach'] || '',
      'IMP: Gmail Send': data['IMP: Gmail Send'] || '',
      'IMP: Coach Engagement Scoring': data['IMP: Coach Engagement Scoring'] || '',
      'RANK: School & Program Intelligence (AI Coach)': data['RANK: School & Program Intelligence (AI Coach)'] || '',
      'RANK: Task Management (AI Coach)': data['RANK: Task Management (AI Coach)'] || '',
      'RANK: Athlete-Coach Interactions Memory & Summaries (AI Coach)': data['RANK: Athlete-Coach Interactions Memory & Summaries (AI Coach)'] || '',
      'RANK: Timely Nudges (AI Coach)': data['RANK: Timely Nudges (AI Coach)'] || '',
      'RANK: AI Email Replies (AI Coach)': data['RANK: AI Email Replies (AI Coach)'] || '',
      'RANK: Interaction Prep (AI Coach)': data['RANK: Interaction Prep (AI Coach)'] || '',
      'IMP: School Intelligence': data['IMP: School Intelligence'] || '',
      'IMP: Task Management': data['IMP: Task Management'] || '',
      'IMP: Athlete-Coach Interactions Memory & Summaries': data['IMP: Athlete-Coach Interactions Memory & Summaries'] || '',
      'IMP: Nudges & Reminders': data['IMP: Nudges & Reminders'] || '',
      'IMP: AI Email Replies': data['IMP: AI Email Replies'] || '',
      'IMP: Interaction Prep Coaching': data['IMP: Interaction Prep Coaching'] || '',
      'AI Coach Usage Frequency': data['AI Coach Usage Frequency'] || '',
      'Expected Monthly Price': data['Expected Monthly Price'] || '',
      'Bundle vs Add-On Preference': data['Bundle vs Add-On Preference'] || '',
      'Price Ceiling (Too Expensive)': data['Price Ceiling (Too Expensive)'] || '',
      'Billing Structure Preference': data['Billing Structure Preference'] || '',
      'Currently Paying for Recruiting': data['Currently Paying for Recruiting'] || '',
      'Purchase Likelihood (1-10)': data['Purchase Likelihood (1-10)'] || '',
      'Primary Purchase Driver': data['Primary Purchase Driver'] || '',
      'What Would Push to a 10': data['What Would Push to a 10'] || '',
      'Must-Have Features Not Listed': data['Must-Have Features Not Listed'] || '',
      'Other Comments': data['Other Comments'] || ''
    };

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(TABLE_NAME)}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fields })
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error('Airtable error:', err);
      return { statusCode: 500, body: JSON.stringify({ error: 'Airtable submission failed', detail: err }) };
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
