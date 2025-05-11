---
createTime: 2025/04/26 16:17:14
---
# 23 款 DevOps 工具建设云原生时代

点击关注 👉 [DevOps技术栈](javascript:void(0);) *2022-04-27 12:00* *Posted on 河北*

![img](http://mmbiz.qpic.cn/mmbiz_png/d5patQGz8KdXgB8Z3xhG45s7qQmoYP94Mc8slSroM7ODL676xiaBEhyh93Yu3icBkzOsLT66KMxfJqoibY9zLKexw/0?wx_fmt=png)

**DevOps技术栈**

专注于分享DevOps工具链及经验总结，例如：Docker、K8s、ServiceMesh、Jenkins等技术栈。

66篇原创内容



Official Account

转载：InfoQ公众号

**作者介绍：**田良智，星汉未来资深技术专家，曾就职于新浪等公司，拥有十多年运维经验，参与过多个运维系统从 0 开始搭建的过程。

前  言

今天的中国互联网，正加速从消费互联网向产业互联网转型，数字化变革逐渐渗透到每一个具体产业，弹性算力已变成各行各业的水电煤，从底层驱动产业变革。以区块链、IoT、人工智能、大数据等先进技术为代表，新的云原生基础设施已经就绪并将继续演进，同时也会伴随着与之配套的技术和管理范式的演进。DevOps 作为数字化时代 IT 研发和管理范式，是企业数字化转型重要的组成部分。

当前互联网组件生态中，DevOps 工具和系统林林总总，令人眼花缭乱。选用与当前企业发展阶段不适配的 DevOps 组件会导致：

- 工具能力溢出，大量功能闲置，同时增加使用人员的上手成本；
- 工具能力不足或功能过于泛化，无法满足企业研发体量需求或无法灵活定制细节；
- 工具本身质量欠佳，后续相应的社区支持或服务保障缺失，导致稳定性风险。

基于以上问题，**本文致力于为企业提供 DevOps 工程效率和运维环节（后续简称效维）工具说明及全景图，并结合典型中国互联网研发场景，提出适配不同体量和阶段的企业的效维工具链选型**，希望能帮助企业快速满足数字化变革的要求，加速业务发展，引领业务创新。

DevOps 及工具链概述

DevOps 是 Development 和 Operations 的组合词。它是一组过程、方法与系统的统称，用于促进开发（应用程序 / 软件工程）、技术运营和质量保障（QA）部门之间的沟通、协作与整合。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YriaiaJPb26VMP9XhKdn4iaQkhUSAdqK0qQUgBMuDGUXhaxLHicibPPmx1nnvkabiaia3xCqjfjRAEtAI68AedY1euHLw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

图 1 DevOps 范畴

它是一种重视“软件开发人员（Dev）”和“IT 运维技术人员（Ops）”之间沟通合作的文化、运动或惯例。透过自动化“软件交付”和“架构变更”的流程，来使得构建、测试、发布软件能够更加地快捷、频繁和可靠，把敏捷开发部门和运维部门之间的围墙打通，形成闭环。

在 DevOps 流程下，运维人员会在项目开发期间就介入到开发过程中，了解开发人员使用的系统架构和技术路线，从而制定适当的运维方案。而开发人员也会在运维的初期参与到系统部署中，并提供系统部署的优化建议。

完整的 DevOps 生命周期一般包括以下六个阶段。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YriaiaJPb26VMP9XhKdn4iaQkhUSAdqK0qQSOJmf7LnMppYZF9TAHX7zhciaaiaoPkC1R9K5w2ehlHCs9WqDmKvsGAg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

图 2 DevOps 生命周期

其中集成、部署、监控三个环节属于 DevOps 生命周期中核心环节，是本文主要关注点。贯穿云原生 DevOps 整个生命周期的工具链全景图如下：

![Image](https://mmbiz.qpic.cn/mmbiz_png/YriaiaJPb26VMP9XhKdn4iaQkhUSAdqK0qQicvibD4SElfBp4PP6lefVicPriaEsM2TKzhHsVtX8LpOqIV4bgw0Yp4GWQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

图 3 云原生 DevOps 工具全景图

持续集成 & 持续部署

持续集成可以帮助开发人员更加频繁地（有时甚至每天）将代码更改合并到共享分支或“主干"中。一旦开发人员对应用所做的更改被合并，系统就会通过自动构建应用并运行不同级别的自动化测试（通常是单元测试和集成测试）来验证这些更改，确保这些更改没有对应用造成破坏。持续集成的输入是代码，所以一个好的代码托管工具是必不可少的。

持续部署指的的是自动将开发人员的更改从存储库发布到生产环境，以供客户使用。它主要为了解决因手动流程降低应用交付速度，从而使运维团队超负荷的问题。部署过程中可能还会涉及到平滑迁移新老版本流量的过程，所以对服务发现工具也有一定的依赖。

要实现持续集成和持续部署，自动化的流水线是基础。本节将从**代码托管工具、集成流水线工具、服务发现工具**三个方面进行工具对比介绍。

代码托管工具

在选择代码托管工具的时候，主要关注以下三点：

1. 可协同：在功能层面要包含仓库管理、分支管理、权限管理、提交管理、代码评审等代码存储和版本管理等功能，让开发者更好的协同工作；
2. 可集成：好的代码托管服务应该具备灵活和简易的三方工具集成能力，降低 DevOps 的实施落地成本 ;
3. 安全可靠：这是最重要的一点，对于个人开发者可能无感，但是对于企业而言，代码的安全性、服务的稳定性、数据是否存在丢失的风险，是会最被优先考量的点。

常用代码托管工具见下表：

![Image](https://mmbiz.qpic.cn/mmbiz_png/YriaiaJPb26VMP9XhKdn4iaQkhUSAdqK0qQGd9kaKU8rZzWxHQribryYQpibFyKTNzobEDedqwqJfiax6n1DjmPibpVVQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



表 1 代码托管工具对照表



集成流水线工具

集成流水线就像传统的工业流水线一样，在经历构建、测试、交付之后，生产出一代一代更新迭代的软件版本。实现了软件产品小步迭代、高频发布、适时集成、稳定的系统演进线路图。在选择集成流水线工具的时候，我们需要关注：

1. 版本控制工具的支持；
2. 每个构建是否可以支持指定多个代码源 URLS；
3. 是否支持构建产物管理库，如公有云对象存储等；
4. 是否支持部署流水线，类似于一个或多个构建完成后触发另一个构建；
5. 是否支持并行构建；
6. 是否支持构建网格，以及对网格内机器管理的能力。如能否将多个构建同时分配到多个构建机器上执行，以提高执行速度；
7. 是否有良好的开放 API，比如触发构建 API、结果查询 API、标准的 Report 接口等；
8. 账户体系，是否支持第三方账户接入，如企业 LDAP 等；
9. 是否有良好的 Dashboard；
10. 多语言支持；
11. 与构建工具（如 Maven，Make，Rake，Nant、Node 等）和测试工具的集成。

常用集成流水线工具如下表所示：

![Image](https://mmbiz.qpic.cn/mmbiz_png/YriaiaJPb26VMP9XhKdn4iaQkhUSAdqK0qQFk7WwUfAib0lldvEyicDv2bicTG0LOvtMvkEicAhKTia0xgLgy3KX2xibKXQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

表 2 持续集成&持续部署组件对照表

服务注册发现工具

服务发现为 Deploy 的最后环节，缺一不可。无论是四七层负载均衡，还是微服务、RPC 服务框架，服务发现都是产品投产的临门一脚。服务注册发现工具选型需要从生态发展、便利性、语言无关性等角度来综合考量。

常用的组件工具如下表：

![Image](https://mmbiz.qpic.cn/mmbiz_png/YriaiaJPb26VMP9XhKdn4iaQkhUSAdqK0qQNmufARotk6W44FhL3CxudNIjsOtkiajtJwjWRLduSsBEey7XXUpcbxA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

 

表 3 服务注册组件对照表

持续监控

服务的稳定性离不开监控系统的保驾护航。监控系统为服务稳定运行提供数据可视化、异常报警、异常定位、故障追踪等能力；同时监控系统还为服务持续优化升级提供依据和考量标准。

**监控系统有三大基石：指标、日志、分布式追踪。**

**指标体系**：聚焦于故障发现环节，服务以数字形式评估出服务 QPS、成功率、延迟、容量等关键指标，搭配报警系统可以保证当核心指标异常时及时通知开发 / 运维人员。除了核心指标外，服务还可以将各模块 / 阶段的瓶颈点、外部依赖指标量化，建立更加完善服务状态概览，以便服务开发 / 运维人员快速定位异常，完成根因分析。指标系统优势是聚合能力，用较少的存储资源和计算资源表达系统内部状态。

常用工具及功能对照如下：

![Image](https://mmbiz.qpic.cn/mmbiz_png/YriaiaJPb26VMP9XhKdn4iaQkhUSAdqK0qQMVJriaKag2GddfpgficLiaBd2aSSYlQZfNg2FvuUbEQwO8cw9aaoUoiblg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

表 4 指标组件对照表格

**日志系统**：用于记录服务内发生的各类事件。日志系统聚焦故障定位环节，与指标系统相比，日志系统具有更强的描述性，但也伴随着更大的存储空间和计算存储资源要求。日志是常用的监控方法，比如在具有外部依赖系统的服务中，一般会将外部系统发生的错误和错误原因以日志形式记录下来，以便在故障定位和复盘时恢复异常现场环境。常用方案为 ELK（Elasticsearch、Logstash 和 Kibana ）。

**分布式追踪系统**：用于分析服务调用关系。在微服务盛行的今天，服务之间调用关系越来越复杂，微服务之间相互影响也更加难以定位和排查。分布式追踪系统聚焦于故障定位环节，与指标体系和日志体系不同，分布式追踪系统可以提供服务之间依赖拓扑信息，对于梳理系统调用拓扑、追踪下游依赖导致的异常意义重大。

常用工具及功能对照如下：

![Image](https://mmbiz.qpic.cn/mmbiz_png/YriaiaJPb26VMP9XhKdn4iaQkhUSAdqK0qQnHHL29xH5Apfiat6siaXOx2UCxQ0zc1vVYa6GQ9Nk0gbsWv8ORA0uicew/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

表 5 分布式追踪组件对照表

企业评估模型

DevOps 成熟度

**DevOps 成熟度是评估效维工具选择的首要参考维度**。不同企业 DevOps 发展阶段不一，为了更好地选择适配企业实际情况的效维工具，我们需要从多维度进行评估：

- **组织与文化**：DevOps 需要文化与组织的变革，包括研发与运维、IT 与业务之间的隔阂及部门墙的打破。组织支持 DevOps 的力度，以及现阶段文化与 DevOps 的匹配程度是这个维度的关键。
- **敏捷开发**：DevOps 是敏捷开发理念的更科学的实践体系，因此前期敏捷做得好不好直接影响到 DevOps 的效果，两者是相辅相成的。
- **CI/CD**：CI/CD 不仅仅是工具或流程，更是一种方法论，“持续"是其核心。CI/CD 管控从代码提交那一刻到代码运行在生产环境的整个过程。
- **可视化与自动化**：可视化是让 DevOps 人性化的重要一环，通过良好的可视化看板，可以快速发现 DevOps 流程中的阻塞点和风险点。自动化一方面是为了更快推动价值流从左向右流动，另一方面也为了将人为失误的风险降到最低。
- **运维监控与预警**：开发与运维紧密合作，甚至是一个团队，对于运维的监控和预警对所有相关方可见。
- **持续度量与改进**：DevOps 的效果也是需要度量的，“如果你无法度量它，你就无法改进它”。DevOps 提倡更频繁的直面问题，度量则是一种很好的方式帮助我们发现问题，并持续改进。

几乎没有尝试任何 DevOps 实践，或只做了一些基础的 DevOps 工作的企业，适合选取更低门槛甚至是一站式的工具，功能可以比较单一，但主要注重价值流的流转效率。而对于能成熟运用各种 DevOps 实践的企业，适合根据自己的实际需求选取特定环节的组件，并根据团队和组织情况进行修改或定制。

研发团队规模

效维团队的人员规模，也会影响 CI/CD 及监控工具链的选择。**我们把 20 人以下的效维团队定义为中小团队，20 至百人以上定义为大型团队**。正常来说，效维团队的规模也同比研发团队的规模。对于中小团队来说，选择学习曲线低、能快速搭建且有较完备社区或官方服务提供后续支持的工具为主，容忍功能相对单一。大型团队因为有较充足的人力及技术实力，有条件选用有一定上手成本，但功能全面且支持深度定制甚至重构的工具。

质量与稳定性要求

业务对运维服务质量的要求，也深度影响效维工具链的选择和搭建。比如金融业务，对稳定性和精确性有极高的要求，并且面临外部强合规性的监管，效维质量要求较高。而其它类似推荐的业务，即使出现问题也只是降低客户体验，比如展现相关度不高的商品或新闻，整体并不造成灾难性的后果，效维质量就相对要求不高。

针对于效维质量要求较高的项目，工具链的选择倾向于功能覆盖率较全，有大厂背书或业界口碑，历史 bug 率不高的工具，整个的效维流程的时延以及效率相对较重。针对要求较低的项目，工具链的选择倾向于能快速搭建，能覆盖基本功能的工具链条。

服务治理标准化程度

企业的服务治理标准化程度也会影响效维工具链的选择。服务治理标准化包括硬件的标准化、OS 的标准化、语言栈的标准化、通信协议的标准化、框架的标准化等。标准化程度较高的企业，效维工具功能可以相对比较聚焦，不需要覆盖各层级多种标准导致的技术复杂度。标准化程度较低的企业，效维工具的体系和结构会比较庞杂，甚至在有些链路环节无法做到完全统一和自动化，需要效维人员深度参与修改与定制。

典型企业型态效维工具链推荐

结合以上的评估维度，我们认为典型的公司型态包括以下三种：

![Image](https://mmbiz.qpic.cn/mmbiz_png/YriaiaJPb26VMP9XhKdn4iaQkhUSAdqK0qQeKWQEo2vETo0Hk9dHrCCSmVLuiaYVNP060yCwzT9pskCOAF18fBicZHQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

初创型小微公司

创业型企业一般选择此种模型，此时公司以快速迭代服务、提升开发效率为第一个原则，运维能力有限。

这种模型推荐使用如下方式搭建 DevOps 工具链：

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/YriaiaJPb26VMP9XhKdn4iaQkhUSAdqK0qQuZJzCtfLogNeCJCXicib4VfF6qGiavfuiagogDLV1jaazVN6YxV6FvEDVA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

图 4 建议工具链

如上图所示：

- 推荐使用 GitLab 代码管理，GitLab 是企业级的开源代码托管软件、生态成熟、稳定、社区庞大、使用简单。DevOps 代码托管流程描述如下：

  1.Zadig 完成 CI/CD 流程，提供开发 / 运维友好的 Web UI；

  2.构建服务镜像，将镜像推送到 Harbor，完成镜像和服务版本管理；

  3.将服务部署于 Kubernetes，完成服务升级。

- 推荐使用 Kubernetes 服务部署，Kubernetes 是 Google 开源的服务部署平台，它具有开源、高效、稳定、社区庞大的优点。目前 Kubernetes 已经成为了云原生的标准服务部署平台，它大大减少了运维人员工作负担。在团队人数较少时采用 Kubernetes，不仅节省人力、服务部署升级效率高，还具有强大的系统可扩展性。采用 Kubernetes 部署服务流程描述如下：

  1.使用 Kubernetes Deployment，YAML/Helm chart 部署服务；

  2.使用 Kubernetes NodePort Service 进行服务发现，这种方式简单又高效；

  3.通过 Nginx 暴露服务，Nginx 挂载 NodePort Service 后端地址。

  4.Kubernetes 可以使用 BridgX 搭建，BridgX 支持管理公有云和私有云计算资源，基于 BridgX 搭建的运维系统可扩展性更高；

  5.使用公有云计算资源底座，成本低，运维难度低。

- 推荐使用 CudgX + Grafana 搭建监控系统

  1.使用 CudgX 建立指标体系，CudgX 是源代码开放的智能诊断平台，具有高可用、高性能、服务负载评估、服务冗余度保持等功能特点，采用 CudgX 存储核心指标为服务自动扩缩容提供更高的可扩展性，同时 CudgX 兼容 Prometheus 生态，已有基于 Prometheus 的监控系统可以平滑迁移到 CudgX 系统。

  2.Grafana 是目前最为流行的监控视图软件，并提供了简单易用的报警功能，团队规模较小时采用，既不会浪费太多运维时间，又能保证服务质量，还可以保证系统的可扩展性。

采用此种监控方案总结如下：

- 使用 CudgX 业务打点，同时也能使用 Prometheus + CudgX 的组合；
- 基于 Grafana 搭建视图和报警功能。

中型腰部公司

此模型适合于业务稳定性要求较高的企业，此时企业一般有稳定的服务和客户群体，服务质量至关重要，需要完善的 DevOps 流程保障服务更新 / 发布过程中稳定性要求，并满足提高开发效率的诉求。

此时推荐使用如下所示的方式搭建 DevOps 工具链：

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/YriaiaJPb26VMP9XhKdn4iaQkhUSAdqK0qQV9cbTpH7Gjkoc30fa6icuMUvJuhkw4uDicia52ZWIyPPucicazpMhiagosQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

图 5 建议工具链

如上图所示：

- CI/CD 推荐使用 GitLab ，同时搭配 Zadig 提供易于用户操作的 UI。采用此种代码管理方式流程描述如下：

  1.使用 Zadig 持续集成，Zadig 提供了用户友好的 WebUI，使用 Sonar 完成代码检查，完成单元 /C2C 测试流程，当所有验证通过后触发部署；

  2.构建服务镜像，将镜像推送到 Harbor，完成镜像和服务版本管理；

  3.自动灰度流量到 SchedulX 。

- 推荐使用 SchedulX 服务部署，原因为 SchedulX 具有完善的金丝雀发布功能，同时支持物理机和容器化部署。对于服务质量要求较高，代码发布、服务更新应该有完善的灰度到全量更新流程，并且当核心指标异常时，应该阻断变更，SchedulX 配合 CudgX 可以实现金丝雀发布、变更阻断、动态扩缩容等功能，最大程度上保证服务质量。在服务质量要求较高的场景下，部分服务可能由于网络或者资源隔离的原因，希望将服务部署在独立的物理机中，SchedulX 既支持 Kubernetes 又支持物理机部署。采用 SchedulX 服务部署流程描述如下：

  1.服务更新请求提交至 SchedulX；SchedulX 根据服务部署类型，将服务灰度部署于物理机或者 Kubernetes；

  2.SchedulX 监控核心指标，滚动发布，金丝雀发布，当指标异常时回滚更新操作；

  3.按照服务规模和复杂程度不同，用户可能使用微服务架构，此时服务发现可以基于 Consul ；

  4.向外暴露服务可以通过 Nginx，向内暴露服务可以通过 LVS；

- 推荐使用 CudgX + Nightingale + ELK + Jaeger + Grafana 搭建监控系统。基于 CudgX 建立业务指标体系，具有高可用、高性能、高扩展性的特点，同时搭配 SchedulX 可以完成变更阻断和服务自动扩缩容，大大提供服务稳定性。基于 Nightingale 完成基础指标监控，可以尽早预测 / 捕获宿主机异常，避免或降低异常影响。基于 ELK 完成日志收集，服务异常时快速定位故障环节，降低故障影响。基于 Jaeger 搭建分部署追踪系统，快速定位系统瓶颈点，定位故障服务。基于 Grafana 搭建监控视图和报警，为服务稳定性保驾护航。

基于此方案搭建监控系统总结如下：

- 使用 CudgX 完成业务指标打点与指标收集，完成业务指标监控；
- 使用 Nightingale 完成基础指标打点与收集，完成物理机基础指标（如 CPU/Memory/ 网卡等）监控；
- 使用 ELK 搭建日志系统；
- 使用 Jaeger 搭建分布式追踪系统；
- 使用 Grafana 搭建视图和报警系统。

大型头部公司

此模型企业内各服务和组件都趋于成熟，企业有高稳定性要求的核心服务，有专业的运维团队，需要完善的 DevOps 平台来保障复杂的微服务体系下的服务质量。企业更关注于系统平台化，将各类组件分门别类组合成为系统平台，并搭建 CMDB 管理服务元数据，按组织架构管理服务。

此模型下平台化成为主题，各组件有独立部门负责平台支持和运维，从微服务、监控平台、服务部署平台三个平台角度看，推荐系统架构如下所示:

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/YriaiaJPb26VMP9XhKdn4iaQkhUSAdqK0qQfY1j18Cib248fibp3JA4wYicmT2iadDHM3R8RyfniafOh8HtKXmlaGbIibdg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)



图 6 建议工具链

结  语

本文针对不同 DevOps 成熟度的企业，量身推荐了持续集成、持续部署以及持续监控的工具集合，希望能帮助广大互联网企业，尤其是中小企业，快速搭建起自己的效能及运维的平台，助力企业快速交付，在日益激烈的行业竞争中收获技术红利。

> 本文大部分内容来自《星汉未来综合运维解决方案》白皮书，适合各公司收藏以备技术选型时参考，感兴趣的可以点击【阅读原文】链接下载。

\- END -

```
 推荐阅读 
一步步开发CMDB和应用发布系统DevOps项目Kubernetes v1.24发布，Dockershim弃用！
新手必须知道的 Kubernetes 架构Shell分析日志文件，全面解锁新姿势！
大型网站技术架构设计
这篇文章带你全面掌握 Nginx ！
Linux 根分区快满了，这个方法快速定位！
一文搞懂 Kubernetes 网络通信原理
Shell 编程的经典十三问！老司机也会翻车
SRE本质就是一个懂运维的资深开发
Kubernetes 4000节点运维经验分享
从网管到架构师，给你分享这10年的成长感悟
Kubernetes 的高级部署策略，你不一定知道！
9个常用的Shell脚本，面试也常问！
基于Nginx实现灰度发布与AB测试搭建一套完整的企业级 K8s 集群（kubeadm方式）
```



```

```



点亮，服务器三年不宕机![Image](https://mmbiz.qpic.cn/mmbiz_gif/wtIePIKFibDaPibPt5PE37xRibz7Fy3WDtFj1UMvmC91LcBw5C8iakNUOlbG1OxGaEARs4qR88BfvqwJVIY88xe6kA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

[Read more](javascript:;)

People who liked this content also liked

微服务是什么？

...

阮一峰的网络日志

不喜欢

不看的原因

OK

- 内容质量低
-  

- 不看此公众号

K8s集群稳定性提升手段

...

YP小站

不喜欢

不看的原因

OK

- 内容质量低
-  

- 不看此公众号

Kubernetes集群多租户资源管理

...

YP小站

不喜欢

不看的原因

OK

- 内容质量低
-  

- 不看此公众号

![img](https://mp.weixin.qq.com/mp/qrcode?scene=10000004&size=102&__biz=MzAwNTM5Njk3Mw==&mid=2247507943&idx=1&sn=7e5d5695c3e0e924d787453e2294b16e&send_time=)

Scan to Follow