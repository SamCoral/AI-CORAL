# AI CORAL

AI CORAL is a web-based AI workspace with a dark, responsive interface, email sign-in, model selection, and saved conversation history.

## Project structure

- `public/` — browser interface, styles, and sign-in page
- `api/` — conversation and model endpoints
- `migrations/` — PostgreSQL schema
- `hatchable.toml` — Hatchable authentication, AI-provider, and configuration settings

## Hosting

This project is currently configured for [Hatchable](https://hatchable.com/). Deploy it through Hatchable so its runtime SDK, authentication, database, and provider configuration are available.

## AI provider setup

The project declares a required AI provider in Hatchable project setup. Configure a supported provider there and keep provider credentials in the platform's secret/provider settings. Do not place real API keys in source files or commit them to Git.

`.env.example` contains placeholders only; it does not configure Hatchable automatically.

## Current implementation notes

The current frontend submits prompts to `POST /api/chat`. The source snapshot currently includes conversation and model endpoints, but does not include an `api/chat` handler. Chat generation will require that route to be implemented and connected to the configured AI provider before prompt replies work end-to-end.

Image generation and image understanding also require explicit backend/provider integration; the presence of UI controls alone does not enable those capabilities.

## Local development

This repository contains the Hatchable-oriented source. It is not a standalone Node project with a package manifest. Use the Hatchable runtime for a faithful run, or adapt the backend SDK calls before running it on another platform.
