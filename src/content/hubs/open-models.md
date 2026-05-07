---
title: Open Models
description: "Open-weight and open-source language models. The foundations that power the open source AI ecosystem."
icon: "brain"
order: 5
---

## The open model landscape

Open models are the foundation of the entire open source AI ecosystem. Without capable, accessible models, nothing else works — no local AI, no open agents, no independent AI infrastructure.

The good news: open models have never been better. The gap between open and closed models continues to narrow, and for many practical tasks, open models are now the right choice.

## Leading model families

### Llama (Meta)
The model family that catalyzed the open source AI movement. Llama 3 and 4 series offer competitive performance across reasoning, coding, and general tasks.

### Qwen (Alibaba)
Strong multilingual models with excellent coding performance. Qwen 2.5 and 3 series are top-tier for their size classes.

### Mistral
European AI lab producing efficient, capable models. Known for strong performance-per-parameter ratios.

### DeepSeek
Research-focused models with strong reasoning capabilities. DeepSeek-V3 and R1 pushed boundaries in open model performance.

### Gemma (Google)
Google's open model family, optimized for efficiency and on-device deployment.

## How to choose a model for an AI app

For builders, the best model is the one that fits the job, deployment boundary, and failure cost. Do not pick by leaderboard rank alone.

Evaluate:

- **Task fit** — coding, retrieval QA, summarization, planning, extraction, or chat
- **Tool use** — whether the model reliably emits structured calls and follows tool results
- **Context length** — whether the task needs long documents, repositories, or conversation history
- **Latency and cost** — whether the app needs interactive speed or can wait for better reasoning
- **Deployment boundary** — local device, private server, hosted open-weight endpoint, or provider fallback
- **License and data policy** — whether the model can be used, modified, hosted, or fine-tuned for the intended product
- **Operational maturity** — quantization support, serving tooling, eval coverage, and community debugging knowledge

## Practical routing patterns

Most serious open source AI apps will use more than one model path.

### Local-first

Use a local model for private context, low-cost iteration, offline work, and tasks where latency matters more than frontier reasoning.

### Hosted open-weight

Use hosted open-weight models when the app needs stronger hardware, higher throughput, or simpler operations while keeping model choice portable.

### Frontier fallback

Use a closed or hosted frontier fallback for tasks where reliability, reasoning depth, or long-context quality matters more than source openness. Keep the boundary explicit so the app remains portable.

### Specialist model

Use smaller specialist models for extraction, reranking, embeddings, moderation, speech, or vision when they outperform a general chat model for that narrow job.

## Agent-specific model checks

Before putting a model inside an agent loop, test whether it can:

- follow a constrained system prompt across multiple turns
- call tools with valid structured arguments
- stop and ask for approval before risky actions
- use retrieved context without inventing unsupported claims
- recover from tool errors
- produce outputs that can be regression-tested

If a model fails these checks, a larger context window or a stronger benchmark score will not automatically make the agent trustworthy.

## What to watch

- Reasoning-specialized open models closing the gap with frontier closed models
- Mixture-of-experts architectures enabling larger models at lower compute
- Fine-tuning and adaptation tooling becoming more accessible
- Open model licensing evolving (truly open vs. restricted open)

## Related content

- [Local AI](/topics/local-ai) — Running models and agents on your own hardware
- [AI Infrastructure](/topics/ai-infrastructure) — Serving, evaluation, retrieval, and deployment layers
- [The open source AI stack, explained](/guides/open-source-ai-stack-explained) — Where models fit in the full builder stack
