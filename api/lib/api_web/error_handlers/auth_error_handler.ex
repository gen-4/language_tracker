defmodule ApiWeb.AuthErrorHandler do
  use ApiWeb, :controller

  def auth_error(conn, {:invalid_token, _reason}, _opts) do
    conn
    |> put_status(:unauthorized)
    |> json(%{error: "Unauthorized"})
  end

  def auth_error(conn, {:token_expired, _reason}, _opts) do
    conn
    |> put_status(:unauthorized)
    |> json(%{error: "Token expired"})
  end

  def auth_error(conn, {_type, _reason}, _opts) do
    conn
    |> put_status(:unauthorized)
    |> json(%{error: "Unauthorized"})
  end
end
