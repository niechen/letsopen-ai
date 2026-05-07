---
title: Coding Agents
description: "AI agents that write, review, and ship code. From CLI tools to IDE integrations — the new wave of AI-powered software development."
icon: "code"
order: 2
---

## The coding agent revolution

Coding agents are AI systems purpose-built for software development. Unlike simple autocomplete or chat-based code generation, coding agents can understand codebases, plan changes across multiple files, execute commands, run tests, and iterate on their own output.

They represent the most mature category of AI agents — because code is the perfect proving ground. It's structured, testable, and has clear success criteria.

## What makes a coding agent

A true coding agent goes beyond code generation:

- **Codebase understanding** — reads and navigates existing code, understands project structure
- **Multi-file editing** — plans and executes changes across multiple files
- **Tool use** — runs shell commands, tests, linters, build tools
- **Iterative refinement** — fixes errors based on feedback loops
- **Context management** — handles large codebases without losing track

## The current landscape

### CLI-first agents
Terminal-native agents that work directly in your development workflow.

**Codex CLI** (OpenAI) — Agentic coding in the terminal with sandboxed execution
**Claude Code** (Anthropic) — Deep codebase understanding with extended thinking
**Gemini CLI** (Google) — Google's entry into terminal-based coding agents
**Aider** — Open source pair programming in the terminal

**Source posture:** Codex CLI, Gemini CLI, and Aider are open source clients. Claude Code is proprietary but important as a workflow-quality benchmark.

### IDE-integrated agents
Agents that work inside your editor, blending AI with your existing workflow.

**Continue** — Open source AI code assistant for VS Code and JetBrains
**Cursor** — AI-first code editor (partially open source)
**Copilot** — GitHub's AI pair programmer (closed source, included for comparison)

### Specialized code agents
**SWE-Agent** — Automated software engineering for issue resolution
**OpenHands** — Open platform for software development agents
**Devon** — Open source pair programmer focused on real-world tasks

## How to choose a coding agent

Choose by workflow boundary, not by model preference alone.

- **Use an open source client** when inspectability, extensibility, or self-hostable workflow control matters.
- **Use sandboxed execution** when you want the agent to run commands with stronger guardrails.
- **Use an IDE agent** when the human should stay inside editor review loops.
- **Use a CLI agent** when the task spans files, tests, build commands, and repository operations.
- **Use a proprietary benchmark tool** when quality matters now and source posture is less important than capability.

For teams building agent products, coding agents are a useful proving ground because the work is observable: diffs, tests, logs, commits, and reviews make failure easier to inspect.

## What to watch

- CLI agents becoming the default interface for experienced developers
- Multi-agent code review pipelines
- Agents that can manage entire repositories, not just files
- Integration with CI/CD for automated issue-to-PR workflows
