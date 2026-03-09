---
title: "The open source AI stack, explained"
description: "A practical guide to the layers of the open source AI ecosystem — from models to infrastructure to agents. What each layer does and the best tools in each."
pubDate: 2026-03-09
tags: ["guide", "infrastructure", "tools", "models"]
hub: "ai-infrastructure"
---

If you're building with open source AI, you're assembling a stack. Understanding the layers — and the best tools at each level — is the fastest way to make good decisions.

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

## Layer 3: Orchestration & frameworks

The middleware that connects models to applications — handling chains, memory, retrieval, and agent logic.

- **LangChain / LangGraph** — most popular LLM application framework
- **LlamaIndex** — data-centric framework for retrieval
- **Haystack** — end-to-end NLP/LLM pipelines

**Key decision:** Do you need a framework at all? For simple applications, direct API calls are simpler. Frameworks earn their complexity when you're building agents, RAG systems, or multi-step workflows.

## Layer 4: Data & retrieval

Vector databases and retrieval systems that give models access to your data.

- **Qdrant** — fast, production-ready vector database
- **Chroma** — simple embedded vector store
- **Weaviate** — full-featured vector search engine
- **pgvector** — PostgreSQL extension (use what you already have)

**Key decision:** Start with pgvector or Chroma unless you need specialized vector search at scale.

## Layer 5: Agents

Autonomous or semi-autonomous systems that use models to reason, plan, and act.

**Coding agents:** Codex CLI, Claude Code, Aider
**General agents:** OpenClaw, Open Interpreter
**Multi-agent:** CrewAI, AutoGen, LangGraph agents

**Key decision:** Start with a specific use case (coding is the most mature). Don't build a "general agent" until you understand the patterns.

## Layer 6: Tools & interfaces

The user-facing layer — how humans interact with AI systems.

- **Chat interfaces** — Open WebUI, Jan, LibreChat
- **IDE integrations** — Continue, Cursor
- **CLI tools** — Codex CLI, Claude Code, Aider
- **Automation** — n8n, Activepieces (with AI nodes)

## Putting it together

A practical open source AI stack for a builder in 2026 might look like:

1. **Ollama** for local model running
2. **Qwen 2.5 32B** as a strong general-purpose model
3. **Claude Code** or **Codex CLI** for coding assistance
4. **pgvector** for any RAG needs
5. **OpenClaw** for personal AI operations

You don't need every layer. Start with what solves your immediate problem and add complexity only when you need it.

---

*For specific tool recommendations, see our guide: [Best open source AI tools for builders (2026)](/guides/best-open-source-ai-tools-2026).*
