defmodule ApiWeb.ForumController do
  use ApiWeb, :controller

  alias Api.ForumService

  def get_posts(conn, _params) do
    # This is how to get the user from the bearer
    #  TODO: Remove when used somewhere else
    # user = Guardian.Plug.current_resource(conn)

    posts = ForumService.list_posts()
    json(conn, posts)
  end

  def create_post(conn, post_params) do
    case ForumService.create_post(post_params) do
      {:ok, post} ->
        conn
        |> put_status(:created)
        |> json(post)

      {:error, _} ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: "Validation error"})
    end
  end
end
