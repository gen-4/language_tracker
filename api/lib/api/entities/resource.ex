defmodule Api.Resource do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder,
           only: [:id, :title, :type, :link, :time, :pages, :inserted_at, :updated_at]}

  schema "resource" do
    field :title, :string
    field :type, Ecto.Enum, values: [:video, :text, :podcast]
    field :link, :string
    field :time, :integer
    field :pages, :integer
    belongs_to :user, Api.User, on_replace: :delete

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(resource, attrs) do
    resource
    |> cast(attrs, [:title, :type, :link, :time, :pages])
  end
end
