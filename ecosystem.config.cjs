// PM2 config for production cluster reload planning.
// This file contains no secrets. Do not add .env.production values, tokens,
// Directus config, SMTP/Telegram config, or public analytics IDs here.
//
// Production environment variables must be loaded before:
//   pm2 start ecosystem.config.cjs --only <app> --update-env
//   pm2 reload ecosystem.config.cjs --only <app> --update-env
//
// NEXT_PUBLIC_* values must be present before `npm run build`.
// Do not run production migration unless the owner says exactly:
//   Разрешаю deploy на production
//
// kit-site-cluster-canary is only for temporary production canary testing
// on 127.0.0.1:3001 and must be deleted after the test.

const commonAppConfig = {
  cwd: "/var/www/kit",
  script: "./node_modules/next/dist/bin/next",
  interpreter: "node",
  exec_mode: "cluster",
  instances: 2,
  time: true,
  merge_logs: true,
  autorestart: true,
  watch: false,
  kill_timeout: 10000,
  listen_timeout: 10000,
  max_memory_restart: "700M",
};

module.exports = {
  apps: [
    {
      ...commonAppConfig,
      name: "kit-site",
      args: "start --hostname 127.0.0.1 --port 3000",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      ...commonAppConfig,
      name: "kit-site-cluster-canary",
      args: "start --hostname 127.0.0.1 --port 3001",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
