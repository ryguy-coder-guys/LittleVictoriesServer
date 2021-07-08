module.exports = {
  apps: [
    {
      name: 'LittleVictories',
      script: './server/src/index.ts',
    },
  ],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'localhost:3000',
      key: '~/.ssh/little-victories-key.pem',
      ref: 'origin/main',
      repo: 'git@github.com:ryguy-coder-guys/LittleVictoriesServer.git',
      path: '/home/ubuntu/LittleVictoriesServer',
      'post-deploy': 'pm2 startOrRestart ecosystem.config.js',
    },
  },
};
