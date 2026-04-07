import Topbar from "@/components/Topbar";
import FadeIn from "@/components/FadeIn";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Wifi, Battery, Users, MapPin, Activity, Brain } from "lucide-react";
import m2Layout from "@/assets/m2-layout.jpg";
import appScreenshot from "@/assets/app-screenshot.png";
import sleepHypnogram from "@/assets/sleep-hypnogram.png";

const metricsData = [
  {
    category: "睡眠指标",
    items: [
      "睡眠分期", "总睡眠时长，TST*", "在床时间，TIB", "睡眠效率，SE",
      "入睡时长，SOL", "入睡后清醒时间，WASO", "睡眠规律性，SRI",
      "睡眠质量评分", "觉醒事件与指数", "体动与离床事件", "睡眠意图", "日间小睡统计"
    ],
  },
  {
    category: "呼吸系统",
    items: [
      "呼吸暂停低通气指数，AHI*", "NREM AHI", "REM AHI",
      "呼吸暂停低通气事件*", "打鼾事件与指数", "ODI", "血氧下降估算值*", "睡眠呼吸率"
    ],
  },
  {
    category: "心脏系统",
    items: ["睡眠心率*", "RR间期Poincaré图", "房颤监测"],
  },
  {
    category: "自主神经功能",
    items: ["HRV RMSSD", "HRV LF/HF", "呼吸率变异性，RRV"],
  },
  {
    category: "睡眠环境",
    items: ["温度", "湿度", "光照强度", "睡眠受光照影响的比例"],
  },
];

