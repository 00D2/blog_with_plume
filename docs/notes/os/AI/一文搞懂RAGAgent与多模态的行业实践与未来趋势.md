---
createTime: 2025/05/04 21:33:13
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/VY8SELNGe96fpHIJvruyicw5Q9fM7qjauzkNqpUhoExApX6CjicvO1BibsAlzIWjcP8flPFzrKoIUgEBibYII2foBQ/0?wx_fmt=jpeg)

#  一文搞懂：RAG、Agent与多模态的行业实践与未来趋势

原创  蒋进  [ 腾讯云开发者 ](javascript:void\(0\);)

__ _ _ _ _

![图片](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe95SB0T66ibF7I3duzQHSYOPnWAHY8fqLCbgJFvo4DFqD9LlTkzicRuia1qyvyTsODGAmOrGl4TwxFMhg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)
![图片](https://mmbiz.qpic.cn/mmbiz_gif/VY8SELNGe96srmm5CxquJGSP4BbZA8IDLUj8l7F3tzrm8VuILsgUPDciaDLtvQx78DbkrhAqOJicxze5ZUO5ZLNg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp)  

👉  目录

  

1  RAG：大模型触手

2  Agent：大模型集成体

3  多模态技术应用

4  大模型未来发展趋势

  


大模型作为产业变革的核心引擎。通过RAG、Agent与多模态技术正在重塑AI与现实的交互边界。三者协同演进，不仅攻克了数据时效性、专业适配等核心挑战，更推动行业从效率革新迈向业务重构。本文将解析技术演进脉络、实战经验与未来图景，为读者提供前沿趋势的全局视角与产业升级的实践指引。  
关注腾讯云开发者，一手技术干货提前解锁👇  

大模型技术正加速渗透至产业核心场景，成为驱动数字化转型的智能引擎。全球机器学习大会（ML-Summit）聚焦大模型技术的创新突破与产业实践，深入探讨其前沿方向与落地路径。作为AI发展的核心驱动力，  检索增强生成（RAG）通过动态知识融合技术突破大模型的静态知识边界；  智能体（Agent）借助自主决策与多任务协同能力重构人机协作范式；  多模态大模型
则依托跨模态语义理解技术解锁复杂场景的落地潜力。三者协同演进，不仅攻克了数据时效性、隐私安全与专业适配等关键难题，更在医疗诊断、金融风控、智能制造等领域催生从效率革新到业务重构的行业级变革。  
![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS295OxKS27XEn2GWiciadInenOqnGX9lwZ9ia7oibXLcaKibGmB2npCZhSWNuA/640?wx_fmt=png&from=appmsg)

ML-Summit会议大模型内容分布

  

RAG：  大模型的动态知识引擎，解决模型静态知识边界、时效性与可信度问题。

Agent：  大模型的智能执行中枢，赋予模型自主规划、决策与工具调用能力。

多模态：  大模型的感知升级底座，突破单一模态理解限制，实现真实世界全息认知。

  

知识增强（RAG）→ 行为智能（Agent）→ 感知升级（多模态）→ 完整智能体

  

  


#  01

  

RAG：大模型触手  
RAG（Retrieval-Augmented Generation，检索增强生成）
是一种结合信息检索与生成模型的技术。其核心思想是：在生成答案前，先从外部知识库（如文档、数据库、互联网）中检索相关证据，再基于检索结果和用户输入生成更准确、可靠的回答。如下图所示为一个最简RAG示意图。  
![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS29RXJhv3rR7OYZwtkvx9bXHt2zFVOokYddfex5x7lMksmHVmTMmGF1fw/640?wx_fmt=png&from=appmsg)
（  注：图源网络）  
从形态上说，LLM充当大脑角色用于生成答案，检索充当触手角色用于收集证据。RAG就是一个带触手（外挂知识库）的大模型系统。  
1.1  为什么需要RAG  

大模型在很多领域表现出色，但依然存在局限性，这些局限性使得RAG成为大模型的重要补充。

  

模型能力：
大模型训练完成后模型的能力就固定了。比如：我们问ChatGPT东方甄选小作文的事情，ChatGPT表示不知道。原因是：GPT-4训练数据知识收集截止到2023年10月份。RAG通过外挂实时知识库，可以有效改善这类问题。


![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS29tKgbWU2NCQwtKYF9ESa5wgXxjibPY0Y5NLXz3f6rsPYhvy8E9g6m9cQ/640?wx_fmt=png&from=appmsg)

ChatGPT时效性

  

数据隐私：  大模型很难覆盖隐私数据和私域数据，本地部署RAG系统，也可以改善此类问题。

可解析性：  RAG检索结果提供事实依据，减少猜测性回答。同时生成答案可标注来源文档，增强可信度。

成本优化：  长上下文模型，处理全文输入成本高，RAG检索关键片段压缩输入长度，使得RAG在处理长文本时更加效。

  

![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS29BBCEIdFuUicHTRIsBwNqvu45qU1Xrxl2bzo5hHBcZPwZpSOvFRibQqqA/640?wx_fmt=png&from=appmsg)

LLM与RAG差异

  

RAG不仅解决大模型的局限性，也带来更高的生成质量和成本优化，RAG可以根据不同领域的需求，定制化地提供专业答案。

  

1.2  RAG存在挑战  
尽管RAG带来了许多优势，但在实际应用中面临一些挑战，特别是在RAG构建过程中。RAG构建包含4个主要步骤：文档转为数据、数据分块、数据向量化、向量存储。  
1.2.1  文本向量化难点  
文档以文字为主，也包含图片、表格、公式等信息。文档中存在成千上百万的文字信息，大量数据后如何对数据分块（涉及权衡文本颗粒度、上下文的完整性）选择适合的文本颗粒度（数据分块）能够平衡检索的精准和召回。  
![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS29439e1xj3OauraB4N0tuO9BpfapkCR8OOHjytJZvESLzM5XXg95zzog/640?wx_fmt=png&from=appmsg)
RAG构建过程中存在的挑战  
1.2.2  多模态文档难点  
多模态文档中图片、图表等结构化多模态内容处理方式更加复杂。如何将不同模态的数据（文本，图像、视频）融合在一起，提高理解的准确性是挑战。  
![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS29Ue7CG4dc3Dyrxl7IapSeGB7noTKR3uI3daZv2FfvHSI7Lw3qBZuHOw/640?wx_fmt=png&from=appmsg)

多模态文档结构复杂  （  注：图源网络）

  

目前针对复杂文档结构处理链路包含四个阶段：文档解析器（ocr识别及坐标、图片识别及坐标、工具解析器等）、文档结构化（为数据建立索引顺序）、文档理解（数据整理为可序列化的结构）。整体看文档的解析链路长，步骤多，内容不好校核。

  

![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS29FV4URXWH1xr0z0BqwlCcGZbP0fZib3iamSYSoRqoEWuXDNcFf4ovss7w/640?wx_fmt=png&from=appmsg)

复杂文档常规解析链路  （  注：图源网络）

  

1.2.2  可控检索难点  
检索错误是RAG应用中的一个常见问题，比如：噪声数据、数据分块（上下文错误处理）、特性向量化过程（BGE能力不足）等等。召回率与精准率是一个对立矛盾体。因此需要对RAG系统做可控处理。  
![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS29Bp2ejcRWxDvKnQno0lSicvVPaGLicI1ia6oaCmEb9x14ykYdXtROKPgZQ/640?wx_fmt=png&from=appmsg)
RAG可控处理一种思路  
1\.  3  RAG发展  
因多模态数据处理与向量化检索的技术瓶颈，RAG系统的稳定性常受制约，因此推动多模态文档的统一化处理范式与新一代检索架构，成为突破RAG能力边界的两大关键路径。  
1.3.  1  多模态文档处理  
在视觉问答（VAQ）任务中，多模态文档的解析需融合文本与布局理解能力。例如，当解析“两个品牌在分辨率参数上的差异”时，模型不仅需识别图像中的文字内容，还需解析文本间的排版逻辑与表格结构信息。若要在回答时提升准确性，需确保模型在处理文本时保留其原始结构特征。  
![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS29iaQA54dIRGHZItmkGywsuECTLdGx4x4ibF7vj4I3RwQewhiad6icQZfPYQ/640?wx_fmt=png&from=appmsg)

多模态模型提取文字及视觉问答

  

多模态处理文档不仅可以将不同模态的数据（文本、图像、表格）映射到同一个语义空间，进而提高数据的可用性和检索效率，也有利于模型对于文档的理解。

  

1.3  .2  基于记忆驱动RAG  
RAG的另一个发展方向是记忆驱动RAG。与传统的基于向量的RAG相比，记忆驱动RAG利用LLM的KV缓存作为动态索引，具备更高的灵活性和适应性。如图所示Standard
RAG与Meno RAG在原理及使用方式存在明显区别。  
![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS291ibAqXf4M9GibkeYRdfK8eQHnCBSP7d7tWg5hCLmibDx6uu2w7G9ogpOw/640?wx_fmt=png&from=appmsg)

向量RAG与Meno RAG的差异

  

使用场景：若需求为静态知识快速检索（如客服标准问答），优先选择向量RAG；BGE（智源通用嵌入模型）、Jina
Embeddings（长文本优化）。若需求为动态交互与终身学习（如个性化医疗助手），探索记忆驱动RAG Memo RAG（智源研究院）：KV缓存压缩 +
动态记忆索引。

  

![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS294reKk8aSQqVlHvqNOZaP7GlwHNtKf5A5kgDUo6kv5kiasb7537bUUIg/640?wx_fmt=png&from=appmsg)

  

  


#  02

  

Agent：大模型集成体  
Agent技术是大模型的重要集成体，能够实现自主执行任务、做出决策和与环境互动。如图所示，海绵宝宝的形象展示一个大模型如何一步步进化为一个超强的智能体。  
![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS29vpfkx6CASn9ibDk2gUE1NrBgzl5FBN5ibEIjiazJKuRDaGz7O3gKgZMuA/640?wx_fmt=png&from=appmsg)
（  注：图源网络）  
2\.  1  Agent概要  
AI agent是指使用 AI
技术设计和编程的一种计算机程序，其可以独立地进行某些任务并对环境做出反应。AI代理可以被视为一个智能体，它能够感知其环境，自己决策和行动来改变环境。如图所示是一个最简Agent系统图。  
![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS294ricsAWecRGN417LnBNTqaqtlDeicprtWFM5FAEHy2cRoaX4IUKzhLAA/640?wx_fmt=png&from=appmsg)

Agent系统图

  

Agent通过结合LLM、规划、反馈和工具，形成一个完整的智能系统。Agent包含感知层、决策层、执行层，最终形成具有自主性、反应性、主动性和社会性。

  

![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS29nhQVyTrzZibnib1rDkb5sChPregVxwo44XOnsu5BAUC8ZTmaPcWRoarg/640?wx_fmt=png&from=appmsg)

  

2\.  2  Agent实践  

已有不少Agent开源项目，通过项目实践可加深对Agent理解。Agent实践分为两种类型：自主智能体和生成智能体。


2.2  .1  自主智能与生成智能  
自主智能体：自主执行任务、做出决策和与环境互动的智能系统。生成智能体：利用生成模型来创造新的数据或内容的智能系统。如图所示，Auto-
GPT（自主智能）自问自答，斯坦福小镇虚拟世界（生成智能）。  
![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS295icr9O2Rb6DQCq9kfWYiaN3umniapcB38icmdPx3Ob2qgCfhic83MThDQhw/640?wx_fmt=png&from=appmsg)  
自主智能体与生成智能体的区别：  
![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS29zs1n5pWibEdfuuYnMjAVzGB7MG9O5GBsa7wTmUasYcB85ibLHDCYBwNw/640?wx_fmt=png&from=appmsg)  
2.2.  2  Agent核心框架  
成熟的Agent框架可降低开发成本，MetaGPT和AutoGen是当前最流行的两个框架。MetaGPT通过为GPT模型分配不同角色来模拟协作的软件公司结构，以处理复杂任务；AutoGen作为开源框架，专注于通过多智能体对话和增强的LLM推理开发大型语言模型应用。  
![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS29wcPUTibgKGG1gD5SlLMZIxvjTkH5BCLW3zowgK7Zia8HiccYGVCmZTDrw/640?wx_fmt=png&from=appmsg)

MetaGPT与AutoGen对比

  

MetaGPT和AutoGen各有特点，MetaGPT：软件公司的“数字CTO”；AutoGen：定制化AI的“乐高工厂。MetaGPT更适合需要全面自动化和协作的软件开发任务，而AutoGen更适合需要灵活定制和对话的LLM应用开发。

  

2.2  .3  Multi-Agent系统  

现实世界任务往往过于复杂，单Agent难以胜任，需要多个Agent协作。以漫画图所示，从一个需求到最终交付的产品。首先：计划、需求分析、框架设计、系统方案、编码实现、功能性测试，最后是产品交付。如此复杂的系统需要多人合作，Multi-
Agent系统在处理复杂任务方面具有显著优势。

  

![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS29TF5Rf2Wgic5LpoLtLsdhoHRGnXRQPrP3EVsvSpnFUlLZbsKrtv9k3gA/640?wx_fmt=png&from=appmsg)

  

单智能体与多智能体，无论在任务类型与核心技术都存在明显差别。


![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS29xyJgR3vg0Fia59V5BwcdUuUjNzL4L5iavuN26ibOdXicBIbAWDXUKSNicIg/640?wx_fmt=png&from=appmsg)  

单智能体与多智能体对比

  

  1. 任务解构能力：通过分布式子任务分工协作，Multi-Agent系统能够分解任务，提高了任务处理的效率。 

  2. 效能突破边界：通过并行架构和冗余容错设计，Multi-Agent系统能够显著提高计算效率和系统鲁棒性。 

  3. 动态环境适应：通过实时交互网络，Multi-Agent系统能够快速适应动态环境，更好地应对复杂变化环境。 

  

2\.  3  Agent应用  
尽管Agent技术在多个领域展示了其强大的应用价值，但我们也面临一些挑战。  
2.3.  1  应用难点  
如图所示显示各方面的挑战，如：技术能力、系统设计、安全性及经济效益。  
![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS29RKAicCVpia1gbXIQRoicVicN6uCaol9KoQsaJibvSw4o1HiaJ3BbomVicy6ibw/640?wx_fmt=png&from=appmsg)  

应对上述问题存在的方案：

  1. 复杂任务规划，通过分层的方式逐步解决复杂任务。 

  2. 动态环境适应：元学习（Meta-Learning）+ 世界模型可以提高Agent在动态环境中的适应能力。 

  3. 多智能体协作：通过博弈论和联邦学习，多智能体系统实现高效的协作。 

  4. 可解释性提升：因果推理模型 + 决策树蒸馏可以提高Agent的可解释性，Agent的决策过程更加透明。 

  5. 价值观对齐：基于人类反馈的强化学习（RLHF）可以解决Agent的价值观对齐问题。 

  

2.3.  2  行业应用  
Agent技术在多个领域展示了其强大的应用价值。  
![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe96fpHIJvruyicw5Q9fM7qjau9fP1YjXSgkAw3X2IP3PCk3JGQXIsajokufcQf65CuUV4KGnll5yPXQ/640?wx_fmt=png&from=appmsg)

Agent行业应用效果

  

Agent的落地应用始终面临真实世界的复杂性挑战。要处理工业质检中的视觉缺陷检测、金融报告中的图表解析等任务，必须突破单模态限制——这正是多模态大模型的技术使命。

  

  


#  03

  

多模态技术应用  

多模态大模型的应用非常广泛，涵盖了多个行业和领域。本文分享三个团队的工作，紫东太初多模态预训练、360团队多模态世界目标检测、腾讯团队视频号多模态审核。

  

3\.  1  紫东太初--多模态任务统一  

将目标检测、分割、OCR等传统CV任务统一到图文大模型中是紫东太初项目中的核心技术之一。使用LLM的自回归统一编码预测，在统一表达的同时，显式增强了图文大模型的局部感知能力。

  

任务设计：  为了加强多模态大模型视觉局部理解能力，在MLLM回归任务中统一传统CV任务，数据集新增了900k条
包含box，mask，细粒度标准的定位数据。不同的多模态任务通过指令跟随实现，比如指代检测、指代分割等。

  

![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS294UxrsafQrjWUibmpLo7MUF62ddpmPXcKO78BovHO20f9ia1M3WnArqpg/640?wx_fmt=png&from=appmsg)

CV与文本任务统一  （注：  紫东太初团队在ML-Summit大会分享  ）

  

训练策略：
第一阶段使用图文数据对，实现模型跨模态间对齐；第二阶段，使用多模态指代任务以及一系列细粒度任务，增强模型数据能力。第三阶段，运用强化学习，让模型更好跟随用户指令，明白使用意图。

  

![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS297WPOZiaF0UDEOuo8lNVnG4qic9hQM8ZN7VtgMMFrwt9Hz7GALsxa9Jmg/640?wx_fmt=png&from=appmsg)

不同阶段训练策略  （注：  紫东太初团队在ML-Summit大会分享  ）

  

模型效果：
训练多模态大模型不仅有优秀的通用能力，也拥有视觉定位功能。视觉Grounding任务超越同期最优定位优化模型CogVLM-17B首次在目标检测、开放目标计数任务上精度超越多个目标检测、目标计数专有模型。

  

![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS29icnf8ejCN3ViaQHuusNxu2V3xttR9j9iaY0ib44W6icMWndqv2fAGvcxnKw/640?wx_fmt=png&from=appmsg)

  

3.2  360研究院--开放世界目标检测  

360研究院的开放世界目标检测技术，已广泛应用于智能硬件、自动驾驶等领域。传统小模型因泛化能力不足难以应对开放场景的检测需求，而该任务恰恰是多模态大模型构建通用感知能力的关键环节。检测能力为何成为多模态大模型的必备属性？其必要性主要体现在以下四方面：

  

![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS29laHmbCzOZ7Bb0HicNWIWxfVe51OnmiaknjkZcBTF9uRWawWTJyt1nyNQ/640?wx_fmt=png&from=appmsg)

  

尽管目标检测能够帮助多模态大模型提升能力，但在实际应用中也需要解决以下几个挑战
。首先是数据获取与标注瓶颈，未知类别数据稀缺。其次是数据分布复杂性挑战，长尾类别识别困境。最后是模型能力跨类迁移能力弱，环境适应性不足。  
3\.  3  腾讯--多模态视频号审核  
随着视频号平台内容生态的快速扩张，视频内容及用户评论数量呈现持续高速增长态势，而人工审核（人审）在应对海量审核任务时正面临明显的效率瓶颈与质量挑战。为有效提升内容审核的时效性与准确性，亟需构建覆盖算法模型优化、审核机制创新、标准体系完善及数据可解析性提升等维度的综合解决方案。

  

模型层面：  引入垂类大模型。

强大的自然语言处理能力，准确识别潜在的  违规  信息。多模态模型可以多种类型的数据，全面覆盖审核需求。

  

审核层面：  分甬道审核流程。

疑似低违规（白甬道）：对于疑似违规程度低的内容，简化审核流程，减少人工干预，从而大幅提高审核效率。

疑似高违规（黑甬道）：对于疑似违规程度高的内容，并提供违规信息的预警，帮助审核员集中精力处理高违规内容。


![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe96fpHIJvruyicw5Q9fM7qjaupTsWr1YfALWNYWafYqZv1Uz9cxslf66VcrdMpJQaDQny9qkUHtg4Ng/640?wx_fmt=png&from=appmsg)

视频号审核系统解决方案

  

多维度特征输入：  视频图片，文本内容（标题、图片OCR、ASR、评论）等多维度数据，帮助模型更准确地判断是否有害。

模型基座预训练：  模型辅助+人工标注的方式构建垂类场景预训练数据集，选择通用多模态基座在垂类数据上预训练。

数据优化与微调：  基于  人工审核反馈，进行了多轮迭代优化训练，确保其在实际应用中具备更高的准确性和鲁棒性。

  

![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe96fpHIJvruyicw5Q9fM7qjauLThMkDnXtXy8gs2xtZHZNZ6Z5oPr2kj78MKfqic3YeYDVpJuEw5ia9aQ/640?wx_fmt=png&from=appmsg)

多元信息数据流融合

  

腾讯视频审核系统融合文本RAG（政策库检索）与多模态内容理解，通过审核Agent实现违规内容主动拦截。

  

  


#  04

  

大模型未来发展趋势  

  * 算法层面：模型将从网络架构、动态可学习、多模态对齐统一展现出全模态能力（AGI） 

  * 产品层面：将会看到越来越多以大模型为基础复杂系统，具有人机协同交互能力。 

  * 领域层面：在各垂类领域深度结合，推动社会资源的重构。能力由软到硬，AI机器人将直接用于真实世界。 

  

![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe94T5HqAwtfOVyxziaJEuMS29UkjNtY5SqzL8XpPKibpHbwxiaFXAb7tGsfibtnOLBDN4iarUdaN9xHPVZQ/640?wx_fmt=png&from=appmsg)

  

未来大模型将呈现三螺旋发展：RAG向多模态知识图谱演进，构建虚实融合的认知网络；Agent向具身智能进化，形成环境自适应决策系统；多模态向神经符号系统升级，实现可解释的感知推理。三者深度融合将催生新一代产业智能体，在手术机器人、智能电网等场景实现感知-
认知-决策-执行的完整闭环。  
备注：  文章部分图片源于互联网及公开论文，多模态任务统一章节图示来源于紫东太初团队在ML-Summit大会分享。  
-End-  原创作者｜  蒋进    
感谢你读到这里，不如关注一下？  👇

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe95UnhD9f7ia4T3ufXM1liaxxffiaEy41n0icohEC2qDS05icapaN4iaTVfsClibPRmqOjNW6q33PZicAVoSOg/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)

  

