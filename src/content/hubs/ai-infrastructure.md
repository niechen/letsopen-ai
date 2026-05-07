---
title: AI Infrastructure
description: "The open source tools and platforms that power AI development. From training to deployment, inference to monitoring."
icon: "server"
order: 6
---

## Building blocks of open source AI

AI infrastructure is the plumbing that makes everything else possible. It's the tools for training, fine-tuning, serving, monitoring, and deploying AI systems — and the open source ecosystem here is remarkably strong.

## Key categories

### Inference engines
**vLLM** — High-throughput LLM serving
**TGI** (Hugging Face) — Text Generation Inference
**SGLang** — Fast serving with structured generation
**Triton** — NVIDIA's inference server

### Training & fine-tuning
**Axolotl** — Easy fine-tuning with multiple methods
**Unsloth** — Fast, memory-efficient fine-tuning
**TRL** — Transformer Reinforcement Learning
**torchtune** — PyTorch-native fine-tuning

### Orchestration & pipelines
**LangChain / LangGraph** — LLM application framework
**LlamaIndex** — Data framework for LLM applications
**Haystack** — End-to-end NLP/LLM framework

### Vector stores & retrieval
**Qdrant** — High-performance vector database
**Chroma** — Open source embedding database
**Weaviate** — Vector search engine
**Milvus** — Scalable vector database

### Evaluation & monitoring
**LangSmith** — LLM observability (partially open)
**Phoenix** (Arize) — ML observability
**Promptfoo** — LLM output testing

## Infrastructure decisions for agent apps

Most AI infrastructure choices are trade-offs between control, latency, cost, and operational burden. For agent apps, the most important question is not "what is the best tool?" It is "which boundary needs to stay inspectable and replaceable?"

### Serving boundary

Choose local inference when privacy, offline work, or cost control matters most. Choose hosted open-weight serving when throughput and operational simplicity matter more. Choose a provider fallback when a task needs stronger reasoning or long-context quality than your open stack can reliably provide.

### Retrieval boundary

Start with the data system you already operate. Postgres plus pgvector is enough for many products. Move to Qdrant, Weaviate, or Milvus when retrieval quality, scale, filtering, or operations become real constraints.

### Orchestration boundary

Use direct model calls for simple flows. Use LangGraph or similar state-machine tooling when the agent needs explicit state, retries, approvals, and tool sequencing. Use multi-agent frameworks only when separate roles create real leverage.

### Evaluation boundary

Do not wait for a perfect benchmark. Save real tasks, expected behaviors, traces, and failure cases from the beginning. For agents, regression tests should cover tool use, approval behavior, citation quality, and recovery from tool errors.

## Minimum production checklist

Before an AI app or agent becomes daily infrastructure, the stack should have:

- a known model route for default, fallback, and failure cases
- logs for prompts, model responses, tool calls, and errors
- permission boundaries between read tools and write tools
- a retrieval plan that explains what is indexed, refreshed, and excluded
- an evaluation set built from real user tasks
- deployment rollback or model rollback
- license and data-policy review for models, tools, and hosted services
- a human approval path for irreversible actions

If this checklist feels too heavy, the product is probably not ready for autonomy. Narrow the job before adding more infrastructure.

## What to watch

- Inference optimization making larger models practical on smaller hardware
- Unified serving platforms that handle multiple model types
- Evaluation becoming a first-class concern (not an afterthought)
- Cost of self-hosting continuing to drop

## Related content

- [The open source AI stack, explained](/guides/open-source-ai-stack-explained) — Layer-by-layer stack overview
- [Open Models](/topics/open-models) — Model routing and readiness checks
- [Open Source AI Agents](/topics/open-source-ai-agents) — Agent builder paths and maturity signals
