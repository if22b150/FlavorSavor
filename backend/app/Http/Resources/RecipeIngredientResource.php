<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RecipeIngredientResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'recipeIngredientId' => $this->id,
            'ingredientId' => $this->pivot->ingredient_id,
            'ingredientName' => $this->name,
            'text' => $this->pivot->text
        ];
    }
}
