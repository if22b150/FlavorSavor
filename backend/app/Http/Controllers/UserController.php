<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\EmailExistsRequest;
use App\Http\Requests\User\LoginRequest;
use App\Http\Requests\User\RegistrationRequest;
use App\Http\Requests\User\UsernameExistsRequest;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RegistrationRequest $request)
    {
        if ($request->bearerToken() && !auth('sanctum')->check())
            return response('Token invalid', 401);

        $data = [
            'email' => $request->email,
            'password' => $request->password,
            'username' => $request->username
        ];
        return $this->userService->create($data);
    }

    public function verifyEmail(Request $request, int $id, string $hash)
    {
        return $this->userService->verifyEmail(['id' => $id, 'hash' => $hash]);
    }

    public function login(LoginRequest $request)
    {
        return $this->userService->login([
            'user' => $request->user,
            'password' => $request->password,
            'token' => $request->bearerToken()
        ]);
    }

    public function logout(Request $request)
    {
        return $this->userService->logout($request->user());
    }

    public function checkUsername(UsernameExistsRequest $request)
    {
        return $this->userService->checkUsername($request->username);
    }

    public function checkEmail(EmailExistsRequest $request)
    {
        return $this->userService->checkEmail($request->email);
    }

    public function resendVerificationEmail(Request $request)
    {
        return $this->userService->resendVerificationEmail($request->user()->id);
    }
}
