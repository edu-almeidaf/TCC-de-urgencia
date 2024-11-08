<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAdminRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->user()->role === 'admin';
    }

    public function rules()
    {
        return [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|unique:users,email,' . $this->route('id'),
            'cpf' => 'sometimes|string|size:11|unique:users,cpf,' . $this->route('id'),
            'password' => 'nullable|string|min:8|confirmed'
        ];
    }
}
