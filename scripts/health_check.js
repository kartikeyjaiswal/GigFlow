const http = require('http');

const options = {
    host: 'localhost',
    port: 5000,
    path: '/api/health', // Ensure this route exists in your backend
    timeout: 2000
};

const request = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    if (res.statusCode === 200) {
        console.log("Health Check Passed");
        process.exit(0);
    } else {
        console.log("Health Check Failed");
        process.exit(1);
    }
});

request.on('error', (err) => {
    console.log('ERROR:', err);
    process.exit(1);
});

request.end();
