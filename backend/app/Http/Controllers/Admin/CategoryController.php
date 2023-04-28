<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Models\Category;
use App\Services\AdminService;
use App\Services\CategoryService;

class CategoryController extends Controller
{
    protected AdminService $adminService;
    protected CategoryService $categoryService;

    public function __construct(AdminService $adminService,
                                CategoryService $categoryService)
    {
        $this->adminService = $adminService;
        $this->categoryService = $categoryService;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        return $this->adminService->createCategory(['name' => $request->name]);
    }

    public function index()
    {
        return $this->categoryService->all();
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        return $this->adminService->updateCategory(['id' => $category->id, 'name' => $request->name]);
    }

    public function destroy(Category $category)
    {
        return $this->adminService->deleteCategory($category->id);
    }
}
