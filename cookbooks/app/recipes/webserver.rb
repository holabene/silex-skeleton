#
# Cookbook Name:: webserver
# Recipe:: app
#
# Copyright (C) 2017 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#

include_recipe 'apache2'
include_recipe 'apache2::mod_php'
include_recipe 'php'
include_recipe 'nodejs::nodejs_from_binary'

apache_site 'default' do
  enable false
end

apache_config 'php7.0-cgi'

apache_module 'mpm_event' do
  enable false
end

apache_module 'mpm_prefork'

package 'php_extensions' do
  package_name %w(php-apcu php7.0-mysql php7.0-json php7.0-intl php7.0-curl php7.0-gd)
  notifies :reload, 'service[apache2]', :delayed
end

execute 'npm_cache_clean' do
  command 'npm cache clean'
end

nodejs_npm 'gulp-cli'

link '/usr/local/bin/gulp' do
  to '/usr/local/nodejs-binary/bin/gulp'
end

package 'ruby-sass'
