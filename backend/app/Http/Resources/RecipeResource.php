<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RecipeResource extends JsonResource
{
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
            'categories' => CategoryResource::collection($this->categories)
        ];
    }
}
