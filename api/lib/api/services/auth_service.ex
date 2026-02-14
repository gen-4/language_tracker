defmodule Api.AuthService do
  require Logger
  alias Api.Repo
  alias Api.User

  def login(username, password) do
    user = Repo.get_by(User, username: username)

    cond do
      user && Bcrypt.verify_pass(password, user.hashed_password) ->
        {:ok, user}

      user ->
        Logger.warning("Invalid password [#{user.id}]#{username}")
        {:error, :unauthorized}

      true ->
        Bcrypt.no_user_verify()
        Logger.warning("User not found #{username}")
        {:error, :unauthorized}
    end
  end

  def signup(user) do
    case %User{}
         |> User.registration_changeset(user)
         |> Repo.insert() do
      {:error, changeset} ->
        Logger.warning("Validation error creating post: #{changeset}")
        {:error, changeset}

      {:ok, created_user} ->
        {:ok, created_user}
    end
  end
end
