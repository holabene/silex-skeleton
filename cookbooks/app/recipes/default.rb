#
# Cookbook Name:: app
# Recipe:: default
#
# Copyright (C) 2017 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#

package 'utilities' do
  package_name %w(unzip)
  action :install
end

mysql_client 'default'