📢📢  来领开发者专属福利！点击下方图片直达👇  

![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe96fpHIJvruyicw5Q9fM7qjaupkTNfa2IDoe6Jm7TqVwngJS9TkMIMXhTvyTiaLr7OVTicXP3bDU6utHg/640?wx_fmt=png&from=appmsg)


![图片](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe975eiakGydXqTICibuXvLhyqN5sicc7ia7Cvb8nJGK2gjavrfIIYr5oicm20W8hFPvUdSm8UTzzWiaFco9Q/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)  


你对未来大模型的发展还有什么样的期待？  欢迎评论留言补充。我们将选取1则优质的评论，送出腾讯云定制文件袋套装  1个
（见下图）。5月6日中午12点开奖。  
![图片](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe96Ad6VYX3tia1sGJkFMibI6902he72w3I4NqAf7H4Qx1zKv1zA4hGdpxicibSono28YAsjFbSalxRADBg/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)  
![图片](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe979Bb4KNoEWxibDp8V9LPhyjmg15G7AJUBPjic4zgPw1IDPaOHDQqDNbBsWOSBqtgpeC2dvoO9EdZBQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)
[
![图片](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe97Gl4IjT7zvFIZ2V0mxKlP9bv5WDtwfWaCX55FvNMYKTpwWpUakgRIibAQ9icyGOfZol40zhBvkpzrw/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)
](https://mp.weixin.qq.com/s?__biz=MzI2NDU4OTExOQ==&mid=2247688068&idx=1&sn=4a7216b948c7e2ec5aa4c869cb41359d&scene=21#wechat_redirect)

[
![图片](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe95edia0l8fYyFS2BevUiaExOfAiayX4ibfQpZhcPsy25bze5m3IS6LWayAbhLibqpgItdalpCQiav3Ev2RA/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)
](https://mp.weixin.qq.com/s?__biz=MzI2NDU4OTExOQ==&mid=2247688316&idx=1&sn=163ceb7c773a4d097ae3a0790ffc4b3f&scene=21#wechat_redirect)

[
![图片](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe97Gl4IjT7zvFIZ2V0mxKlP9QMmFkA2I5ILuDrJibAafbMIk3Nec1u1SHnCY7KD0Z13icOmOaYfQiahYg/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)
](https://mp.weixin.qq.com/s?__biz=MzI2NDU4OTExOQ==&mid=2247688195&idx=1&sn=a2ba7737825e9a82d816323338a21b88&scene=21#wechat_redirect)

![图片](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe95pIHzoPYoZUNPtqXgYG2leyAEPyBgtFj1bicKH2q8vBHl26kibm7XraVgicePtlYEiat23Y5uV7lcAIA/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)

预览时标签不可点

微信扫一扫  
关注该公众号



微信扫一扫  
使用小程序

****



****



×  分析

__

![作者头像](http://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe97ibOIthe2pvwt1H0HqX0HVJVFK9WPNQKNsibXynR5yT5S7b45uIpzN7xeZdeJIfOibPjOflZ35rKZyw/0?wx_fmt=png)

微信扫一扫可打开此内容，  
使用完整服务

：  ，  ，  ，  ，  ，  ，  ，  ，  ，  ，  ，  ，  。  视频  小程序  赞  ，轻点两下取消赞  在看  ，轻点两下取消在看
分享  留言  收藏  听过

