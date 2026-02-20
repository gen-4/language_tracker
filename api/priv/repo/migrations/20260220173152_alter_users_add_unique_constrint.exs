defmodule Api.Repo.Migrations.AlterUsersAddUniqueConstrint do
  use Ecto.Migration

  def change do
    create unique_index(:users, [:username])
  end
end
