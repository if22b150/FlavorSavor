<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    private ?string $bearerToken;
    private ?bool $registration;

    public function __construct($resource, ?string $bearerToken = null, ?bool $registration = null)
    {
        parent::__construct($resource);
        $this->bearerToken = $bearerToken;
        $this->registration = $registration;
    }

    public function toArray($request) {
        $result = [
            'id' => $this->id,
            'username' => $this->username,
            'email' => $this->email,
            'verified' => $this->email_verified_at != null,
            'role' => $this->role
        ];

        if(!$this->registration)
            $result['token'] = $this->bearerToken ?? $this->createToken('token', [$this->role])->plainTextToken;

        return $result;
    }
}
