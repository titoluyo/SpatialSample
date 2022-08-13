terraform {
  required_version = ">= 0.15.4"
  required_providers {
    azurerm = ">= 2.94.0"
  }
  # backend "azurerm" {}
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
  tenant_id       = var.tenant_id
}

# data "terraform_remote_state" "core" {
#   backend = "azurerm"
#   config = {
#     resource_group_name  = var.remote_state_rg
#     storage_account_name = var.remote_state_sa_name
#     container_name       = var.remote_state_container
#     key                  = var.remote_state_key_core
#     subscription_id      = var.subscription_id
#     tenant_id            = var.tenant_id
#   }
# }

# data "terraform_remote_state" "pattern" {
#   backend = "azurerm"
#   config = {
#     resource_group_name  = var.remote_state_rg
#     storage_account_name = var.remote_state_sa_name
#     container_name       = var.remote_state_container
#     key                  = var.remote_state_key_pattern
#     subscription_id      = var.subscription_id
#     tenant_id            = var.tenant_id
#   }
# }
