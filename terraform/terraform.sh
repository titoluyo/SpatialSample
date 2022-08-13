#!/bin/bash
echo "----------------------"
echo " terraform.sh begin   "
echo "----------------------"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd)"
echo $SCRIPT_DIR
source "${SCRIPT_DIR}/terraform_vars.sh"
source "${SCRIPT_DIR}/../scripts/login.sh"

export TF_VAR_BUILD_NUMBER=${BUILD_NUMBER}
echo "BUILD_NUMBER: $TF_VAR_BUILD_NUMBER"
if [ ! -z "$1" ] && [ "$1" == "destroy" ]; then
    echo "terraform destroy ..."
    terraform destroy -var-file="pattern_config.tfvars"
    exit
fi

echo "--------------"
echo "terraform init"
echo "--------------"
terraform init -upgrade=true \
    -backend-config "resource_group_name"=$TF_VAR_remote_state_rg \
    -backend-config "storage_account_name"=$TF_VAR_remote_state_sa_name \
    -backend-config "container_name"=$TF_VAR_remote_state_container \
    -backend-config "key"=$TF_VAR_remote_state_key_pattern \
    -backend-config "subscription_id"=$TF_VAR_subscription_id \
    -backend-config "tenant_id"=$TF_VAR_tenant_id

echo "--------------"
echo "terraform plan"
echo "--------------"
terraform plan -input=false -out=pattern.tfplan -var-file="pattern_config.tfvars"

echo "---------------"
echo "terraform apply"
echo "---------------"
terraform apply -input=false pattern.tfplan

echo "----------------------"
echo " terraform.sh end     "
echo "----------------------"
