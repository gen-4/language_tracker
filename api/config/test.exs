import Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :api,
  ecto_repos: [Api.TestRepo]

config :api, Api.TestRepo,
  database: "test_db.db",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: 1,
  priv: "priv/repo"

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :api, ApiWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "ERzG1TMXFsY5NQ89wgtegRmOWHbvij5DvGbmrRWZrR5gniJ5c8VBduLtXONhyWRT",
  server: false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime

# Sort query params output of verified routes for robust url comparisons
config :phoenix,
  sort_verified_routes_query_params: true
