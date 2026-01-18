module.exports = {
    apps: [{
        name: 'gigflow-backend',
        script: 'server.js',
        instances: 'max', // Scale to all available CPUs
        exec_mode: 'cluster', // Enable cluster mode for load balancing
        env: {
            NODE_ENV: 'development',
            PORT: 5000
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: 5000
        },
        watch: false, // Disable watch in production
        max_memory_restart: '1G', // Restart if memory usage exceeds 1GB
        error_file: './logs/err.log',
        out_file: './logs/out.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss',
        merge_logs: true
    }]
};
