defmodule Api.Repo.Migrations.AlterUsersResourceAddLanguage do
  use Ecto.Migration

  def up do
    alter table(:users) do
      add :current_language, :string
    end

    alter table(:resource) do
      add :language, :string, null: false, default: "en"
    end

    execute """
      UPDATE resource SET language = 'es' WHERE language = 'en'
    """
  end
end
