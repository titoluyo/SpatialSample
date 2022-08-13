#/bin/bash

# Initialization instructions
echo "Loging into azure ..."
echo "**********************************************************************************************"
az login --service-principal -u $ARM_CLIENT_ID -p $ARM_CLIENT_SECRET --tenant $TF_VAR_tenant_id
az account set --subscription $TF_VAR_subscription_id
echo "**********************************************************************************************"
