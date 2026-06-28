import Ecto.Query

defmodule Api.ResourceService do
  require Logger
  alias Api.Repo
  alias Api.Resource

  def create_resource(user, resource) do
    case user
         |> Ecto.build_assoc(:resources)
         |> Resource.changeset(resource)
         |> Repo.insert() do
      {:error, changeset} ->
        Logger.warning("Validation error creating resource: #{inspect(changeset.errors)}")
        {:error, changeset.errors}

      {:ok, resource} ->
        {:ok, resource}
    end
  end

  def get_resources(user, page, size) do
    max_size = Application.get_env(:consts, :max_pagination_size)
    default_size = Application.get_env(:consts, :default_pagination_size)

    size =
      case size do
        nil -> default_size
        s when s > max_size -> default_size
        s -> s
      end

    offset = (page - 1) * size

    resources =
      Resource
      |> where(user_id: ^user.id)
      |> limit(^size)
      |> offset(^offset)
      |> Repo.all()

    count =
      Resource
      |> where(user_id: ^user.id)
      |> Repo.aggregate(:count, :id)

    {resources, count}
  end

  def delete_resource(user, id) do
    case Repo.get_by(Resource, id: id, user: user) do
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

  def get_youtube_video(id) do
    html =
      Req.get!("https://www.youtube.com/watch?v=#{id}")
      |> Map.get(:body)

    title =
      case Regex.run(~r/<meta property="og:title" content="([^"]+)"/, html) do
        [_, t] -> t
        _ -> nil
      end

    duration =
      case Regex.run(~r/"lengthSeconds":"(\d+)"/, html) do
        [_, s] -> String.to_integer(s)
        _ -> nil
      end

    {title, duration}
  end
end
