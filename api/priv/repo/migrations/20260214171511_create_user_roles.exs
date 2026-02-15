defmodule Api.Repo.Migrations.CreateUserRoles do
  use Ecto.Migration

  def change do
    create table("user_roles", primary_key: false) do
      add :user_id, references(:users, on_delete: :nothing), null: false
      add :role_id, references(:role, on_delete: :nothing), null: false
    end

    create unique_index(:user_roles, [:user_id, :role_id])
  end
end
