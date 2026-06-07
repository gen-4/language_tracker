defmodule Api.Role do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :name]}

  schema "role" do
    field :name, :string
    many_to_many :user, Api.User, join_through: "user_roles", on_replace: :raise
  end

  @doc false
  def changeset(role, attrs) do
    role
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
