<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Client;

use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
   
    public function register(Request $request)
    {
        // Define validation rules
        $rules = [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'birth_date' => 'required|date',
            'address' => 'required|string',
            'telephone' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'Cpassword' => 'same:password'
        ];
    
        // Validate the request data
        $validator = Validator::make($request->all(), $rules);
    
        // If validation fails, return error response
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }
    
        // If validation passes, create the user
        $user = User::create([
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'type' => "client",
            'status' => '1'
        ]);
    
        $userId = $user->id;
    
        $client = Client::create([
            'user_id' => $userId,
            'first_name' => $request->input('first_name'),
            'birth_date' => $request->input('birth_date'),
            'address' => $request->input('address'),
            'last_name' => $request->input('last_name'),
            'telephone' => $request->input('telephone'),
        ]);
    
        // Return success response
        return response()->json(['message' => 'User registered successfully', 'user' => $user]);
    }
    
    public function login(Request $request){

            // Define validation rules
        $rules = [
            'email' => 'required|email',
            'password' => 'required|string'
        ];
    
        // Validate the request data
        $validator = Validator::make($request->all(), $rules);
    
        // If validation fails, return error response
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }
    
        if (!Auth::attempt($request->only('email','password'))) {
            return response([
                'message' => 'Invalid credentials'
            ], Response::HTTP_UNAUTHORIZED);
        }
    
        $user = Auth::user();
        $token = $user->createToken('token')->plainTextToken;
        $cookie = cookie('jwt', $token, 30 * 24 * 60);
    
       if($user->type=='host'){
        $username = $user->host->first_name ;
        $userEmail=$user->email;
        $userid =  $user->host->id;
       }else{
        $username = $user->client->first_name ;
        $userEmail=$user->email;
        $userid =$user->client->id;
       }
        $userType = $user->type;
        $userImage= $user->image;
    
        return response([
            'message' => 'success',
            'token' => $token,
            'username' => $username,
            'userType' => $userType,
            'userEmail'=>$userEmail,
            'userImage' => $userImage,
            'userId' => $userid,
            'userType' => $user->type 
        ])->withCookie($cookie);
    }
    
    
    public function logout(Request $request){
        // auth()->user()->tokens()->delete();
        $cookie=Cookie::forget('jwt');

        return response()->json([
            'message'=>'Success'
        ],200);

    }
    public function getHostDetails(Request $request)
    {
        // Assuming you are using JWT authentication
        $host = $request->user()->host; 
   
        return response()->json([
            'name' => $host->first_name, 
        ]);
    }
    
}
