#
# Cookbook Name:: dev
# Recipe:: webserver
#
# Copyright (C) 2017 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#

include_recipe 'xdebug'

# vimrc
template "#{node['app']['install_path']}/.vimrc" do
  source 'vimrc.erb'
  variables install_path: node['app']['install_path']
end

# mb-string for phpunit
package 'php7.0-mbstring'
