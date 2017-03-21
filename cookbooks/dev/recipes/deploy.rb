#
# Cookbook Name:: dev
# Recipe:: deploy
#
# Copyright (C) 2017 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#

include_recipe 'composer'
include_recipe 'composer::self_update'

execute 'npm_install' do
  cwd node['app']['install_path']
  command 'npm install'
end

execute 'gulp' do
  cwd node['app']['install_path']
  command 'gulp'
end

template "#{node['app']['install_path']}/config/local.php" do
  cookbook 'app'
  source 'local.php.erb'
  variables app: node['app']
  not_if { File.exist?("#{node['app']['install_path']}/config/local.php") }
end

composer_project node['app']['install_path'] do
  dev true
  prefer_dist false
  optimize_autoloader false
end

web_app 'dev' do
  cookbook 'app'
  template 'vhost.conf.erb'
  docroot "#{node['app']['install_path']}/web"
  server_port 80
  notifies :reload, 'service[apache2]', :delayed
end
