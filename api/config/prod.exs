import Config

# Force using SSL in production. This also sets the "strict-security-transport" header,
# known as HSTS. If you have a health check endpoint, you may want to exclude it below.
# Note `:force_ssl` is required to be set at compile-time.
config :api, ApiWeb.Endpoint,
  force_ssl: [rewrite_on: [:x_forwarded_proto]],
  exclude: [
    # paths: ["/health"],
    hosts: ["localhost", "127.0.0.1"]
  ]

# Do not print debug messages in production
config :logger, level: :info

# Runtime production configuration, including reading
# of environment variables, is done on config/runtime.exs.

config :api,
  max_pagination_size: 50,
  default_pagination_size: 10

# Get secret key from env in production
config :api, Api.Auth.Guardian,
  issuer: "api",
  secret_key: "",
  ttl: {1, :hour}
