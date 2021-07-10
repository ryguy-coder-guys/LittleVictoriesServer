module.exports = {
  apps: [
    {
      name: 'LittleVictories',
      script: './dist/index.js',
    },
  ],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-3-131-151-82.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/little-victories-server-key.pem',
      ref: 'origin/main',
      repo: 'git@github.com:ryguy-coder-guys/LittleVictoriesServer.git',
      path: '/home/ubuntu/LittleVictoriesServer',
      'post-deploy': 'pm2 startOrRestart ecosystem.config.js',
    },
  },
};
