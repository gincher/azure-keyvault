import { setSecret, exportVariable, info as log } from '@actions/core';
import { exec as Exec } from '@actions/exec';

/**
 * Adds the secret to the environment variables, and marks the
 * value as secret to hide it in the GitHub Actions console.
 * @param key - Will be converted to uppercase, and dashes will be replaced with underlines
 * @param value - Will be marked as secret value and be hidden from the console
 */
export const setEnvVariable = async (key: string, value: string) => {
  const keyUppercase = key.replace(/[-]/g, '_').toUpperCase();

  log(`\`${key}\` was added to the environment variables as \`${keyUppercase}\``);

  setSecret(value);
  exportVariable(keyUppercase, value);
};

/**
 * Execute command
 * @param command - the command to execute
 * @param args - command args
 * @returns promise with an object
 */
export const exec = <T>(command: string, ...args: string[]) =>
  new Promise<T>(async (resolve, reject) => {
    let failed = false;
    let response = '';

    // If stdout called or promise rejected, set failed to true and
    // call `reject`.
    const fail = (e: Buffer) => {
      reject(e.toString());
      failed = true;
    };

    // Execute the command, append to the response string every time
    // the stdout callback function called. If stderr called, reject and
    // stop.
    await Exec(command, args, {
      silent: true,
      listeners: {
        stderr: fail,
        stdout: r => (response += r.toString())
      }
    }).catch(fail);
    if (failed) return;

    // If not failed and stdout wasn't called, convert string to object.
    try {
      const obj = JSON.parse(response);
      resolve(obj);
    } catch (e) {
      fail(e);
    }
  });

/**
 * Executes an azure keyvault cli command
 * @param action - the command type to execute
 * @param vaultName - the vault name to look in
 * @param variables - additional variables to append to the command
 */
export const execKv = <T>(
  action: 'list' | 'show',
  vaultName: string,
  ...variables: string[]
) =>
  exec<T>(
    'az',
    'keyvault',
    'secret',
    action,
    `--vault-name=${vaultName}`,
    '--output=json',
    ...variables
  );
