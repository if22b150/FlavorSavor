<?php

namespace App\Http\Controllers;

//use App\Http\Requests\User\ChangePasswordRequest;
//use App\Http\Requests\User\ForgotPasswordEmailRequest;
//use App\Http\Requests\User\LoginRequest;
use App\Http\Requests\User\RegistrationRequest;
//use App\Http\Requests\User\ResendVerificationEmailRequest;
//use App\Http\Requests\User\ResetPasswordRequest;
//use App\Http\Requests\User\StoreUserRequest;
//use App\Models\Customer;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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

//    /**
//     * Display the specified resource.
//     */
//    public function show(Customer $customer): Response
//    {
//        //
//    }
//
//    /**
//     * Show the form for editing the specified resource.
//     */
//    public function edit(Customer $customer): Response
//    {
//        //
//    }
//
//    /**
//     * Update the specified resource in storage.
//     */
//    public function update(Request $request, Customer $customer): RedirectResponse
//    {
//        //
//    }
//
//    /**
//     * Remove the specified resource from storage.
//     */
//    public function destroy(Customer $customer): RedirectResponse
//    {
//        //
//    }
//
//
//
//    // AUTH
//
//    public function login(LoginRequest $request)
//    {
//        return $this->userService->login([
//            'email' => $request->email,
//            'password' => $request->password,
//            'token' => $request->bearerToken()
//        ]);
//    }
//
//    public function logout(Request $request)
//    {
//        return $this->userService->logout($request->user());
//    }
//
//    public function verifyEmail(Request $request, int $id, string $hash)
//    {
//        return $this->userService->verifyEmail(['id' => $id, 'hash' => $hash]);
//    }
//
//    public function resendVerificationEmail(ResendVerificationEmailRequest $request)
//    {
//        return $this->userService->resendVerificationEmail($request->email);
//    }
//
//    public function emailNotVerified()
//    {
//        return response('Email not verified', 401);
//    }
//
//    public function changePassword(ChangePasswordRequest $request)
//    {
//        return $this->userService->changePassword(['user' => $request->user(), 'new_password' => $request->newPassword]);
//    }
//
//    public function forgotPasswordEmail(ForgotPasswordEmailRequest $request)
//    {
//        return $this->userService->forgotPasswordEmail($request->email);
//    }
//
//    public function resetPasswordView(string $token)
//    {
//        return view('auth.reset-password-form', ['token' => $token]);
//    }
//
//    public function resetPassword(ResetPasswordRequest $request)
//    {
//        return $this->userService->resetPassword($request);
//    }
}
