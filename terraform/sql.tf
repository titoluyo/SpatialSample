resource "azurerm_mssql_server" "data" {
  name                         = "tynkernautsql"
  resource_group_name          = data.azurerm_resource_group.main.name
  location                     = data.azurerm_resource_group.main.location
  version                      = "12.0"
  administrator_login          = "demoadministrator"
  administrator_login_password = "AtT8yk-vzr7aj!QsFjQRjU3N"

  tags = {
    environment = "development"
  }

  azuread_administrator {
    # login_username = "tito@luyomurata.onmicrosoft.com"
    # object_id = "68910914-a645-406d-bf55-d19e6332afaf" # tito@luyomurata.onmicrosoft.com
    # login_username = "spn-sql-admin"
    # object_id = "6c541986-84c5-4b21-a0cc-d02528c041cc" # spn-sql-admin
    login_username = "Demo Group"
    object_id = var.sql_admin_group_id # Group SQL Admin
    tenant_id = var.tenant_id
  }

  identity {
    type = "SystemAssigned"
  }
}