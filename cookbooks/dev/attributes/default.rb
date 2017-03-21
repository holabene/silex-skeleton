# app config
default['app']['install_path'] = '/srv/app'
default['app']['db_name'] = 'app'
default['app']['db_host'] = '127.0.0.1'
default['app']['db_user'] = 'root'
default['app']['db_password'] = ''

# xdebug
default['xdebug']['config_file'] = '/etc/php/7.0/mods-available/xdebug.ini'
default['xdebug']['directives']['remote_enable'] = 1
default['xdebug']['directives']['remote_connect_back'] = 1
default['xdebug']['directives']['profiler_enable_trigger'] = 1
default['xdebug']['directives']['max_nesting_level'] = 1000
