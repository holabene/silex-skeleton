#
# Cookbook Name:: cookbook
# Recipe:: default
#
# Copyright (C) 2017 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#

package "utilities" do
  package_name %w(unzip)
  action :install
end
