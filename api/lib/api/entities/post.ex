defmodule Api.Post do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :message, :inserted_at, :updated_at]}

  schema "post" do
    field :message, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:message])
    |> validate_required([:message])
  end
end