const Product1 = () => {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <article className="max-w-4xl mx-auto section-padding pt-24 pb-20">
        <FadeIn>
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" /> 返回首页
          </Link>

          {/* Hero */}
          <span className="text-xs font-medium text-primary mb-2 block tracking-widest uppercase">产品一</span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">睡眠监测垫</h1>
          <p className="text-primary font-medium mb-8">零负担居家监测</p>

          <div className="rounded-2xl overflow-hidden mb-8">
            <img src={m2Layout} alt="睡眠监测垫使用场景" className="w-full" />
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: <Activity className="w-5 h-5 text-primary" />, title: "无需穿戴，零负担", sub: "枕下放置即可监测" },
              { icon: <Wifi className="w-5 h-5 text-primary" />, title: "多维度睡眠指标", sub: "30+生理指标体系" },
              { icon: <CheckCircle2 className="w-5 h-5 text-primary" />, title: "医疗级准确性", sub: "临床验证的诊断能力" },
              { icon: <Brain className="w-5 h-5 text-primary" />, title: "AI睡眠健康管理", sub: "智能分析与预警" },
            ].map((s) => (
              <div key={s.title} className="rounded-xl border border-border bg-card p-6 text-center">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  {s.icon}
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">{s.title}</div>
                <div className="text-xs text-muted-foreground">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Product Intro */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-foreground mb-4">产品介绍</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>五季医学睡眠监测垫是一款基于心冲击图（BCG）技术的居家无感睡眠监测设备。只需将监测垫放置在枕头下方，即可自动采集整夜的生理信号，通过AI算法实现睡眠分期、呼吸事件分析和多维生理指标输出。</p>
              <p>相比传统的多导睡眠监测（PSG），睡眠监测垫无需复杂的导联连接，不影响正常睡眠习惯，可实现居家长期连续监测，为睡眠疾病筛查、随访管理和科研数据积累提供便捷、准确的解决方案。</p>
              <p>产品已在全国 50 余家医院睡眠科、神经科、呼吸科等科室广泛开展科研合作，支持长期筛查预警、院后随访管理，以及面向临床科研的高质量数据积累。2025 年 9 月，核心产品正式获批第二类医疗器械注册证书，合规能力全面升级。</p>
            </div>
          </section>

          {/* Core Features - 2x2 Grid */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-foreground mb-6">核心特点</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "零穿戴、零接触、零配置",
                  desc: "将监测垫放置于枕下即可开始监测，无需佩戴任何设备，不影响正常睡眠习惯。",
                },
                {
                  title: "医疗级准确性",
                  desc: "睡眠分期四分期准确性达85%，AHI≥5诊断敏感性92.1%、特异性94.4%，与金标准相关系数r=0.967。",
                },
                {
                  title: "30+生理指标",
                  desc: "覆盖AASM HSAT诊断范围，包括睡眠分期、呼吸事件、心率变异性、体动等多维度指标。",
                },
                {
                  title: "长期数据积累",
                  desc: "支持连续夜间监测，形成个人睡眠健康档案，为长期趋势分析和健康管理提供数据基础。",
                },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <h3 className="font-semibold text-foreground">{f.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 居家睡眠行为全周期分析 */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-foreground mb-6">居家睡眠行为全周期分析</h2>
            <div className="rounded-xl border border-border bg-card p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: description */}
                <div className="flex flex-col justify-center">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    相较于院内睡眠中心，居家环境中的真实睡眠有着更高的复杂性。我们具有对睡眠中的行为和事件进行完整分析的能力，真实还原睡眠：
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                    {[
                      "上床时间", "\u201C活动\u201D时间*", "入睡时间", "睡眠分期",
                      "夜间体动事件*", "夜间离床事件*", "觉醒事件", "醒来时间",
                      "离床时间", "日间小睡*"
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className={`text-sm ${item.includes("*") ? "text-primary font-medium" : "text-foreground"}`}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 italic">* 为 PSG 所不具备的独特指标</p>
                </div>

                {/* Right: sleep hypnogram */}
                <div className="flex items-center justify-center">
                  <img src={sleepHypnogram} alt="睡眠分期图" className="rounded-lg max-h-72 object-contain" />
                </div>
              </div>
            </div>
          </section>

          {/* 全面的临床/居家睡眠监测指标 */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-foreground mb-3">全面的临床/居家睡眠监测指标</h2>
            <p className="text-sm text-muted-foreground mb-6">覆盖 AASM HSAT 诊断设备指标范围，同时提供传统 PSG 无法获取的居家行为与环境数据。</p>
            <div className="rounded-xl border border-border bg-card p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {metricsData.map((group) => (
                  <div key={group.category}>
                    <h3 className="text-sm font-bold text-primary mb-3 flex items-center gap-1.5">
                      <span className="text-primary">›</span> {group.category}
                    </h3>
                    <div className="space-y-1.5">
                      {group.items.map((item) => (
                        <p key={item} className={`text-sm ${item.includes("*") ? "text-foreground" : "text-muted-foreground"}`}>
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-6 italic">* AASM HSAT 诊断设备指标</p>
            </div>
          </section>


          {/* Data Service */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-foreground mb-4">数据报告</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              监测数据通过小程序实时推送每日睡眠报告摘要与风险预警指标。同时，医生或科研端可通过专属平台查看实时指标、长期趋势与原始数据，支持临床辅助判断与研究分析。
            </p>
          </section>

          {/* App Screenshot */}
          <section className="mb-16">
            <div className="rounded-2xl overflow-hidden">
              <img src={appScreenshot} alt="睡眠报告界面" className="w-full" />
            </div>
          </section>

          {/* Clinical Validation Table */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-foreground mb-3">临床验证数据</h2>
            <p className="text-sm text-muted-foreground mb-6">以下数据来源于多中心前瞻性临床研究，与院内多导睡眠图（PSG）金标准进行交叉验证。</p>
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-3 px-5 font-medium text-foreground">监测指标</th>
                    <th className="text-right py-3 px-5 font-medium text-foreground">验证结果</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: "心率误差", result: "< ±1.8 次/分", highlight: true },
                    { metric: "呼吸率误差", result: "< ±0.4 次/分", highlight: true },
                    { metric: "睡眠分期准确性（Acc）", result: "0.85", highlight: false },
                    { metric: "Kappa 系数", result: "0.772", highlight: false },
                    { metric: "AHI≥5 敏感性", result: "0.921", highlight: false },
                    { metric: "AHI≥5 特异性", result: "0.944", highlight: false },
                    { metric: "与金标准相关系数 r", result: "0.967", highlight: false },
                  ].map((row, i) => (
                    <tr key={row.metric} className={i < 6 ? "border-b border-border" : ""}>
                      <td className="py-3.5 px-5 text-muted-foreground">{row.metric}</td>
                      <td className={`py-3.5 px-5 text-right font-medium text-primary`}>{row.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Use Cases - 3 Column Cards */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-foreground mb-6">适用场景</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "居家连续监测",
                  desc: "适合高危人群（打鼾、肥胖、高血压）的长期睡眠健康监测与早期筛查预警。",
                },
                {
                  title: "院后随访管理",
                  desc: "支持出院后的睡眠健康跟踪与治疗效果评估，降低复诊成本。",
                },
                {
                  title: "临床科研数据",
                  desc: "为睡眠医学、神经科、心脏科等方向的真实世界研究提供高质量数据支撑。",
                },
              ].map((c) => (
                <div key={c.title} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-primary mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Product Specs Table */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-foreground mb-6">产品规格</h2>
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: "监测方式", value: "BCG（心冲击图）" },
                    { label: "放置位置", value: "枕头下方" },
                    { label: "数据传输", value: "Wi-Fi / 蓝牙" },
                    { label: "供电方式", value: "USB供电" },
                    { label: "适用人群", value: "成人（18岁以上）" },
                  ].map((row, i) => (
                    <tr key={row.label} className={i < 4 ? "border-b border-border" : ""}>
                      <td className="py-3.5 px-5 text-muted-foreground">{row.label}</td>
                      <td className="py-3.5 px-5 text-right font-medium text-foreground">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Compliance */}
          <section className="rounded-xl border border-border bg-muted/20 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              五季医学睡眠监测垫已于 2025 年 9 月获批<strong className="text-foreground">第二类医疗器械注册证</strong>，具备合规的医疗级产品资质。
            </p>
          </section>
        </FadeIn>
      </article>
    </div>
  );
};

export default Product1;
