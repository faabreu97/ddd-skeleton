const common = [
  '--require-module ts-node/register' // Load TypeScript module
];

const backoffice_frontend = [
  ...common,
  'tests/apps/backoffice/frontend/features/**/*.feature',
  '--require tests/apps/backoffice/frontend/features/step_definitions/*.steps.ts'
].join(' ');

const backoffice_backend = [
  ...common,
  'tests/apps/backoffice/backend/features/**/*.feature',
  '--require tests/apps/backoffice/backend/features/step_definitions/*.steps.ts'
].join(' ');

const marketplace_backend = [
  ...common,
  'tests/apps/marketplace/backend/features/**/*.feature',
  '--require tests/apps/marketplace/backend/features/step_definitions/*.steps.ts'
].join(' ');

const marketplace_frontend = [
  ...common,
  'tests/apps/marketplace/frontend/features/**/*.feature',
  '--require tests/apps/marketplace/frontend/features/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
  backoffice_backend,
  backoffice_frontend,
  marketplace_backend,
  marketplace_frontend
};
