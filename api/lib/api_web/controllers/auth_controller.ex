defmodule ApiWeb.AuthController do
  use ApiWeb, :controller

  alias Api.AuthService
  alias Api.Auth.Guardian

  def login(conn, %{"username" => username, "password" => password}) do
    case AuthService.login(username, password) do
      {:ok, user} ->
        {:ok, token, _claims} = Guardian.encode_and_sign(user)

        json(conn, %{
          user: user,
          access_token: token,
          token_type: "Bearer"
        })

      {:error, _} ->
        conn
        |> put_status(:unauthorized)
        |> json(%{error: "Unauthorized"})
    end
  end

  def login_from_token(conn, _params) do
    json(conn, Guardian.Plug.current_resource(conn))
  end

  def signup(conn, user_params) do
    case AuthService.signup(user_params) do
      {:ok, user} ->
        conn
        |> put_status(:created)
        |> json(user)

      {:error, _} ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: "Validation error"})
    end
  end

  def healthcheck(conn, _params) do
    conn
    |> put_status(:ok)
  end
end
