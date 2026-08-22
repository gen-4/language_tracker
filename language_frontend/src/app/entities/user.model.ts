export interface User {
  id: number,
  username: string,
  inserted_at: Date,
  updated_at: Date,
  current_language: string
}

export interface AuthRequest {
  username: string,
  password: string
}

export interface LoginResponse {
  user: User,
  access_token: string,
  token_type: string
}


