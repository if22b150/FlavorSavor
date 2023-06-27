<?php

namespace App\Services;

use App\Enums\ERole;
//use App\Http\Requests\User\ResetPasswordRequest;
//use App\Http\Resources\CustomerResource;
use App\Http\Resources\UserResource;
//use App\Repositories\Interfaces\BookingRepositoryInterface;
//use App\Repositories\Interfaces\CustomerRepositoryInterface;
//use App\Repositories\Interfaces\HandoverRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Exception;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class UserService
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function create(array $data)
    {
        $data['role'] = ERole::CUSTOMER;

        try {
            $user = $this->userRepository->create($data);
            if(!$user)
                throw new Exception("Create user error");
        } catch (Exception $e) {
            return response("User konnte nicht angelegt werden. " . $e->getMessage(), 500);
        }

        try {
            event(new Registered($user));
        } catch (Exception $e) {
            $this->userRepository->delete($user->id);
            return response("Account konnte nicht angelegt werden. " . $e->getMessage(), 500);
        }

        return new UserResource($user, null, true);
    }

    public function verifyEmail(array $data)
    {
        $user = $this->userRepository->get($data['id']);

        if ($user->hasVerifiedEmail())
            return response('Already verified', 403);
        if (!hash_equals((string)$data['hash'], sha1($user->getEmailForVerification())))
            return response('Not authorized', 401);

        $user->markEmailAsVerified();

        event(new Verified($user));

        return view('auth.email-verified-success');
    }

    public function login(array $data)
    {
        $user = $this->userRepository->getFirstWhere('email', $data['user']);
        if(!$user)
            $user = $this->userRepository->getFirstWhere('username', $data['user']);

        if(!$user)
            return response('The selected email or username is invalid.', 422);

        if (!Hash::check($data['password'], $user->password))
            return response('Credentials incorrect', 401);

        if ($data['token'] && (!auth('sanctum')->check() || auth('sanctum')->user()->id != $user->id))
            return response('Token invalid', 401);

        return new UserResource($user, $data['token']);
    }

    public function logout(mixed $user)
    {
        if($user)
            $user->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }

    public function checkUsername(string $username)
    {
        $user = $this->userRepository->getFirstWhere('username', $username);

        return response()->json(['valid' => $user == null]);
    }

    public function checkEmail(string $email)
    {
        $user = $this->userRepository->getFirstWhere('email', $email);

        return response()->json(['valid' => $user == null]);
    }

    public function resendVerificationEmail(int $user_id)
    {
        $user = $this->userRepository->get($user_id);
        if ($user->hasVerifiedEmail())
            return response('User has already verified email address', 403);
        $user->sendEmailVerificationNotification();

        return response('', 204);
    }

    public function getAllCustomers()
    {
        return UserResource::collection($this->userRepository->getWhere('role', 'customer'));
    }

    public function delete(int $id)
    {
        $this->userRepository->deleteWhere('id', $id);
        return response('', 204);
    }
//
//    public function verifyEmail(array $data)
//    {
//        $user = $this->userRepository->get($data['id']);
//
//        if ($user->hasVerifiedEmail())
//            return response('Already verified', 403);
//        if (!hash_equals((string)$data['hash'], sha1($user->getEmailForVerification())))
//            return response('Not authorized', 401);
//
//        $user->markEmailAsVerified();
//
//        event(new Verified($user));
//
//        return view('auth.email-verified-success');
//    }
//
//
//    public function changePassword(array $data)
//    {
//        $user = $data['user'];
//        $user->update(['password' => Hash::make($data['new_password'])]);
//
//        return response()->json(['message' => 'Password changed successfully']);
//    }
//
//    public function forgotPasswordEmail(string $email)
//    {
//        $user = $this->userRepository->getFirstWhere('email', $email);
//        if (!$user)
//            return response('User with this email address does not exist', 400);
//        if (!$user->hasVerifiedEmail())
//            return response('User is only authorized to do this request if he is verified', 403);
//
//        Password::sendResetLink(['email' => $email]);
//
//        return response('', 204);
//    }
//
//    public function resetPassword(ResetPasswordRequest $request)
//    {
//        $status = Password::reset(
//            $request->only('email', 'password', 'password_confirmation', 'token'),
//            function ($user, $password) {
//                $user->forceFill([
//                    'password' => Hash::make($password)
//                ])->setRememberToken(Str::random(60));
//
//                $user->save();
//
//                event(new PasswordReset($user));
//            }
//        );
//
//        return $status === Password::PASSWORD_RESET
//            ? view('auth.reset-password-success')
//            : back()->withErrors(['password' => 'Password could not be reset']);
//    }
//
//    public function delete(int $user_id)
//    {
//        $customer = $this->customerRepository->getFirstWhere('user_id', $user_id);
//
//        foreach ($this->bookingRepository->getWhere('customer_id', $customer->id) as $booking) {
//            $this->handoverRepository->update(['id' => $booking->booking_period->pickupHandover->id, 'data' => ['customer_scanned_at' => null, 'admin_scanned_at' => null]]);
//            $this->handoverRepository->update(['id' => $booking->booking_period->returnHandover->id, 'data' => ['customer_scanned_at' => null, 'admin_scanned_at' => null]]);
//        }
//
//        $this->userRepository->delete($user_id);
//
//        return response('', 204);
//    }
//
//    public function all()
//    {
//        $customers = $this->userRepository->getWhere('role', ERole::CUSTOMER);
//        $customers = $customers->merge($this->userRepository->getWhere('role', ERole::COMPANY_ADMIN));
//        return \App\Http\Resources\Admin\UserResource::collection($customers);
//    }
}
