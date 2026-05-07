---
title: Open Source AI Tools
description: "Practical tools for builders. The best open source software for working with AI models, agents, and workflows."
icon: "tools"
order: 7
---

## Tools that matter

The open source AI ecosystem is vast, but most builders only need a handful of well-chosen tools. This hub tracks the tools that are actually worth using — not every GitHub repo with "AI" in the name.

## Selection criteria

We focus on tools that are:
- **Actively maintained** — regular commits, responsive maintainers
- **Actually useful** — solves a real problem, not a demo
- **Well-documented** — you can get started without reading the source
- **Production-viable** — stable enough for real workloads

## Categories

### Local model runtime
Use these when you need private, cheap, or offline iteration.

**Start with:** Ollama for ease, llama.cpp for performance, MLX for Apple Silicon.

### Coding agents
Use these when the work happens inside a repository and success can be checked with tests, builds, diffs, or review.

**Start with:** Aider for the model-flexible open source baseline, Codex CLI for an open source sandboxed client, Continue for editor integration, and Claude Code as a proprietary workflow-quality benchmark.

### Agent orchestration
Use these when an app needs explicit state, tool calls, approvals, retries, or multi-step workflows.

**Start with:** a small custom loop for simple agents, LangGraph for explicit state transitions, CrewAI when role-based multi-agent structure is the actual product requirement.

### Retrieval and memory
Use these when the model needs durable project or user context that does not fit in the prompt.

**Start with:** Postgres plus pgvector if you already use Postgres, Chroma for local prototypes, Qdrant for production vector search.

### Evaluation and observability
Use these before expanding autonomy.

**Start with:** saved traces, golden tasks, Promptfoo for regression checks, Phoenix when you need deeper observability.

### Workflow automation
Use these when the product is less about an autonomous agent and more about repeatable tool coordination.

**Start with:** n8n or Activepieces for visual workflows, typed functions or scripts when the workflow should live inside the application codebase.

## Selection map

If you are building an AI app or agent from scratch:

1. Pick the user job before the framework.
2. Choose the smallest model/runtime path that can complete the job.
3. Add tools one permission boundary at a time.
4. Add retrieval only when the task repeatedly needs durable context.
5. Add evaluation before broad autonomy.
6. Add multi-agent orchestration only when separate roles or parallel work create leverage.

## What not to optimize too early

Early agent projects often waste time on the wrong layer. Do not start with:

- a complex multi-agent framework before the job is clear
- a vector database before you know what should be retrieved
- fine-tuning before prompts, tools, and evals are stable
- a model abstraction before you have a real reason to switch models
- broad credentials before the agent has proven it can use narrow tools safely

Good open source AI tooling should make the system more inspectable, portable, and governable. If a tool adds magic but hides behavior, treat it as a risk until proven otherwise.

## Related content

- [AI Infrastructure](/topics/ai-infrastructure) — The platforms and engines underneath
- [Open Source AI Agents](/topics/open-source-ai-agents) — Builder paths for agent systems
- [Best open source AI tools for builders (2026)](/guides/best-open-source-ai-tools-2026) — Our curated guide
