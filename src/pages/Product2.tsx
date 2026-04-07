import Topbar from "@/components/Topbar";
import FadeIn from "@/components/FadeIn";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Clock } from "lucide-react";

import pillowDetail from "@/assets/pillow-detail.jpg";

const Product2 = () => {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <article className="max-w-4xl mx-auto section-padding pt-24 pb-20">
        <FadeIn>
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" /> 返回首页
          </Link>

          {/* Notice Banner */}
          <div className="bg-primary/5 border border-primary/15 rounded-xl px-5 py-4 mb-8 flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm text-foreground font-medium">该产品即将发布，敬请期待</p>
          </div>

          {/* Hero */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium px-3 py-1 rounded-full border border-border text-muted-foreground">产品二</span>
            <span className="text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground font-semibold">
              即将发布
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">AI智能止鼾枕</h1>
          <p className="text-primary font-medium mb-8">睡眠干预方向</p>

          {/* 产品介绍 */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-foreground mb-6">产品介绍</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              AI智能止鼾枕是五季医学基于睡眠监测能力延伸的干预方向探索。产品聚焦打鼾与睡眠呼吸暂停人群的干预需求，结合实时识别与行为/体位干预思路，旨在提升用户夜间睡眠质量。
            </p>
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-4">
              {[
                "聚焦打鼾与睡眠呼吸暂停人群的干预需求",
                "结合实时识别与行为/体位干预思路，提升夜间睡眠质量",
                "通过志愿者与真实场景数据持续迭代干预效果",
                "与睡眠监测垫共享底层AI能力",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Product Detail Image */}
          <section className="mb-16">
            <div className="rounded-2xl overflow-hidden">
              <img src={pillowDetail} alt="AI智能止鼾枕结构与原理" className="w-full" />
            </div>
          </section>

          {/* Core Functions - 2x2 Grid */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-foreground mb-6">核心功能</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "实时鼾声识别",
                  desc: "基于AI算法实时监测鼾声，精准识别打鼾事件和呼吸暂停风险。",
                },
                {
                  title: "智能体位干预",
                  desc: "通过温和的物理方式引导用户调整睡姿，减少仰卧位带来的呼吸道阻塞。",
                },
                {
                  title: "个性化干预策略",
                  desc: "根据用户的打鼾模式和睡眠习惯，自动优化干预时机和力度。",
                },
                {
                  title: "睡眠质量追踪",
                  desc: "记录每晚干预效果和睡眠质量变化，持续优化干预策略。",
                },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground mb-3">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Target Users */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-foreground mb-6">适用人群</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "习惯性打鼾者",
                "轻中度睡眠呼吸暂停患者",
                "希望改善睡眠质量的人群",
              ].map((item) => (
                <div key={item} className="rounded-xl border border-border bg-card p-5 text-center">
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Coming Soon CTA */}
          <section className="rounded-2xl border border-border bg-muted/30 p-8 md:p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-3">敬请期待</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              AI智能止鼾枕正在进行最后的测试和优化，如需了解产品进展或预约体验，请联系我们
            </p>
            <a
              href="mailto:service@wuji-inc.com"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              获取最新消息
            </a>
          </section>
        </FadeIn>
      </article>
    </div>
  );
};

export default Product2;
