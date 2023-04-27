<?php

namespace App\Repositories\Interfaces;

interface BaseRepositoryInterface
{
    public function all(array $related = null);

    public function get($id, array $related = null);
    public function getWhere($column, $value, array $related = null);
    public function getFirstWhere($column, $value, array $related = null);

    public function create(array $data);

    public function update(array $data);

    public function delete($id);

    public function deleteWhere($column, $value);

    public function exists(int $id): bool;
}
