defmodule Api.ForumService do
  require Logger
  alias Api.Repo
  alias Api.Post

  def list_posts() do
    Repo.all(Post)
  end

  def create_post(post) do
    case %Post{}
         |> Post.changeset(post)
         |> Repo.insert() do
      {:error, changeset} ->
        Logger.warning("Validation error creating post: #{inspect(changeset.errors)}")
        {:error, changeset}

      {:ok, post} ->
        {:ok, post}
    end
  end
end
