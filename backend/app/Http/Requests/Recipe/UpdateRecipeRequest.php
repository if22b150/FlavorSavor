<?php

namespace App\Http\Requests\Recipe;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRecipeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            'title' => ['required', 'string'],
            'description' => ['required', 'string'],
            'time' => ['required', 'integer'],
            'servings' => ['required', 'integer'],
            'image' => ['nullable', 'image'],

            'categoryIds' => ['present', 'array'],
            'categoryIds.*' => ['required', 'integer', 'exists:categories,id'],

            'ingredients' => ['present', 'array'],
            'ingredients.*.id' => ['required', 'integer', 'exists:ingredients,id'],
            'ingredients.*.text' => ['required', 'string'],
//
//            'newIngredients' => ['present', 'array'],
//            'newIngredients.*.name' => ['required', 'string'],
//            'newIngredients.*.text' => ['required', 'string']
        ];
    }
}
