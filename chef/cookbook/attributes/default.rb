#
# Cookbook Name:: mycookbook
#
# Copyright (C) 2017 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#

# https://nodejs.org/dist/v7.6.0/
# https://nodejs.org/dist/v7.6.0/SHASUMS256.txt
default['nodejs']['version'] = '7.6.0'
# node-v7.6.0-linux-x64.tar.xz
default['nodejs']['binary']['checksum']['linux_x64'] = '97c6483fdb4fe8ae43dbcf95733cb7e9c6fa10abd63c5f880890bdc8fbc0ded5'
# node-v7.6.0-linux-x86.tar.xz
default['nodejs']['binary']['checksum']['linux_x86'] = '18736a7d26c55f172abebad13254b913b1be17a0fa6dd7817415252a2f1aca84'

default["app"]["install_path"] = "/srv/app"
default["app"]["db_name"] = "app"
