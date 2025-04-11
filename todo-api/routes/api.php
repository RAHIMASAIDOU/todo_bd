<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\TacheController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')-> get('/user', function (Request $request) {
        return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
        Route::get('/tasks', [TacheController::class, 'index']);
        Route::post('/tasks', [TacheController::class, 'store']);
        Route::put('/tasks/{id}', [TacheController::class, 'update']);
        Route::delete('/tasks/{id}', [TacheController::class, 'destroy']);
        Route::patch('/tasks/{id}/toggle', [TacheController::class, 'toggle']);
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
});



