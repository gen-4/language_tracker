defmodule ApiWeb.ForumController do
  use ApiWeb, :controller

  alias Api.ForumService

  def get_posts(conn, _params) do
    posts = ForumService.list_posts()
    json(conn, posts)
  end
end
