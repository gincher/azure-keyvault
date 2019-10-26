import { execKv } from './exec';
import { SecretBundle } from '@azure/keyvault-secrets/src/core/models/index';

/**
 * Get list of key names from a vault
 * @param vaultName - the name of the vault to look in
 */
export const listKeys = async (vaultName: string) => {
  const keys = await execKv<SecretBundle[]>('list', vaultName);

  const keyNames = keys
    .filter(key => !!key.id)
    .map(key => key.id!.split('/').pop() as string);

  return keyNames;
};

/**
 * Get secret by key
 * @param keyName - Key's name
 * @param vaultName - the name of the vault to look in
 */
export const getKeyValue = async (keyName: string, vaultName: string) => {
  const key = await execKv<SecretBundle>('show', vaultName, `--name=${keyName}`);

  const secret = key.value!;

  return secret;
};
