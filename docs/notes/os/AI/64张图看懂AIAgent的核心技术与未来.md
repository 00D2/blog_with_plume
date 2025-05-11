---
createTime: 2025/04/30 20:04:43
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NW2Yib2v61bgmYNG1qtTMToN59ibFoC6I6ltiboCiadjLK8dzgy2ejhbGwkA/0?wx_fmt=jpeg)

#  64张图，看懂AI Agent的核心技术与未来

原创  猕猴桃  [ 探索AGI ](javascript:void\(0\);)

__ _ _ _ _

嘿，大家好！这里是一个专注于前沿AI和智能体的频道~

  * 原文：A Visual Guide to LLM Agents 
  * 作者：Maarten Grootendorst 
  * 翻译：猕猴桃 & Claude Sonnet 3.7 

#  LLM Agents指南

LLM Agents正变得越来越普及，似乎正在取代我们熟悉的对话式LLM。但是Agents本身其实并不容易，它往往需要多个组件协同工作。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWFoqSLLSp2C6m6CEoUqF86wGhzsZ7IJRz5MwWya1APQe0fBbOmgwdjA/640?wx_fmt=png&from=appmsg)
img

在本文中，通过60多张定制可视化图，你将探索LLM Agents领域、其主要组件以及多Agent框架。

#  什么是LLM Agents？

要理解LLM Agents，让我们首先探索LLM的基本能力。传统上，LLM所做的仅仅是下一个token的预测。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWknLEr2vRQegdoNtbIo2oTmCsAibzw78g6gn45QsyQ7SYHtamVV4ucJQ/640?wx_fmt=jpeg&from=appmsg)
img

通过连续采样多个token，我们可以模拟对话，并使用LLM为我们的查询提供更全面的答案。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWengvJTCItKROVYVO1HticBCdt2Kw6JuhEibEvLJf1wy1U8A0f9le8cew/640?wx_fmt=png&from=appmsg)
img

然而，当我们继续对话时，任何LLM都会展示其主要缺点之一：它不记得对话内容！

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWnz3xrfhS680jAU1Dc8fxr0MEKhOHcMr0hdsvicDEfw58SqqN0mRYJYA/640?wx_fmt=jpeg&from=appmsg)
img

LLM在执行许多其他任务时也常常失败，包括基本的数学运算，如乘法和除法：

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NW8c3XgmMmscKIohYYB1tz9tGUPtMNGJvcHtFLTiaO9iaiavGffIkEURHQQ/640?wx_fmt=jpeg&from=appmsg)
img

这是否意味着LLM很垃圾？当然不是！LLM无需具备所有能力，因为我们可以通过外部工具、记忆和检索系统来弥补其缺点。

通过外部系统，LLM的能力可以得到增强。Anthropic称之为  ** 增强型LLM  ** 。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWqaLNZPcNaibpObwo6smdX1lj3gSANTCDWyjVPGCnqds6YhJmBiaP3qMA/640?wx_fmt=png&from=appmsg)
img

例如，面对数学问题时，LLM可能会决定使用合适的工具（如  ** 计算器  ** ）。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWyplzEEsJL0qkibWSUzib2WFJCedE8cctvdscfu3flXtFfOlypLKBBM2A/640?wx_fmt=jpeg&from=appmsg)
img

那么这种 增强型LLM 是否就是Agent？不完全是，但也有一些相似之处...

让我们从Agents的定义开始：

** Agent  ** 是任何可以被视为通过  ** 传感器  ** 感知其环境并通过  ** 执行器  ** 作用于该环境的事物。

— Russell & Norvig，《人工智能：现代方法》（2016）

Agents与环境交互，通常由几个重要组件组成：

  * ** 环境  ** — Agent交互的世界 
  * ** 传感器  ** — 用于观察环境 
  * ** 执行器  ** — 用于与环境交互的工具 
  * ** 效应器  ** — 决定如何从观察转化为行动的"大脑"或规则 

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWv3EjaK74V1mfOONUxXn7icAeKvQGsAcQRXtM7TY8snjAGibZ2CVxtGEQ/640?wx_fmt=png&from=appmsg)
img

这个框架适用于与各种环境交互的各类Agents，比如与物理环境交互的机器人或与软件交互的AI Agents。

