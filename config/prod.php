<?php

// configure your app for the production environment

// twig
$app['twig.path'] = array(__DIR__.'/../templates');
$app['twig.options'] = array('cache' => __DIR__.'/../var/cache/twig');

// doctrine dbal
$app['db.options'] = [
    'driver' => 'pdo_mysql',
    'host' => '127.0.0.1',
    'dbname' => 'app',
    'user' => 'root',
    'password' => '',
    'charset' => 'utf8',
];

// doctrine orm
$app['orm.proxies_dir'] = __DIR__.'/../var/proxies';
$app['orm.auto_generate_proxies'] = false;
$app['orm.default_cache'] = 'apc';
$app['orm.em.options'] = [
    'mappings' => [
        [
            'type' => 'annotation',
            'namespace' => 'App\Entity',
            'path' => __DIR__.'/../src/App/Entity',
            'use_simple_annotation_reader' => false,
        ]
    ],
    'types' => [
        // custom doctrine types
    ]
];
