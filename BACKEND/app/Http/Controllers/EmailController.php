<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Email;

class EmailController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email|unique:emails,email'
            ]);
    
            $email = Email::create([
                'email' => $request->email
            ]);
    
            return response()->json(['message' => 'Email stored successfully', 'email' => $email], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Validation error occurred
            return response()->json(['message' => 'This email is already in use', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Other errors
            return response()->json(['message' => 'Error storing email', 'error' => $e->getMessage()], 500);
        }
    }
    
}
