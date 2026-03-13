---
title: OpenClaw
description: "An AI-native personal operations platform. Multi-agent orchestration, coding agents, personal automation — running locally, operated by AI."
icon: "paw"
order: 3
---

## What is OpenClaw?

OpenClaw is an AI-native personal operations platform — a system for orchestrating AI agents that manage your digital life. It runs locally on your machine, connects to your tools and services, and operates semi-autonomously with human oversight.

Think of it as an AI operating system: a layer that coordinates multiple specialized agents (coding, communications, scheduling, research) under a unified interface.

## Why it matters

Most AI tools are single-purpose. You have a coding agent here, a writing assistant there, a separate tool for email. OpenClaw's thesis is that these should be **coordinated** — a unified agent layer that understands your context across domains.

Key differentiators:
- **Local-first** — runs on your machine, your data stays yours
- **Multi-agent** — orchestrates specialized agents instead of trying to be one monolithic system
- **AI-operated** — the AI manages the operations; humans provide judgment and oversight
- **Extensible** — skill-based architecture for adding new capabilities
- **Cross-platform** — works across communication channels (Telegram, Discord, Slack)

## Architecture

OpenClaw follows a hub-and-spoke model:
- **Gateway** — central daemon that manages sessions and routing
- **Agents** — specialized instances (personal assistant, coder, knowledge manager)
- **Skills** — pluggable capabilities that agents can use (email, calendar, GitHub, etc.)
- **Sessions** — context-aware conversations across channels

## Use cases

- Personal AI assistant with full access to your digital tools
- Coding agent orchestration (delegating tasks to Claude Code, Codex, etc.)
- Automated monitoring and proactive notifications
- Multi-channel communication management
- Personal knowledge management with AI-powered organization

## Getting started

OpenClaw is available via npm/Homebrew and runs on macOS and Linux. Check the [official documentation](https://github.com/openclaw) for setup instructions.

## Related content

- [Open Source AI Agents](/topics/open-source-ai-agents) — The broader agent landscape
- [Workflows & Orchestration](/topics/workflows-orchestration) — Multi-agent coordination patterns
