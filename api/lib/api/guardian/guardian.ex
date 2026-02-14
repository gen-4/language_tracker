defmodule Api.Auth.Guardian do
  use Guardian, otp_app: :api

  alias Api.User
  alias Api.Repo

  def subject_for_token(user, _claims) do
    {:ok, to_string(user.id)}
  end

  def resource_from_claims(%{"sub" => id}) do
    case Repo.get_by(User, id: id) do
      nil -> {:error, :unauthorized}
      user -> {:ok, user}
    end
  end
end
