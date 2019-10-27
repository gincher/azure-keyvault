# Action for adding Azure Key Vault secrets to the environment variables

This action is designed to use the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) to add Azure Key Vault's secrets to the environment variables. Make sure you have logged in to the azure cli (using the [`azure/login`](https://github.com/Azure/login) action) before using this action. Works similar to the [`AzureKeyVault`](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/deploy/azure-key-vault) task in Azure DevOps. The environment variable name will be uppercase and dashes will be replaces with underline, so if the name is `Secret-Name`, the environment variable will be calles `SECRET_NAME`.

## Usage

### Example

```yaml
name: Get Key Vault's secrets

on:
  push:
    branches:
      - master
      - release/*

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v1
      - name: Login to Azure
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
      - name: Download secrets
        uses: gincher/azure-keyvault@v1
        with:
          keyVaultName: 'secrets'
          secretsFilter: '*'
```

### Input Variables

| Key             | Value                                                                                                                          | Required |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `keyVaultName`  | The name of the Azure Key Vault from which the secrets will be downloaded.                                                     | **Yes**  |
| `secretsFilter` | A comma-separated list of secret names to be downloaded. Use the default value `*` to download all the secrets from the vault. | **No**   |

## License

This project uses the [MIT license](LICENSE).