我们可以稍微概括这个框架，使其更适合 增强型LLM。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWo9f6rQaEAA93QyCxO65UdjibcjsPH2VytmWQL7BWO789zQFNaRXDW5w/640?wx_fmt=png&from=appmsg)
img

使用 增强型LLM，Agent可以通过文本输入观察环境（因为LLM通常是  ** 文本模型  ** ），并通过使用工具（如  ** 网络搜索  **
）执行特定操作。

为了选择要采取的行动，LLM Agent有一个重要组件：规划能力。为此，LLM需要能够通过思维链等方法进行"推理"和"思考"。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWISJcOIiaOaLYFjmjNpa6L7gp08ic8jriaTpiaWNEfSob9eUXQf7VricTIkA/640?wx_fmt=png&from=appmsg)
img

利用这种推理行为，LLM Agents将规划出需要采取的必要行动。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWq8FrkfQBd8pUIOyQlQf2Z3v9EDIIcXicKWMFhVwISbA71GyDv3AgnAA/640?wx_fmt=png&from=appmsg)
img

这种规划行为使Agent能够理解背景（  ** LLM  ** ）、规划下一步（  ** 规划  ** ）、采取行动（  ** 工具  **
）并跟踪已采取的行动（  ** 记忆  ** ）。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWWjvibsOJmvibBzyickiaekBBCvSeKvXobto6veZcekbgQpNpzhDp6E0OLA/640?wx_fmt=png&from=appmsg)
img

根据系统的不同，你可以使用具有不同自主程度的LLM Agents。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWgCSdFEbrwzVuWwDelqSvhystIEMgCvyZCo8S2CXakxW869mDR4JbyQ/640?wx_fmt=jpeg&from=appmsg)
img

根据不同人的观点，一个系统越是由LLM决定其行为方式，就越具有"自主性"。

在接下来的部分，我们将通过LLM Agent的三个主要组成部分——  ** 记忆  ** 、  ** 工具  ** 和  ** 规划  **
——探讨各种自主行为方法。

#  记忆

LLM是健忘的系统，或更准确地说，在与它们交互时根本不执行任何记忆行为。

例如，当你向LLM提出一个问题，然后跟进另一个问题时，它不会记得前一个问题。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWOT1jpQ3J966qzXXvpUPibP0nKmvYpjQjIia7PE82d6YOQQ6Aiag1vSqGQ/640?wx_fmt=png&from=appmsg)
img

我们通常将此称为  ** 短期记忆  ** ，也称为工作记忆，它作为（接近）即时上下文的缓冲区。这包括LLM Agent最近采取的行动。

然而，LLM Agent还需要跟踪可能数十个步骤，而不仅仅是最近的行动。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWB624yibQf0AsgE9vEZIY85vkqTYV8hc1EVGkwzvc8NduXqHibS3254BQ/640?wx_fmt=png&from=appmsg)
img

这被称为  ** 长期记忆  ** ，因为LLM Agent理论上可能需要记住数十甚至数百个步骤。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWKNjA4m3RGmDlJmyoST8Q3lrxvZicAqzEB7NAQBLoB2VjwBlUwJhJNiaw/640?wx_fmt=png&from=appmsg)
img

让我们探索几种为这些模型提供记忆的技巧。

##  短期记忆

使短期记忆成为可能的最直接方法是使用模型的上下文窗口，这本质上是LLM可以处理的token数量。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWdRdRBw3onItm61YhtGHibtVRngMwGoAYoppUc7u51kmM1L68dHNsLDg/640?wx_fmt=png&from=appmsg)
img

上下文窗口通常至少有8192个token，有时可以扩展到数十万个token！

大的上下文窗口可用于将完整的对话历史作为输入提示的一部分进行跟踪。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWscQpEQq7mISFr7zZ03JVRgsXKqlsTTolhrKdIpiaibePPvRnZzhaBtTg/640?wx_fmt=png&from=appmsg)
img

只要对话历史适合LLM的上下文窗口，这种方法就可行，是模拟记忆的好方法。然而，与其真正记忆对话，我们实际上是在告诉LLM这个对话是什么。

对于上下文窗口较小的模型，或当对话历史较大时，我们可以使用另一个LLM来总结迄今为止发生的对话。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWP83DAkaBWj63PIyCKWZzt56kpTt07aia8C4n45fRTXqCI69obicUmf7w/640?wx_fmt=png&from=appmsg)
img

