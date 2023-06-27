<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('register', [UserController::class, 'store']);
Route::patch('username', [UserController::class, 'checkUsername']);
Route::patch('email', [UserController::class, 'checkEmail']);
Route::get('email/verify/{id}/{hash}', [UserController::class, 'verifyEmail'])->name('verification.verify');
Route::post('resend-verification-email', [UserController::class, 'resendVerificationEmail'])->middleware(['auth:sanctum']);;
Route::post('login', [UserController::class, 'login']);
Route::post('logout', [UserController::class, 'logout']);
//    ->middleware(['auth:sanctum']);
