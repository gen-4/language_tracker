defmodule Api.ResourceService do
  require Logger
  alias Api.Repo
  alias Api.Resource

  def list_resources() do
    Repo.all(Resource)
  end

  def create_resource(user, resource) do
    case user
         |> Ecto.build_assoc(:resources)
         |> Resource.changeset(resource)
         |> Repo.insert() do
      {:error, changeset} ->
        Logger.warning("Validation error creating resource: #{changeset}")
        {:error, changeset}

      {:ok, resource} ->
        {:ok, resource}
    end
  end

  def delete_resource(id) do
    case Repo.get(Resource, id)
         |> Repo.delete() do
      {:ok, _} -> :ok
      {:error, _} -> :error
    end
  end
end
