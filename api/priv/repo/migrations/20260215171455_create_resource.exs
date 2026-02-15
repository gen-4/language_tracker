defmodule Api.Repo.Migrations.CreateResource do
  use Ecto.Migration

  def change do
    create table("resource") do
      add :title, :string, null: false
      add :type, :string, null: false
      add :link, :string
      add :time, :integer
      add :pages, :integer
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end
  end

  def down do
    drop table("resource")
  end
end
