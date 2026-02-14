defmodule Api.User do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :username, :inserted_at, :updated_at]}

  schema "user" do
    field :username, :string
    field :hashed_password, :string
    field :password, :string, virtual: true
    many_to_many :roles, Api.Role, join_through: "user_roles", on_replace: :raise

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :password])
    |> validate_required([:username])
    |> validate_length(:username, min: 3)
    |> validate_length(:password, min: 5)
    |> put_assoc(:roles, attrs[:roles] || [])
    |> hash_password()
  end

  @doc false
  def registration_changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :password])
    |> validate_required([:username, :password])
    |> validate_length(:username, min: 3)
    |> validate_length(:password, min: 5)
    |> put_assoc(:roles, attrs[:roles] || [])
    |> hash_password()
  end

  defp hash_password(changeset) do
    case get_change(changeset, :password) do
      nil ->
        changeset

      password ->
        put_change(changeset, :hashed_password, Bcrypt.hash_pwd_salt(password))
    end
  end
end
