<?php

namespace App\Http\Resources;

use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\App;

class RecipeResource extends JsonResource
{
    private UserRepositoryInterface $userRepository;

    public function __construct($resource)
    {
        parent::__construct($resource);
        $this->userRepository = App::make(UserRepositoryInterface::class);
    }

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'time' => $this->time,
            'servings' => $this->servings,
            'imagePath' => config('app.url') . '/' . $this->image_path,

            'user' => new UserResource($this->user),
            'ingredients' => RecipeIngredientResource::collection($this->ingredients),
//            'ingredients' => $this->ingredients,
            'categories' => CategoryResource::collection($this->categories),
            'saved' => $request->user('sanctum') ? $this->userRepository->isSavedRecipe($this->id, $request->user('sanctum')->id) : null
        ];
    }
}
