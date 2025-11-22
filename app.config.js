// app.config.js
const { execSync } = require('child_process');
const appJson = require('./app.json');

function getCommitHash() {
  try {
    const hash = execSync('git rev-parse --short HEAD').toString().trim();
    console.log('🔹 Commit hash detectado:', hash);
    return hash;
  } catch (e) {
    console.warn('⚠️ Não foi possível obter o hash do commit:', e?.message);
    return 'dev';
  }
}

module.exports = () => {
  const config = appJson.expo;

  return {
    ...config,
    extra: {
      ...config.extra,
      commitHash: getCommitHash(),
    },
  };
};
