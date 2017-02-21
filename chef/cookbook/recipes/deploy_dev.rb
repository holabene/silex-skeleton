include_recipe "composer"
include_recipe 'composer::self_update'

composer_project "/srv/app" do
  dev true
  prefer_dist false
  optimize_autoloader false
  action :install
end
