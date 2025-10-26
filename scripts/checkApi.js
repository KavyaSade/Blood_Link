(async () => {
  try {
    console.log('GET /api/users');
    const getRes = await fetch('http://localhost:5000/api/users');
    const getTxt = await (getRes.ok ? getRes.json() : getRes.text());
    console.log('Status:', getRes.status);
    console.log('Body:', JSON.stringify(getTxt, null, 2));

    console.log('\nPOST /api/users (test user)');
    const postRes = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'checkapi@example.com',
        name: 'Check API User',
        phone: '+10000000001',
        address: 'Testville',
        bloodType: 'A+',
        userType: 'DONOR'
      })
    });
    let postBody;
    try { postBody = await postRes.json(); } catch(e){ postBody = await postRes.text(); }
    console.log('Status:', postRes.status);
    console.log('Body:', JSON.stringify(postBody, null, 2));

    console.log('\nGET /api/users after POST');
    const getRes2 = await fetch('http://localhost:5000/api/users');
    const getTxt2 = await (getRes2.ok ? getRes2.json() : getRes2.text());
    console.log('Status:', getRes2.status);
    console.log('Body:', JSON.stringify(getTxt2, null, 2));
  } catch (err) {
    console.error('Error during API check:', err);
    process.exit(1);
  }
})();