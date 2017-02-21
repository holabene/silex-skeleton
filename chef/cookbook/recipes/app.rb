#
# Cookbook Name:: cookbook
# Recipe:: app
#
# Copyright (C) 2017 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#

include_recipe "apache2"
include_recipe "apache2::mod_php"
include_recipe "php"

apache_site "default" do
  enable false
end

apache_config "php7.0-cgi" do
  enable true
end

package "php extensions" do
  package_name %w(php-apcu php7.0-mysql php7.0-json php7.0-intl php7.0-curl php7.0-gd)
  action :install
  notifies :reload, "service[apache2]", :delayed
end

mysql_client "default" do
  action :create
end

web_app "app" do
  template "apache_vhost.conf.erb"
  docroot "#{node["app"]["install_path"]}/web"
  server_port 80
  notifies :reload, "service[apache2]", :delayed
end
