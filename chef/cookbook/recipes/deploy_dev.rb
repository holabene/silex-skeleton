include_recipe "composer"
include_recipe 'composer::self_update'

execute "npm_install" do
  cwd node["app"]["install_path"]
  command "npm install"
end

execute "bower_install" do
  cwd node["app"]["install_path"]
  command "bower install --allow-root"
end

execute "gulp" do
  cwd node["app"]["install_path"]
  command "gulp"
end

composer_project node["app"]["install_path"] do
  dev true
  prefer_dist false
  optimize_autoloader false
end
