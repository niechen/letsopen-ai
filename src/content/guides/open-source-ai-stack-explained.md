---
title: "The open source AI stack, explained"
description: "A practical guide to the layers of the open source AI ecosystem — from models to infrastructure to agents. What each layer does and the best tools in each."
pubDate: 2026-03-09
updatedDate: 2026-05-07
tags: ["guide", "infrastructure", "tools", "models"]
hub: "ai-infrastructure"
---

If you're building with open source AI, you're assembling a stack. Understanding the layers — and the best tools at each level — is the fastest way to make good decisions.

The best stack is not the one with the most frameworks. It is the one where the model, data, tools, and evaluation loop can be inspected, replaced, and operated without trapping the product inside one vendor.

Here's the open source AI stack, from bottom to top.

## Layer 1: Models

The foundation. Open-weight language models that you can download, run, fine-tune, and deploy without permission.

**What to know:**
- **Llama** (Meta) — the most widely deployed open model family
- **Qwen** (Alibaba) — excellent coding and multilingual performance
- **Mistral** — strong efficiency, great for resource-constrained deployments
- **DeepSeek** — pushing boundaries in reasoning
- **Gemma** (Google) — optimized for on-device deployment

**Key decision:** Size vs. capability. Smaller models (7B-14B) run locally; larger models (70B+) need serious hardware or cloud deployment.

**Portability boundary:** Keep the application interface separate from the model provider. Even if production uses a hosted API, the product should have a path to run an open-weight model for privacy, cost control, or continuity.

## Layer 2: Inference

The engines that actually run models — optimized for speed, throughput, and efficiency.

**For local use:**
- **Ollama** — simplest path to running models locally
- **llama.cpp** — maximum performance for GGUF models
- **MLX** — Apple Silicon optimized

**For serving:**
- **vLLM** — high-throughput serving with PagedAttention
- **TGI** — Hugging Face's inference server
- **SGLang** — fast serving with structured generation

**Key decision:** Optimize for iteration first, throughput later. Local runners are ideal while you are shaping behavior; serving engines matter when latency, concurrency, cost, or deployment control becomes the bottleneck.

## Layer 3: Orchestration & frameworks

The middleware that connects models to applications — handling chains, memory, retrieval, and agent logic.

- **LangChain / LangGraph** — most popular LLM application framework
- **LlamaIndex** — data-centric framework for retrieval
- **Haystack** — end-to-end NLP/LLM pipelines

**Key decision:** Do you need a framework at all? For simple applications, direct API calls are simpler. Frameworks earn their complexity when you're building agents, RAG systems, or multi-step workflows.

**Portability boundary:** Your prompts, tool schemas, traces, and evaluations should outlive the framework. If switching orchestration libraries would require rewriting product behavior from scratch, the framework is too deeply embedded.

## Layer 4: Data & retrieval

Vector databases and retrieval systems that give models access to your data.

- **Qdrant** — fast, production-ready vector database
- **Chroma** — simple embedded vector store
- **Weaviate** — full-featured vector search engine
- **pgvector** — PostgreSQL extension (use what you already have)

**Key decision:** Start with pgvector or Chroma unless you need specialized vector search at scale.

**Quality boundary:** Retrieval is part of the product, not plumbing. Track which source chunks were retrieved, which ones were used, and whether the final answer cited them correctly.

## Layer 5: Agents

Autonomous or semi-autonomous systems that use models to reason, plan, and act.

**Coding agents:** Codex CLI, Claude Code, Aider
**General agents:** OpenClaw, Open Interpreter
**Multi-agent:** CrewAI, AutoGen, LangGraph agents

**Key decision:** Start with a specific use case (coding is the most mature). Don't build a "general agent" until you understand the patterns.

**Source posture:** Aider, Continue, OpenHands, Open Interpreter, OpenClaw, and many orchestration frameworks are open source. Codex CLI is an open source client backed by OpenAI models. Claude Code and Cursor are influential closed or proprietary tools that are useful comparison points, not the open source baseline.

## Layer 6: Tools & interfaces

The user-facing layer — how humans interact with AI systems.

- **Chat interfaces** — Open WebUI, Jan, LibreChat
- **IDE integrations** — Continue, Cursor
- **CLI tools** — Codex CLI, Claude Code, Aider
- **Automation** — n8n, Activepieces (with AI nodes)

**Key decision:** The interface defines the trust model. A chat box can tolerate ambiguity; a coding agent, workflow agent, or operations agent needs review surfaces, approval gates, and logs.

## Layer 7: Evaluation & observability

The layer that tells you whether the system is getting better or just getting more complex.

- **Golden tasks** — real examples with expected behavior
- **Trace review** — model inputs, tool calls, retrieved sources, and final outputs
- **Regression checks** — small tests that run before prompt, model, or tool changes ship
- **Human review queues** — places where risky actions pause before execution

**Key decision:** Start evaluation before adding autonomy. If you cannot explain why an agent succeeded or failed on ten representative tasks, adding more tools or more agents will mostly hide the problem.

## Putting it together

A practical open source AI stack for a builder in 2026 might look like:

1. **Ollama** for local model running
2. **Qwen, Llama, Mistral, DeepSeek, or Gemma** depending on the task and deployment target
3. **Codex CLI, Aider, Continue, OpenHands, or Claude Code** for coding assistance, depending on source posture and capability needs
4. **pgvector** for the first serious RAG layer
5. **LangGraph, LlamaIndex, Haystack, or direct tool calls** for orchestration, only when the workflow needs it
6. **OpenClaw, n8n, or Activepieces** for personal operations or workflow automation
7. **A small task suite and trace log** before expanding autonomy

You don't need every layer. Start with what solves your immediate problem and add complexity only when you need it.

For an agent app, the minimum useful stack is usually:

- one model runtime
- one narrow job
- one or two scoped tools
- one durable place for state
- one reviewable trace log
- one evaluation set made from real tasks

Everything else should earn its place.

---

*For specific tool recommendations, see our guide: [Best open source AI tools for builders (2026)](/guides/best-open-source-ai-tools-2026).*
