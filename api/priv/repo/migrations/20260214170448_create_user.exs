defmodule Api.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table("users") do
      add :username, :string, null: false
      add :hashed_password, :string, null: false

      timestamps()
    end
  end
end
