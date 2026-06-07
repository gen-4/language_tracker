defmodule ApiWeb.AuthPipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :api,
    module: Api.Auth.Guardian,
    error_handler: ApiWeb.AuthErrorHandler

  plug Guardian.Plug.VerifyHeader, scheme: "Bearer"
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end
