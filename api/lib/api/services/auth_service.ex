defmodule Api.AuthService do
  require Logger
  alias Api.Repo
  alias Api.User
  alias Api.Role

  def login(username, password) do
    user =
      Repo.get_by(User, username: username)
      |> Repo.preload(:roles)

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
    role = Repo.get_by(Role, name: "User")

    case role do
      nil -> Logger.warning("Role User does not exist")
      _ -> :ok
    end

    case %User{}
         |> User.registration_changeset(user)
         |> Ecto.Changeset.put_assoc(:roles, [role])
         |> Repo.insert() do
      {:error, changeset} ->
        Logger.warning("Validation error creating post: #{inspect(changeset.errors)}")
        {:error, changeset}

      {:ok, created_user} ->
        {:ok, created_user}
    end
  end
end
