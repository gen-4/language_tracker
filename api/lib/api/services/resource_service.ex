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
        Logger.warning("Validation error creating resource: #{inspect(changeset.errors)}")
        {:error, changeset}

      {:ok, resource} ->
        {:ok, resource}
    end
  end

  def delete_resource(id) do
    case Repo.get(Resource, id) do
      nil ->
        Logger.warning("Resource was not found to delete it: #{id}")
        {:error, :not_found}

      resource ->
        case Repo.delete(resource) do
          {:ok, resource} ->
            {:ok, resource}

          {:error, changeset} ->
            Logger.error("Error removing resource[#{id}]: #{inspect(changeset.errors)}")
            {:error, :validation_error}
        end
    end
  end
end
