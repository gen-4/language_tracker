defmodule ApiWeb.Router do
  use ApiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :api_auth do
    plug ApiWeb.AuthPipeline
  end

  scope "/api", ApiWeb do
    pipe_through :api

    post "/login", AuthController, :login
    post "/signup", AuthController, :signup
  end

  scope "/api", ApiWeb do
    pipe_through [:api, :api_auth]

    get "/posts", ForumController, :get_posts
    post "/post", ForumController, :create_post
    post "/resource", ResourceController, :create_resource
    get "/resources", ResourceController, :get_resources
    delete "/resource/:id", ResourceController, :delete_resource
  end

  # Enable LiveDashboard in development
  if Application.compile_env(:api, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: ApiWeb.Telemetry
    end
  end
end
