# ios-bug-reporter

> A GitHub App built with [Probot](https://github.com/probot/probot) that iOS Bug Reports to GitHub Issues

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t ios-bug-reporter .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> ios-bug-reporter
```

## Contributing

If you have suggestions for how ios-bug-reporter could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2024 Roscoe Rubin-Rottenberg
