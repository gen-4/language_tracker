defmodule Api.Repo.Migrations.CreateRole do
  use Ecto.Migration

  def change do
    create table("role") do
      add :name, :string, null: false
    end
  end
end
