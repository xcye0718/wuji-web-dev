import Topbar from "@/components/Topbar";
import FadeIn from "@/components/FadeIn";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";

const papers = [
  {
    title: "基于BCG信号的无负担长期睡眠监测与分期研究",
    titleEn: "SleepNetZero: Zero-Burden Zero-Shot Reliable Sleep Staging with Neural Networks Based on Ballistocardiograms",
    venue: "IMWUT",
    year: 2024,
    tag: "睡眠分期",
    link: "https://arxiv.org/abs/2410.22646",
  },
  {
    title: "Sleep2Vec: 面向真实世界睡眠医学的多模态基座模型",
    titleEn: "sleep2vec: Unified Cross-Modal Alignment for Heterogeneous Nocturnal Biosignals",
    venue: "ICLR",
    year: 2026,
    tag: "大模型",
    link: "https://arxiv.org/abs/2602.13857",
  },
  {
    title: "睡眠相关心跳与呼吸信号作为抑郁生物标志物的研究",
    titleEn: "Sleep-Related Heartbeat and Respiratory Signals as Biomarkers for Depression: An AI-Driven Detection Approach",
    venue: "Sleep Congress",
    year: 2025,
    tag: "抑郁识别",
    link: "#",
  },
  {
    title: "睡眠碎片化数字生物标志物与心血管及死亡风险预测",
    titleEn: "Developing a Novel Marker of Sleep Fragmentation for Cardiometabolic and Mortality Risk Prediction",
    venue: "Sleep Congress",
    year: 2025,
    tag: "风险评估",
    link: "https://www.medrxiv.org/content/10.1101/2025.06.04.25328946v1",
  },
  {
    title: "基于人工智能的睡眠年龄建模：心跳与呼吸信号方法",
    titleEn: "Artificial Intelligence-derived Sleep Age from Heartbeat and Respiratory Signals",
    venue: "Sleep Congress",
    year: 2025,
    tag: "睡眠年龄",
    link: "#",
  },
  {
    title: "不同训练方案与训练负荷对中国雪橇运动员睡眠质量的影响",
    titleEn: "Influence of Diverse Training Regimens and Training Load on Sleep Quality in Chinese Luge Athletes",
    venue: "ACSM",
    year: 2025,
    tag: "运动医学",
    link: "#",
  },
  {
    title: "AI 驱动的昼夜节律生物钟标志物发现研究",
    titleEn: "AI-enabled Discovery of Novel Circadian-Clock Markers from Overnight PSG",
    venue: "World Sleep",
    year: 2025,
    tag: "生物钟",
    link: "#",
  },
  {
    title: "多器官睡眠年龄与痴呆及死亡风险的关联研究",
    titleEn: "Multi-organ Sleep Age Derived from Polysomnography and Risk of Dementia and Mortality",
    venue: "World Sleep",
    year: 2025,
    tag: "睡眠年龄",
    link: "#",
  },
  {
    title: "基于睡眠心跳与呼吸信号的 AI 抑郁检测模型",
    titleEn: "An AI-Driven Model for Depression Detection Using Sleep Heartbeat and Breathing Signals",
    venue: "World Sleep",
    year: 2025,
    tag: "抑郁识别",
    link: "#",
  },
  {
    title: "基于夜间生理信号与人工智能的 REM 睡眠行为障碍检测",
    titleEn: "Harnessing Nocturnal Physiology and Artificial Intelligence for REM Sleep Behavior Disorder Detection",
    venue: "World Sleep",
    year: 2025,
    tag: "疾病预测",
    link: "https://link.springer.com/article/10.1038/s41746-026-02412-z",
  },
  {
    title: "基于微状态的通用脑电表征学习",
    titleEn: "Atoms of Thought: Universal EEG Representation Learning with Microstates",
    venue: "ACM MM Workshop",
    year: 2025,
    tag: "信号处理",
    link: "#",
  },
];

const Research = () => {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <div className="max-w-5xl mx-auto section-padding pt-24 pb-20">
        <FadeIn>
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" /> 返回首页
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">科研成果</h1>
          <p className="text-sm text-muted-foreground mb-10 max-w-2xl">
            五季医学团队持续在睡眠医学、生理信号处理与 AI 模型方向发表高水平学术论文，以下为部分已发表与投稿中的成果。
          </p>
        </FadeIn>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">已发表论文（{papers.length} 篇）</h2>
        </div>
        <div className="grid gap-4 mb-16">
          {papers.map((paper, i) => (
            <FadeIn key={i} delay={Math.min(i * 0.05, 0.4)}>
              <div className="group bg-card border rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-1 p-2 bg-muted rounded-lg">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground leading-relaxed mb-1">
                      {paper.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2 italic">
                      {paper.titleEn}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium text-primary">{paper.venue}</span>
                      <span className="text-xs text-muted-foreground">{paper.year}</span>
                      <span className="text-[11px] px-2 py-0.5 border rounded-full text-muted-foreground">
                        {paper.tag}
                      </span>
                    </div>
                  </div>
                  {paper.link !== "#" ? (
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 p-2 text-muted-foreground hover:text-primary transition-colors"
                      title="查看原文"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="shrink-0 p-2 text-muted-foreground/30">
                      <ExternalLink className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Coming soon */}
        <FadeIn>
          <div className="bg-muted rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-base font-semibold text-foreground">投稿中 · Coming Soon</h3>
              <span className="text-xs px-2 py-0.5 bg-accent text-accent-foreground rounded-full font-medium">8 项</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              另有 8 项研究成果正在投稿中，覆盖多模态信号融合、跨设备迁移学习、罕见睡眠疾病识别等前沿方向。相关论文在正式发表后将同步更新至本页面，敬请期待。
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Research;
