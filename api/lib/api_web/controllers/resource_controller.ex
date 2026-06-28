defmodule ApiWeb.ResourceController do
  use ApiWeb, :controller

  alias Api.ResourceService

  def get_resources(conn, params) do
    user = Guardian.Plug.current_resource(conn)

    default_size = Application.get_env(:consts, :default_pagination_size)

    {page, _} = params |> Map.get("page", "1") |> Integer.parse()
    {size, _} = params |> Map.get("size", "#{default_size}") |> Integer.parse()

    {resources, count} = ResourceService.get_resources(user, page, size)

    conn
    |> put_status(:ok)
    |> json(%{resources: resources, count: count})
  end

  def create_resource(conn, resource_params) do
    user = Guardian.Plug.current_resource(conn)

    case ResourceService.create_resource(user, resource_params) do
      {:ok, resource} ->
        conn
        |> put_status(:created)
        |> json(resource)

      {:error, _} ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: "Validation error"})
    end
  end

  def delete_resource(conn, %{"id" => id}) do
    user = Guardian.Plug.current_resource(conn)

    case ResourceService.delete_resource(user, id) do
      {:ok, _} ->
        conn
        |> put_status(:ok)
        |> json(%{msg: "Resouce #{id} has been deleted"})

      {:error, error} ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: error})
    end
  end

  def get_youtube_video(conn, %{"id" => id}) do
    {title, duration} = ResourceService.get_youtube_video(id)

    conn
    |> put_status(:ok)
    |> json(%{title: title, duration: duration})
  end
end
