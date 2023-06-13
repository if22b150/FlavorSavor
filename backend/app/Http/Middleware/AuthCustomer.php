<?php

namespace App\Http\Middleware;

use App\Enums\ERole;
use App\Repositories\Interfaces\RecipeRepositoryInterface;
use Illuminate\Http\Request;
use Closure;

class AuthCustomer
{
    protected RecipeRepositoryInterface $recipeRepository;

    public function __construct(RecipeRepositoryInterface $recipeRepository)
    {
        $this->recipeRepository = $recipeRepository;
    }

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
            return $this->authorizeSubroutes($request, $next, $user->id);
        else
            return response('Not allowed', 403);
    }

    private function authorizeSubroutes(Request $request, Closure $next, int $userId) {
        $recipeId = $request->route('recipeId') ?? ($request->route('recipe') ? $request->route('recipe') : null);

        if ($recipeId && !$this->recipeRepository->exists($recipeId))
            return response('Recipe does not exist', 404);

        if ($recipeId && $userId && !str_contains($request->path(), 'saved-recipes') && !$this->recipeRepository->belongsToUser($recipeId, $userId))
            return response('Recipe does not belong to the user', 403);

        return $next($request);
    }
}
