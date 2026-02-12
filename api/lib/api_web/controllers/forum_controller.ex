defmodule ApiWeb.ForumController do
  use ApiWeb, :controller

  alias Api.ForumService

  def get_posts(conn, _params) do
    posts = ForumService.list_posts()
    json(conn, posts)
  end

  def create_post(conn, post_params) do
    case ForumService.create_post(post_params) do
      {:ok, post} -> json(conn, post)
      {:error, _} -> json(conn, %{status: 400, error: "Validation error"})
    end
  end
end
