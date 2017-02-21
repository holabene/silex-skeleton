<?php
/**
 * Doctrine ORM command line configuration
 */

use Doctrine\ORM\Tools\Console\ConsoleRunner;
use Doctrine\Common\Annotations\AnnotationRegistry;
use Symfony\Component\Console\Helper\QuestionHelper;
use Symfony\Component\Console\Input\ArgvInput;

$loader = require __DIR__.'/../vendor/autoload.php';
AnnotationRegistry::registerLoader([$loader, 'loadClass']);

set_time_limit(0);

$input = new ArgvInput();
$env = $input->getParameterOption(array('--env', '-e'), getenv('SYMFONY_ENV') ?: 'dev');

$app = require __DIR__.'/../src/app.php';
require __DIR__.'/../config/'.$env.'.php';

// Migrations Commands
$commands[] = new Doctrine\DBAL\Migrations\Tools\Console\Command\ExecuteCommand();
$commands[] = new Doctrine\DBAL\Migrations\Tools\Console\Command\GenerateCommand();
$commands[] = new Doctrine\DBAL\Migrations\Tools\Console\Command\LatestCommand();
$commands[] = new Doctrine\DBAL\Migrations\Tools\Console\Command\MigrateCommand();
$commands[] = new Doctrine\DBAL\Migrations\Tools\Console\Command\StatusCommand();
$commands[] = new Doctrine\DBAL\Migrations\Tools\Console\Command\VersionCommand();
$commands[] = new Doctrine\DBAL\Migrations\Tools\Console\Command\DiffCommand();

// Modify Entity Manager
$app->extend('orm.em', function ($em, $app) {
    /*
    // adding custom types
    $em->getConnection()->getDatabasePlatform()->registerDoctrineTypeMapping('enum', 'string');
    */

    /*
    // whitelisting tables used by doctrine for compatibility with manual tables
    $usedTables = [
        'TABLE_1',
        'TABLE_2',
        'doctrine_migration_versions'
    ];
    $em->getConnection()->getConfiguration()->setFilterSchemaAssetsExpression('/^('.implode('|', $usedTables).')$/');
    */

    return $em;
});

$helperSet = ConsoleRunner::createHelperSet($app['orm.em']);
$helperSet->set(new QuestionHelper());

return $helperSet;
