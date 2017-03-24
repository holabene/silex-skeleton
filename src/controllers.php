<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

//Request::setTrustedProxies(['127.0.0.1']);

// Frontend controllers

$app->get('/', function () use ($app) {
    return $app['twig']->render('index.html.twig', []);
})->bind('homepage');

// Backend controllers

$admin = $app['controllers_factory'];

$admin->get('/', function() use ($app) {
    return $app['twig']->render('admin/dashboard.html.twig', []);
})->bind('admin_dashboard');

$admin->get('/items', function() use ($app) {
    return $app['twig']->render('admin/item_list.html.twig');
})->bind('admin_item_list');

$app->mount('/admin', $admin);

// Errors

$app->error(function (\Exception $e, Request $request, $code) use ($app) {
    if ($app['debug']) {
        return;
    }

    // 404.html, or 40x.html, or 4xx.html, or error.html
    $templates = [
        'errors/'.$code.'.html.twig',
        'errors/'.substr($code, 0, 2).'x.html.twig',
        'errors/'.substr($code, 0, 1).'xx.html.twig',
        'errors/default.html.twig',
    ];

    return new Response($app['twig']->resolveTemplate($templates)->render(['code' => $code]), $code);
});
