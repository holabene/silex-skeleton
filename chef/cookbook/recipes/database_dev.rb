#
# Cookbook Name:: mycookbook
# Recipe:: database_dev
#
# Copyright (C) 2017 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#

mysql_service "default" do
  initial_root_password ""
  action [:create, :start]
end

mysql_client "default"

script "create_database" do
  interpreter "bash"
  code <<-EOH
  echo "CREATE DATABASE IF NOT EXISTS #{node["app"]["db_name"]} DEFAULT CHARACTER SET = utf8mb4 DEFAULT COLLATE utf8mb4_general_ci;" | mysql -h127.0.0.1 -uroot
  EOH
end
