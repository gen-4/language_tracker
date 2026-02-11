defmodule Api.ForumService do
  alias Api.Repo
  alias Api.Post

  def list_posts() do
    Repo.all(Post)
  end
end
