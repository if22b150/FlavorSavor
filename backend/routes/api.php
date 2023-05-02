<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

////////////
// Public //
////////////
Route::name('public.')->group(function() {
    // Categories
    Route::get('categories', [\App\Http\Controllers\CategoryController::class, 'index']);
    // Ingredients
    Route::get('ingredients', [\App\Http\Controllers\IngredientController::class, 'index']);
    // Recipes
    Route::get('recipes', [\App\Http\Controllers\RecipeController::class, 'index']);
});

///////////
// Admin //
///////////
Route::prefix('admin')->name('admin.')->middleware(['auth:sanctum', 'verified', 'auth.admin'])->group(function () {
    Route::apiResource('ingredients', \App\Http\Controllers\Admin\IngredientController::class);

    Route::apiResource('categories', \App\Http\Controllers\Admin\CategoryController::class);
});

//////////////
// Customer //
//////////////
Route::prefix('customer')->name('customer.')->middleware(['auth:sanctum', 'auth.customer'])->group(function () {
    // Recipes
    Route::apiResource('recipes', \App\Http\Controllers\Customer\RecipeController::class);
});

