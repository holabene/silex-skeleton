# xdebug
default['xdebug']['config_file'] = '/etc/php/7.0/mods-available/xdebug.ini'
default['xdebug']['directives']['remote_enable'] = 1
default['xdebug']['directives']['remote_connect_back'] = 1
default['xdebug']['directives']['profiler_enable_trigger'] = 1
default['xdebug']['directives']['max_nesting_level'] = 1000