通过持续总结对话，我们可以保持会话体积小。这将减少token数量，同时只跟踪最重要的信息。

##  长期记忆

LLM Agents的长期记忆包括需要长期保留的Agent过去的行动空间。

实现长期记忆的常见技术是将所有先前的交互、行动和对话存储在外部向量数据库中。

要构建这样的数据库，首先需要将对话嵌入到捕捉其含义的数值表示中。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWjuicoib0qAgXbDSky25HkiapHHNAZ2DKGb6NaRmFM5u6vBlBGkcKadLPA/640?wx_fmt=png&from=appmsg)
img

建立数据库后，我们可以嵌入任何给定的提示，并通过比较提示嵌入与数据库嵌入来找到向量数据库中最相关的信息。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWvt1a5XYSdwfib4h5fCzJpTJSh1pBFQ3strTZxFAFtyo55icNl8cPHI8Q/640?wx_fmt=png&from=appmsg)
img

这种方法通常被称为  ** 检索增强生成  ** （RAG）。

长期记忆还可以涉及保留不同会话的信息。例如，你可能希望LLM Agent记住它在以前会话中所做的任何研究。

不同类型的信息也可以与不同类型的记忆相关联。在心理学中，有许多类型的记忆需要区分，但《语言Agents认知架构》论文将其中四种与LLM
Agents联系起来。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWMbHYFZOkHP1Ey3NcYZibcgcOLYc4iaXFIKdGEJ57FiclxSJYUibaFaLCqw/640?wx_fmt=png&from=appmsg)
img

这种区分有助于构建主体框架。  _ 语义记忆  _ （关于世界的事实）可能存储在与  _ 工作记忆  _ （当前和最近情况）不同的数据库中。

#  工具

工具允许LLM与外部环境（如数据库）交互或使用外部应用程序（如自定义代码运行）。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWWygBx4t7oMINCtMh5JmeYFq3RE0uq9vjMWX0AW8zeC2z9IClyBT3kg/640?wx_fmt=png&from=appmsg)
img

工具通常有两种用途：  ** 获取数据  ** 以检索最新信息和  ** 采取行动  ** ，如安排会议或订购食物。

要实际使用工具，LLM必须生成与该工具API匹配的文本。我们倾向于期望可以格式化为  ** JSON  ** 的字符串，以便轻松提供给  ** 代码解释器
** 。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWoicPNvkagHkcLpEzJPxoAY0ruriczugRx1yEaaUYr2iaP2R10XVN7dHmw/640?wx_fmt=jpeg&from=appmsg)
img

请注意，这不限于JSON，我们也可以在代码本身中调用工具！

你还可以生成LLM可以使用的自定义函数，如基本乘法函数。这通常被称为  ** 函数调用  ** 。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NW0EwUeq0D4XD34XG0fQQeoonsc2zibXWGOoyvlnZpZN75DwZgWmG0bfw/640?wx_fmt=jpeg&from=appmsg)
img

如果提示正确且全面，某些LLM可以使用任何工具。工具使用是大多数当前LLM都具备的能力。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWuYgag9uX0qZSszdf8C4xxFmwmHzdAc8ibXY01Libs2Z0fUWuH7icR0iaEg/640?wx_fmt=jpeg&from=appmsg)
img

访问工具的更稳定方法是对LLM进行微调（稍后会详细介绍！）。

如果主体框架是固定的，工具可以按特定顺序使用...

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWcXysnksIK0QL1hmU818KCeIo4KKSKu0MM2RQdwqbnUwGEDZIh0hbhg/640?wx_fmt=jpeg&from=appmsg)
img

...或者LLM可以自主选择使用哪种工具以及何时使用。LLM
Agents本质上是修改LLM的生成序列（让LLM自主选择行动/工具，将结果在回馈到生成序列中）。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWqjiblJ10o7lH34cUibQadRsjGd0eT1brEAPWrJCvamjxs4cKlF8XFnBg/640?wx_fmt=jpeg&from=appmsg)
img

换句话说，中间步骤的输出被反馈到LLM中以继续处理。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NW3OMMyzYlYDShPHgHyKhp4QX5sIdvfVNgADCLC44gDS5P4SfQibSrudQ/640?wx_fmt=jpeg&from=appmsg)
img

##  Toolformer

