import { getInput, setFailed } from '@actions/core';
import { listKeys, getKeyValue } from './keyVault';
import { setEnvVariable } from './exec';

const keyVaultName = getInput('keyVaultName', {
  required: true
});
const secretsFilterString = getInput('secretsFilter', {
  required: false
});

const main = async () => {
  try {
    let secretNames: string[];
    if (!secretsFilterString || secretsFilterString.trim() === '*')
      secretNames = await listKeys(keyVaultName);
    else secretNames = secretsFilterString.split(',').map(name => name.trim());

    const secrets = await Promise.all(
      secretNames.map(async name => {
        const secret = await getKeyValue(name, keyVaultName);
        return { key: name, secret };
      })
    );

    secrets.forEach(({ key, secret }) => setEnvVariable(key, secret));
  } catch (e) {
    setFailed(e.toString());
  }
};

main();
