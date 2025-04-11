<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    
        // 👉 Ajouter le token ici
        $token = $user->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            'message' => 'Utilisateur enregistré avec succès',
            'user' => $user,
            'token' => $token // 👉 retour du token
        ], 201);
    }
    

    public function login(Request $request)
    {
        // Valider les données d'entrée
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        // Vérifier si la validation échoue
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Tenter de connecter l'utilisateur
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken('YourAppName')->plainTextToken;

            // Retourner le token
            return response()->json(['message' => 'Connexion réussie', 'token' => $token], 200);
        }

        // Si la connexion échoue
        return response()->json(['message' => 'Identifiants invalides'], 401);
    }

        public function user(Request $request)
    {
        return response()->json($request->user());
    }


}

