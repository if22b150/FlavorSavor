<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('register', [UserController::class, 'store']);
Route::get('email/verify/{id}/{hash}', [UserController::class, 'verifyEmail'])->withoutMiddleware('auth:sanctum')->name('verification.verify');

Route::post('login', [UserController::class, 'login']);
Route::post('logout', [UserController::class, 'logout'])->middleware(['auth:sanctum']);