工具使用是增强LLM能力并弥补其缺点的强大技术。因此，近几年关于工具使用和学习的研究迅速增加。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWMBrgCpF6YocoboPXGcu3ibk0JsSqzxKY9z637xicHk5oRkdoR1OqOZpA/640?wx_fmt=jpeg&from=appmsg)
img

随着对工具使用的关注增加，LLM预计将变得更加强大。

这些研究不仅涉及指令要求LLM使用工具，还包括专门训练它们使用工具。

最早采用这种技术的是Toolformer，一种训练用于决定调用哪些API以及如何调用的模型。

它使用  ` [  ` 和  ` ]  ` 标记来指示调用工具的开始和结束。当给定提示，例如"  _ 5乘以3等于多少？  _ "，它开始生成标记，直到达到
` [  ` 标记。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWs6S5icQejKTsIapqicNUoswWcTWobfqRY6KLLvFibxXQlaV73h8ZeCoibw/640?wx_fmt=jpeg&from=appmsg)
img

之后，它生成标记直到达到  ` →  ` 标记，表示LLM停止生成标记。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NW1NRhsxE9DymvZLIV7lvy51NceRO3n0WPl3NqoMvUicpicGzPzckX2VGA/640?wx_fmt=jpeg&from=appmsg)
img

然后，工具被调用，  ** 输出  ** 会被添加到迄今为止生成的标记中。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWYVWVn5V8V8b0mMzHNbVkcVBia8HnR0NYU1a3KVrt07baPE4gEbpcuKg/640?wx_fmt=jpeg&from=appmsg)
img

` ]  ` 符号表示LLM现在可以继续生成标记（如有必要）。

Toolformer通过仔细生成包含许多工具用例的数据集来创建这种行为，模型可以在这些数据集上进行训练。对于每个工具，手动创建少样本提示并用于采样使用这些工具的输出。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWMwELXjBoBx93C6DBtqjqbz331PaOqKEQ7lEzKzte7XroYqWTJticH0g/640?wx_fmt=jpeg&from=appmsg)
img

输出基于工具使用的正确性、输出和损失减少进行过滤。由此产生的数据集用于训练LLM遵循这种工具使用格式。

自Toolformer发布以来，出现了许多令人兴奋的技术，如可以使用数千种工具的LLM（ToolLLM）或可以轻松检索最相关工具的LLM（Gorilla）。

无论如何，大多数当前LLM（2025年初）都已经过训练，可以通过JSON生成轻松调用工具（如我们之前所见）。

##  模型上下文协议（MCP）

工具是主体框架的重要组成部分，允许LLM与世界交互并扩展其能力。然而，当你有许多不同的API时，启用工具使用变得麻烦，因为任何工具都需要：

  * 手动  ** 跟踪  ** 并提供给LLM 
  * 手动  ** 描述  ** （包括其预期的JSON模式） 
  * 当其API变更时手动  ** 更新  **

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWdD7rgSVdSyukyBVxdT4duDwKkPcHZZa5wdN1RKV5o7mOhcajEwBAEg/640?wx_fmt=jpeg&from=appmsg)
img

为了使工具更容易在任何给定的主体框架中实现，Anthropic开发了模型上下文协议（MCP）。MCP标准化了对天气应用和GitHub等服务的API访问。

它由三个组件组成：

  * MCP  ** Host  ** — 管理连接的LLM应用程序（如Cursor） 
  * MCP  ** Client  ** — 与MCP Host保持1:1连接 
  * MCP  ** server  ** — 向LLM提供上下文、工具和功能 

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NW6MpqjnC04PT5I3h8IsedHAkCWNkAgWgFAWP3bPxAxibtVWLgia5tzkeQ/640?wx_fmt=jpeg&from=appmsg)
img

例如，假设你希望LLM应用程序总结你仓库的最新5次提交。

MCP主机（与客户端一起）首先调用MCP服务器询问有哪些工具可用。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NW9wS3tZM03sG5fib1T1pdibVwTKNcQfwqpYrDhe3Xicq3WV4hhTlNstDVA/640?wx_fmt=jpeg&from=appmsg)
img

LLM接收信息并可能选择使用工具。它通过主机向MCP服务器发送请求，然后接收结果，包括使用的工具。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWxebOzHlFsmxzak9OqDyS7j073kTXSbK1jzOK1VSuic8rYrQWQXf4Vwg/640?wx_fmt=jpeg&from=appmsg)
img

