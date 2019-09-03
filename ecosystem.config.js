module.exports = {
  apps: [{
    name: 'module-photo-gallery',
    script: './server/index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-3-15-191-238.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/FEC.pem',
      ref: 'origin/master',
      repo: 'git@github.com:shazamazon/module-photo-gallery',
      path: '/home/ubuntu/',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}