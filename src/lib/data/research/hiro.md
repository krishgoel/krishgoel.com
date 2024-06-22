---
title: "HIRO: Hierarchical Information Retrieval Optimization"
authors: ["Krish Goel", "Mahek Chandak"]
published_in: "arXiv (arXiv: 2406.09979)"
abstract: Large Language Models (LLMs) excel in natural language tasks but face limitations due to static training datasets, resulting in outdated or contextually shallow responses. Retrieval-Augmented Generation (RAG) addresses this by integrating real-time external knowledge, enhancing model accuracy and credibility, especially for knowledge-intensive tasks. However, RAG-enhanced LLMs struggle with long contexts, causing them to "choke" on information overload, compromising response quality. Recent RAG applications use hierarchical data structures for storing documents, organized at various levels of summarization and information density. In this context, we introduce HIRO (Hierarchical Information Retrieval Optimization), a novel querying approach for RAG applications using hierarchical structures for storing documents. HIRO employs DFS-based recursive similarity score calculation and branch pruning to minimize the context returned to the LLM without informational loss. HIRO outperforms existing querying mechanisms on the NarrativeQA dataset by an absolute performance gain of 10.85%.
# date: 17.06.2024
time: June 2024
description: Technically, this was my first publication. Our college has extremely limited research opportunities and we could not find other professors/researchers for guidance, so Mahek and I set out completely on our own to write this paper.
url: https://arxiv.org/abs/2406.09979
---