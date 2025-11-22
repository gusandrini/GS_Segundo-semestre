// app.config.js
const { execSync } = require('child_process');

function getCommitHash() {
  try {
    const hash = execSync('git rev-parse --short HEAD').toString().trim();
    console.log("🔹 Commit hash detectado:", hash);
    return hash;
  } catch (e) {
    console.warn("⚠️ Não foi possível obter o hash do commit:", e?.message);
    return "dev";
  }
}

module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      ...(config.extra || {}),
      commitHash: getCommitHash(),
    },
  };
};