最后，LLM接收结果并可以解析给用户的答案。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWAPPplkCgibA3JJiaqnj1lOZGTuzBbia7zrF9v4OKaRSzq2YAW3EA0Cskg/640?wx_fmt=jpeg&from=appmsg)
img

这个框架通过连接到任何LLM应用程序都可以使用的MCP服务器，使创建工具变得更容易。因此，当你创建一个与GitHub交互的MCP服务器时，任何支持MCP的LLM应用程序都可以使用它。

#  规划

工具使用允许LLM增强其能力。它们通常使用类似JSON的请求进行调用。

但在主体系统中，LLM如何决定使用哪种工具以及何时使用？

这就是规划发挥作用的地方。LLM Agents中的规划涉及将给定任务分解为可执行的步骤。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWpvggy1hsNaoKgbRRSicYiarQzm9lTPIWYb8ALz27D38cicpkliaJVpbNicQ/640?wx_fmt=jpeg&from=appmsg)
img

这个计划使模型能够迭代反思过去的行为并在必要时更新当前计划。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWxbpGkSca7XKpapksGIYA4SrzYzdM3ZupzIdb5DVVQOwGU5icv5hHYlA/640?wx_fmt=jpeg&from=appmsg)
img

要在LLM Agents中启用规划，让我们首先看看这种技术的基础，即推理。

##  推理

规划可执行步骤需要复杂的推理行为。因此，LLM必须能够展示这种行为，然后才能规划任务的下一步。

"推理型"LLM倾向于在回答问题前"思考"。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWvViagwvTSL9IDXV8AJHicvaUq0veDUNsoWI946jheib7D4b8WdtJJcA5g/640?wx_fmt=jpeg&from=appmsg)
img

这里使用"推理"和"思考"这些术语有些宽泛，因为我们可以争论这是否是类似人类的思考，还是仅仅将答案分解为结构化步骤。

这种推理行为大致可以通过两种选择启用：对LLM进行微调或特定的提示工程。

通过提示工程，我们可以创建LLM应遵循的推理过程示例。提供示例（也称为少样本提示）是引导LLM行为的绝佳方法。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWtVJ4Akuv9mticYkdQ6P8vYaINAYiaUVIk0DBCOHChDEA0D2g001AnFtA/640?wx_fmt=png&from=appmsg)
img

这种提供思维过程示例的方法被称为思维链，它能够实现更复杂的推理行为。

思维链也可以在没有任何示例（零样本提示）的情况下启用，只需简单陈述"让我们一步一步思考"。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWmkMKfNEUiahAe2P88hY92tZGhL89VON1RgjVcne3gbj9OdOIDmGpkfA/640?wx_fmt=png&from=appmsg)
img

在训练LLM时，我们可以给它提供足够数量的包含类似思考例子的数据集，或者LLM可以发现自己的思考过程。

一个很好的例子是DeepSeek-R1，它使用奖励来引导思考过程的使用。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWiaRydicib3rK3038SxaIibe8XRpMMJlyQWW2DHibYmWFBwRBA31HKgLHNHw/640?wx_fmt=jpeg&from=appmsg)
img

##  推理与行动

在LLM中启用推理行为很好，但不一定使其能够规划可执行步骤。

我们迄今为止关注的技术要么展示推理行为，要么通过工具与环境交互。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWj4WEN38sectBh1Q3sg3E1PpSOeHibNnRzUC1da1geic0JHBTcKebNWYA/640?wx_fmt=png&from=appmsg)
img

例如，思维链仅专注于推理。

结合这两个过程的首批技术之一被称为ReAct（推理和行动）。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NW3tOAOv95KKedIFJTNXxP1csiaMGXk1vvkJS5qfgmicVn6icadtu9Q4UHw/640?wx_fmt=png&from=appmsg)
img

ReAct通过精心设计的提示词工程来实现这一点。ReAct提示描述了三个步骤：

  * ** 思考  ** \- 关于当前情况的推理步骤 
  * ** 行动  ** \- 要执行的一组行动（例如，工具） 
  * ** 观察  ** \- 关于行动结果的推理步骤 

提示本身相当直接。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWymSB0vua4k5pXZibK2iabgfmw5ZV4crBLdwH1TWuJyqr0Z2eQhTyMvHg/640?wx_fmt=png&from=appmsg)
img

