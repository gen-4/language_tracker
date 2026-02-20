defmodule ApiWeb.ResourceController do
  use ApiWeb, :controller

  alias Api.ResourceService

  def get_resources(conn, _params) do
    resources = ResourceService.list_resources()
    json(conn, resources)
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
    case ResourceService.delete_resource(id) do
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
end
