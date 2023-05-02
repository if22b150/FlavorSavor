<?php

namespace App\Http\Middleware;

use App\Enums\ERole;
use Illuminate\Http\Request;
use Closure;

class AuthCustomer
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next) {
        $user = $request->user();

        if ($user->role == ERole::CUSTOMER)
            return $next($request);
        else
            return response('Not allowed', 403);
    }
}