LLM使用这个提示（可作为系统提示使用）来引导其行为，使其在思考、行动和观察的循环中工作。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NW4yk6pTwpYcSuSok8HibrHiaDAia86iaBgOdEBBH1HCQJrSicvpKCJy6Kx4w/640?wx_fmt=png&from=appmsg)
img

它会继续这种行为，直到某个行动指定返回结果。通过对思考和观察的迭代，LLM可以规划行动、观察其输出并相应调整。

因此，与具有预定义固定步骤的Agents相比，这个框架使LLM能够展示更多自主的主体行为。

##  反思

没有人（甚至使用ReAct的LLM）能完美执行每项任务。只要你能对过程进行反思，失败就是过程的一部分。

这个过程在ReAct中缺失，而Reflexion正是解决这一问题的技术。Reflexion是一种使用语言强化帮助agents从先前失败中学习的技术。

该方法假设三种LLM角色：

  * ** 执行者  ** — 根据状态观察选择并执行行动。我们可以使用思维链或ReAct等方法。 
  * ** 评估者  ** — 对执行者产生的输出进行评分。 
  * ** 自我反思  ** — 对执行者采取的行动和评估者生成的分数进行反思。 

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NW7eU6EEvk7jUicIRh1wQuhqhJ7VKQq0mKgx368YcgBl0p1icZ1VdVmBFQ/640?wx_fmt=png&from=appmsg)
img

添加记忆模块来跟踪行动（短期）和自我反思（长期），帮助Agent从错误中学习并确定改进的行动。

一种类似而优雅的技术是SELF-REFINE，其中重复进行细化输出和生成反馈的行动。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWNuhqtw69AgtpicEna16cTFFqHJSQTWtHvwp50qqzfx5Cg3pXsTGw3Ew/640?wx_fmt=png&from=appmsg)
img

同一个LLM负责生成初始输出、细化输出和反馈。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWy4Ijl3iclR5sUBqM22pbl1Nn43w6C2E7mg6Kw4HYQespJ3OhWdxg9rA/640?wx_fmt=png&from=appmsg)
img

有趣的是，这种自我反思行为（Reflexion和SELF-REFINE）与强化学习非常相似，后者根据输出质量给予奖励。

#  多Agent协作

我们探讨的单Agent存在几个问题：工具过多可能使选择复杂化，上下文变得过于复杂，任务可能需要专业化。

相反，我们可以转向  ** 多Agent  ** 框架，其中多个agents（每个都有访问  ** 工具  ** 、  ** 记忆  ** 和  ** 规划
** 的能力）相互交互并与其环境交互：

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWQf6poLZCQmP8qVQ2stbvlfPJicHbJ5pTrGXetABcAeeRcuY3WSDVibNw/640?wx_fmt=png&from=appmsg)
img

这些多Agent系统通常由专业Agents组成，每个都配备自己的工具集，并由监督者监督。监督者管理Agents之间的通信，并可以将特定任务分配给专门的Agents。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWkS49Ad449V2U6qHz8xx2kSoqbNxlbLXCtwqzoKxGYOicVrtJJCcD7kA/640?wx_fmt=png&from=appmsg)
img

每个Agent可能有不同类型的可用工具，但也可能有不同的记忆系统。

实际上，有数十种多Agent架构，其核心包含两个组件：

  * Agent  ** 初始化  ** — 如何创建单个（专业）Agents？ 
  * Agent  ** 编排  ** — 如何协调所有Agents？ 

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWlQW3umv4oWSZgwEs1XuduXgqQf7EtoBRxe33zfGkhP0Nsnhc6icgibhw/640?wx_fmt=png&from=appmsg)
img

让我们探索各种有趣的多Agent框架，并强调这些组件是如何实现的。

##  人类行为的交互模拟

可以说最有影响力，也是非常酷的多Agent论文之一是"生成式Agents：人类行为的交互模拟"。

在这篇论文中，他们创建了模拟可信人类行为的计算软件agents，称为生成式Agents。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWue0g4QLu9cPjAVCXceZagUmTkq9RAWNWCTiciaRYqCXbLqUI7LJSEapw/640?wx_fmt=jpeg&from=appmsg)
img

给每个生成式Agent的  ** 档案  ** 使它们以独特的方式行动，并帮助创建更有趣、更动态的行为。

