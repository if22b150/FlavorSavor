<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('register', [UserController::class, 'store']);
Route::get('email/verify/{id}/{hash}', [UserController::class, 'verifyEmail'])->withoutMiddleware('auth:sanctum')->name('verification.verify');

//Route::post('login', [UserController::class, 'login']);
//Route::post('logout', [UserController::class, 'logout'])->middleware(['auth:sanctum']);
//Route::post('resend-verification-email', [UserController::class, 'resendVerificationEmail'])->withoutMiddleware('auth:sanctum')->name('verification.resend');
//Route::get('email-not-verified', [UserController::class, 'emailNotVerified'])->name('verification.notice');
//Route::get('email/verify/{id}/{hash}', [UserController::class, 'verifyEmail'])->withoutMiddleware('auth:sanctum')->name('verification.verify');
//Route::post('change-password', [UserController::class, 'changePassword'])->middleware(['auth:sanctum'])->name('password.change');
//Route::post('forgot-password-email', [UserController::class, 'forgotPasswordEmail'])->name('password.email');
//Route::post('reset-password', [UserController::class, 'resetPassword'])->withoutMiddleware(['api'])->middleware('web')->name('password.update');
//Route::get('reset-password/{token}', [UserController::class, 'resetPasswordView'])->withoutMiddleware(['api'])->middleware('web')->name('password.reset');
