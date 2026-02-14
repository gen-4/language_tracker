defmodule Api.Repo.Migrations.CreatePost do
  use Ecto.Migration

  def change do
    create table("post") do
      add :message, :string

      timestamps()
    end
  end
end