每个Agent初始化时都有三个模块（  ** 记忆  ** 、  ** 规划  ** 和  ** 反思  **
），这与我们之前在ReAct和Reflexion中看到的核心组件非常相似。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWtKXPCQbicAF3uSRa8ZZfgBqphYuY3kDwuoZQYGcVibI2o8h1LHwaLEicg/640?wx_fmt=png&from=appmsg)
img

记忆模块是这个框架中最重要的组件之一。它存储规划和反思行为，以及迄今为止的所有事件。

对于任何给定的下一步或问题，系统会检索记忆并根据其近期性、重要性和相关性进行评分。得分最高的记忆将与Agent共享。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWXOXgELLQnicxH1jRFmPloho4zu4Z1ldVXbvGWKibGQlsr6E7EgRjSDQg/640?wx_fmt=jpeg&from=appmsg)
img

这些组件共同允许Agents自由地进行活动并相互交互。因此，几乎没有Agent编排，因为它们没有要完成的特定目标。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWjibric65cHNXoRumSOyQsMvibC9CIiaLfLr7zc9YzicGn8fDNzjAwGXH2uw/640?wx_fmt=jpeg&from=appmsg)
img

交互式演示的注释图片。

这篇论文中有太多令人惊叹的信息片段，但我想强调他们的评估指标。

他们的评估以Agent行为的可信度为主要指标，由人类评估者进行评分。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWehV3nWoibSaHM4x6UM3qud8Zh8zTAVkme3m82wyiaGuEptIicwB8GcydA/640?wx_fmt=png&from=appmsg)
img

它展示了观察、规划和反思在这些生成式Agents性能中共同作用的重要性。如前所述，没有反思行为，规划是不完整的。

##  模块化框架

无论你选择什么框架来创建多Agent系统，它们通常由几个组成部分组成，包括其档案、环境感知、记忆、规划和可用行动。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWauAbeFQssvpiaJGO9tTdrRHMGFm59KWdVyJ9x6XCgXZUWRofibr1mA6g/640?wx_fmt=png&from=appmsg)
img

实现这些组件的流行框架有AutoGen、MetaGPT和CAMEL。然而，每个框架处理各Agent之间通信的方式略有不同。

例如，使用CAMEL时，用户首先创建问题并定义  ** AI用户  ** 和  ** AI助手  ** 角色。AI用户角色代表人类用户并将引导整个过程。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWBcT8m7PQDDYTdbLAIcy7whDj7HmYTNA7JGjTiawiaP56Vrpib4BkNeF5A/640?wx_fmt=png&from=appmsg)
img

之后，AI用户和AI助手将通过相互交互来协作解决查询。

![img](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWuH47LO2HqOHMnDTMf0FF5M5SwkhD8K7cQvXUSgmHMHz3l1ibv3BGHBg/640?wx_fmt=png&from=appmsg)
img

这种角色扮演方法实现了agents之间的协作通信。

AutoGen和MetaGPT有不同的通信方法，但都归结为这种协作性质的通信。Agents有机会互相交流，更新当前状态、目标和下一步。

在过去一年，特别是最近几周，这些框架的发展呈爆炸式增长。

![img](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjXmOYVjgws7rtNGy4PQ1NWiawB0CpiadqYy7AXu4FXTltdyMdV7F2LuzmaXcYeAKBtvCSql1Js3icEQ/640?wx_fmt=jpeg&from=appmsg)
img

随着这些框架不断成熟和发展，2025年将成为一个真正令人兴奋的年份！

#  结论

以上就是LLM Agents的探索之旅！希望这篇文章能让你更好地理解LLM Agents的构建方式。

好了，这就是我今天想分享的内容。如果你对构建AI智能体感兴趣，别忘了点赞、关注噢~

  

预览时标签不可点

微信扫一扫  
关注该公众号



微信扫一扫  
使用小程序

****



****



×  分析

__

![作者头像](http://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnh1sFVQ52zMKBKv9Evh996urBqdIUvHHYSEI8zDwRFKQ7Zw6qCs36q0pk61IPzR6QVNYiaKSaHOeiaQ/0?wx_fmt=png)

微信扫一扫可打开此内容，  
使用完整服务

：  ，  ，  ，  ，  ，  ，  ，  ，  ，  ，  ，  ，  。  视频  小程序  赞  ，轻点两下取消赞  在看  ，轻点两下取消在看
分享  留言  收藏  听过

