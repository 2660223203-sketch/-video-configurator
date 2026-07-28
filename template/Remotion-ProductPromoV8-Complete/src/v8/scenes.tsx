import React from "react";
import {AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame} from "remotion";
import {COMPANY_V8, PRODUCT, SELLING_POINTS} from "./content";
import {
  Advantage,
  FootagePanel,
  Panel,
  PdfPanel,
  ProductVisual,
  SafeScene,
  SceneHeader,
  TechBackground,
  clamp,
  enter,
} from "./components";
import {V8, V8_ASSETS} from "./theme";

export const CompanyIntroV8: React.FC = () => {
  const frame = useCurrentFrame();
  const scan = interpolate(frame, [18, 92], [-150, 1080], clamp);
  return (
    <SafeScene>
      <TechBackground />
      <AbsoluteFill style={{background: "radial-gradient(circle at 50% 38%, rgba(55,195,238,0.12), transparent 31%)"}} />
      <svg width="1920" height="1080" style={{position: "absolute", inset: 0}}>
        {Array.from({length: 20}).map((_, i) => {
          const angle = i * Math.PI * 2 / 20;
          const progress = interpolate(frame, [0, 52], [0, 1], clamp);
          const x = 960 + Math.cos(angle) * (420 - progress * 255);
          const y = 365 + Math.sin(angle) * (300 - progress * 170);
          return <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3 : 2} fill={i % 2 ? V8.colors.accent : V8.colors.accent2} opacity={0.36 + (i % 4) * 0.1} />;
        })}
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M ${120 + i * 90} ${200 + i * 130} H ${460 + i * 70} L ${600 + i * 70} ${340 + i * 72}`}
            fill="none"
            stroke={V8.colors.accent}
            strokeWidth="2"
            strokeOpacity="0.22"
            strokeDasharray="460"
            strokeDashoffset={interpolate(frame, [8 + i * 4, 54 + i * 4], [460, 0], clamp)}
          />
        ))}
      </svg>
      <div style={{position: "absolute", left: 0, right: 0, top: scan, height: 3, background: "linear-gradient(90deg, transparent 22%, #52D9FF 50%, transparent 78%)", boxShadow: "0 0 32px #52D9FF", opacity: 0.72}} />
      <div style={{position: "absolute", left: "50%", top: 150, translate: "-50% 0", width: 920, textAlign: "center"}}>
        <div style={{width: 210, height: 210, margin: "0 auto", borderRadius: 28, overflow: "hidden", background: "white", boxShadow: "0 0 70px rgba(82,217,255,0.26)", ...enter(frame, 22, 0), scale: interpolate(frame, [14, 54], [0.86, 1], clamp)}}>
          <Img src={staticFile("assets/brand/logo.png")} style={{width: "100%", height: "100%", objectFit: "contain"}} />
        </div>
        <div style={{fontSize: 49, fontWeight: 720, marginTop: 28, letterSpacing: 2, ...enter(frame, 52)}}>{COMPANY_V8.name}</div>
        <div style={{display: "flex", justifyContent: "center", gap: 22, alignItems: "center", marginTop: 22, ...enter(frame, 78)}}>
          <span style={{width: 110, height: 1, background: V8.colors.line}} />
          <span style={{fontSize: 27, color: V8.colors.accent, letterSpacing: 3}}>{COMPANY_V8.positioning}</span>
          <span style={{width: 110, height: 1, background: V8.colors.line}} />
        </div>
        <div style={{fontSize: 23, color: V8.colors.muted, marginTop: 16, letterSpacing: 1.5, ...enter(frame, 96)}}>{COMPANY_V8.value}</div>
      </div>
    </SafeScene>
  );
};

export const ProductRevealV8: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SafeScene>
      <TechBackground focus="right" />
      <SceneHeader kicker="PRODUCT OVERVIEW" title={PRODUCT.name} subtitle={PRODUCT.subtitle} />
      <div style={{position: "absolute", left: 80, top: 290}}><ProductVisual width={560} delay={10} /></div>
      <div style={{position: "absolute", left: 96, bottom: 140, fontFamily: V8.mono, fontSize: 21, color: V8.colors.muted, ...enter(frame, 30)}}>{PRODUCT.model}</div>
      <Panel style={{position: "absolute", right: 96, top: 228, width: 1040, height: 620, overflow: "hidden"}}>
        <div style={{position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(11,35,50,.82), rgba(4,11,18,.98))"}} />
        <Sequence durationInFrames={144}>
          <FootagePanel src={V8_ASSETS.productRig} darken={0.08} objectPosition="45% 52%" style={{position: "absolute", inset: 0, border: "none", borderRadius: 0}} />
        </Sequence>
        <Sequence from={138}>
          <AbsoluteFill style={{background: "radial-gradient(circle at 50% 48%, rgba(82,217,255,.15), rgba(4,11,18,.98) 60%)", padding: "92px 54px 110px"}}>
            <div style={{fontFamily: V8.mono, color: V8.colors.accent, fontSize: 18, letterSpacing: 2}}>KEY FEATURES</div>
            <div style={{fontSize: 38, fontWeight: 720, marginTop: 16}}>核心功能特性</div>
            <div style={{display: "grid", gridTemplateColumns: `repeat(${PRODUCT.features.length}, 1fr)`, gap: 18, marginTop: 62}}>
              {PRODUCT.features.map((item, i) => (
                <Panel key={item.en} style={{padding: "28px 24px", textAlign: "center", ...enter(frame, 142 + i * 8)}}>
                  <div style={{fontFamily: V8.mono, fontSize: 34, fontWeight: 750, color: i === 1 ? V8.colors.accent2 : V8.colors.accent}}>{item.en}</div>
                  <div style={{fontSize: 23, marginTop: 14}}>{item.zh}</div>
                </Panel>
              ))}
            </div>
          </AbsoluteFill>
        </Sequence>
        <div style={{position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(4,10,16,.65), transparent 45%, rgba(4,10,16,.18))"}} />
        <div style={{position: "absolute", left: 42, top: 38, fontSize: 18, color: V8.colors.accent, letterSpacing: 2}}>PRODUCT TEST BENCH</div>
        <div style={{position: "absolute", left: 42, bottom: 38, display: "flex", gap: 14, opacity: interpolate(frame, [124, 138], [1, 0], clamp)}}>
          {PRODUCT.features.map((item, i) => (
            <div key={item.en} style={{padding: "15px 22px", borderRadius: 12, background: "rgba(5,16,24,.82)", border: `1px solid ${V8.colors.line}`, fontSize: 23, fontWeight: 650, ...enter(frame, 82 + i * 10)}}>{item.zh}</div>
          ))}
        </div>
      </Panel>
    </SafeScene>
  );
};

export const FrequencyV8: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [32, 150], [0, 1], clamp);
  return (
    <SafeScene>
      <TechBackground focus="left" />
      <SceneHeader kicker="ADVANTAGE 01 / WIDEBAND" title="宽频覆盖能力" subtitle="核心参数驱动宽范围信号转换" />
      <div style={{position: "absolute", left: 96, top: 300, width: 660}}>
        <Advantage title="射频工作范围" value={PRODUCT.frequency} note="实现宽范围信号转换" delay={12} />
        <div style={{marginTop: 58, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18}}>
          <Panel style={{padding: "24px 28px", ...enter(frame, 35)}}><div style={{fontSize: 18, color: V8.colors.muted}}>中频范围</div><div style={{fontFamily: V8.mono, fontSize: 34, fontWeight: 700, marginTop: 10}}>{PRODUCT.intermediateFrequency}</div></Panel>
          <Panel style={{padding: "24px 28px", ...enter(frame, 46)}}><div style={{fontSize: 18, color: V8.colors.muted}}>频率覆盖跨度</div><div style={{fontFamily: V8.mono, fontSize: 34, fontWeight: 700, color: V8.colors.accent2, marginTop: 10}}>{PRODUCT.frequencySpan}</div></Panel>
        </div>
      </div>
      <Panel style={{position: "absolute", right: 96, top: 278, width: 980, height: 500, padding: "44px 52px"}}>
        <div style={{fontFamily: V8.mono, fontSize: 20, color: V8.colors.muted}}>RF FREQUENCY COVERAGE</div>
        <div style={{position: "relative", marginTop: 126, height: 130}}>
          <div style={{position: "absolute", left: 0, right: 0, top: 54, height: 2, background: "rgba(255,255,255,.18)"}} />
          <div style={{position: "absolute", left: 0, top: 51, width: `${progress * 100}%`, height: 8, borderRadius: 4, background: "linear-gradient(90deg,#52D9FF,#61F0C5)", boxShadow: "0 0 26px rgba(82,217,255,.48)"}} />
          {[2, 6, 10, 14, 18].map((value, i) => (
            <div key={value} style={{position: "absolute", left: `${i * 25}%`, top: 30, translate: "-50% 0", textAlign: "center"}}>
              <div style={{width: 2, height: 56, background: i === 0 || i === 4 ? V8.colors.accent : V8.colors.line, margin: "0 auto"}} />
              <div style={{fontFamily: V8.mono, fontSize: 22, marginTop: 16, color: i === 0 || i === 4 ? V8.colors.text : V8.colors.muted}}>{value}GHz</div>
            </div>
          ))}
        </div>
        <div style={{display: "flex", justifyContent: "space-between", marginTop: 84, color: V8.colors.muted, fontSize: 20}}><span>WIDE RANGE CONVERSION</span><span style={{color: V8.colors.accent2}}>{PRODUCT.frequency}</span></div>
      </Panel>
    </SafeScene>
  );
};

export const BandwidthV8: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [34, 118], [0, 100], clamp);
  return (
    <SafeScene>
      <TechBackground focus="right" />
      <SceneHeader kicker="ADVANTAGE 02 / BANDWIDTH" title="宽带信号处理" subtitle="上、下变频信号链协同工作" />
      <div style={{position: "absolute", left: 96, top: 320, width: 570}}>
        <Advantage title="瞬时带宽" value={PRODUCT.bandwidth} note="满足宽带信号处理需求" delay={10} />
        <svg width="560" height="210" style={{marginTop: 50}}>
          <path d="M 0 110 C 55 20, 110 200, 165 110 C 220 20, 275 200, 330 110 C 385 20, 440 200, 495 110 C 520 70, 540 70, 560 110" fill="none" stroke={V8.colors.accent} strokeWidth="4" strokeDasharray="900" strokeDashoffset={interpolate(frame, [28, 120], [900, 0], clamp)} />
          <line x1="0" y1="180" x2={interpolate(frame, [42, 125], [0, 560], clamp)} y2="180" stroke={V8.colors.accent2} strokeWidth="2" />
          <text x="0" y="205" fill={V8.colors.muted} fontSize="18">WIDEBAND SIGNAL</text>
        </svg>
      </div>
      <div style={{position: "absolute", right: 96, top: 255, width: 1050, height: 600, ...enter(frame, 20)}}>
        <PdfPanel src={V8_ASSETS.signalBlocks} style={{position: "absolute", inset: 0, clipPath: `inset(0 ${100 - reveal}% 0 0)`}} />
        <div style={{position: "absolute", left: 35, right: 35, bottom: 34, height: 54, borderRadius: 12, background: "rgba(5,14,22,.88)", border: `1px solid ${V8.colors.line}`, display: "flex", alignItems: "center", justifyContent: "space-around", fontSize: 21}}><span>RF输入</span><span style={{color: V8.colors.accent}}>信号转换</span><span>IF输出</span><span style={{color: V8.colors.accent2}}>上/下变频</span></div>
      </div>
    </SafeScene>
  );
};

export const ControlV8: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SafeScene>
      <TechBackground focus="right" />
      <SceneHeader kicker="ADVANTAGE 03 / DIGITAL CONTROL" title="精准数字控制" subtitle="SPI接口灵活配置频率与衰减" />
      <div style={{position: "absolute", left: 96, top: 310, width: 610}}>
        <div style={{display: "grid", gap: 20}}>
          <Panel style={{padding: "30px 34px", ...enter(frame, 8)}}><div style={{fontSize: 22, color: V8.colors.muted}}>频率步进</div><div style={{fontFamily: V8.mono, fontSize: 62, color: V8.colors.accent, fontWeight: 750, marginTop: 8}}>{PRODUCT.step}</div><div style={{fontSize: 21, marginTop: 12}}>精细配置工作频点</div></Panel>
          <Panel style={{padding: "30px 34px", ...enter(frame, 20)}}><div style={{fontSize: 22, color: V8.colors.muted}}>射频 / 中频数控衰减</div><div style={{fontFamily: V8.mono, fontSize: 62, color: V8.colors.accent2, fontWeight: 750, marginTop: 8}}>{PRODUCT.attenuation}</div><div style={{fontSize: 21, marginTop: 12}}>1dB步进，灵活控制信号幅度</div></Panel>
        </div>
      </div>
      <Panel style={{position: "absolute", right: 96, top: 250, width: 1030, height: 610, overflow: "hidden"}}>
        <Sequence durationInFrames={120}>
          <FootagePanel src={V8_ASSETS.operation} darken={0.10} objectPosition="48% 52%" style={{position: "absolute", inset: 0, border: "none", borderRadius: 0}} />
        </Sequence>
        <Sequence from={108}>
          <PdfPanel src={V8_ASSETS.spiTiming} style={{position: "absolute", inset: 0, border: "none", borderRadius: 0, opacity: interpolate(frame, [108, 126], [0, 1], clamp)}} />
        </Sequence>
        <div style={{position: "absolute", left: 30, top: 28, padding: "10px 16px", borderRadius: 10, background: "rgba(4,12,18,.82)", border: `1px solid ${V8.colors.line}`, fontFamily: V8.mono, fontSize: 18, color: V8.colors.accent}}>SPI CONTROL / TEST</div>
      </Panel>
    </SafeScene>
  );
};

export const PurityV8: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SafeScene>
      <TechBackground focus="right" />
      <SceneHeader kicker="ADVANTAGE 04 / SIGNAL QUALITY" title="高纯度频率转换" subtitle="真实测试画面与技术曲线同步呈现" />
      <div style={{position: "absolute", left: 96, top: 335, width: 560}}>
        <Advantage title="输出交调及杂散抑制" value={PRODUCT.spur} note="提升输出信号纯度" delay={8} valueSize={76} />
        <div style={{marginTop: 56, fontSize: 20, color: V8.colors.muted, lineHeight: 1.7, ...enter(frame, 34)}}>参数来源：产品技术资料<br />测试画面：仪器界面与实测过程</div>
      </div>
      <Panel style={{position: "absolute", right: 96, top: 250, width: 1050, height: 610, overflow: "hidden"}}>
        <Sequence durationInFrames={105}>
          <FootagePanel src={V8_ASSETS.instrument} darken={0.06} objectPosition="48% 50%" style={{position: "absolute", inset: 0, border: "none", borderRadius: 0}} />
        </Sequence>
        <Sequence from={105} durationInFrames={57}>
          <FootagePanel src={V8_ASSETS.spectrum} darken={0.05} objectPosition="42% 50%" style={{position: "absolute", inset: 0, border: "none", borderRadius: 0}} />
        </Sequence>
        <Sequence from={150}>
          <PdfPanel src={V8_ASSETS.downCurves} style={{position: "absolute", inset: 0, border: "none", borderRadius: 0, opacity: interpolate(frame, [150, 170], [0, 1], clamp)}} />
        </Sequence>
        <div style={{position: "absolute", right: 28, top: 28, fontFamily: V8.mono, fontSize: 17, color: V8.colors.accent2, padding: "9px 14px", background: "rgba(4,12,18,.84)", borderRadius: 9}}>MEASURED PERFORMANCE</div>
      </Panel>
    </SafeScene>
  );
};

export const CompactV8: React.FC = () => {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [30, 100], [0, 1], clamp);
  return (
    <SafeScene>
      <TechBackground focus="left" />
      <SceneHeader kicker="ADVANTAGE 05 / COMPACT" title="小型化集成设计" subtitle="紧凑结构，便于系统集成" />
      <div style={{position: "absolute", left: 96, top: 245, width: 990, height: 640, ...enter(frame, 12)}}>
        <PdfPanel src={V8_ASSETS.dimensions} style={{position: "absolute", inset: 0}} />
        <svg width="990" height="640" style={{position: "absolute", inset: 0, pointerEvents: "none"}}>
          <line x1="225" y1="555" x2={225 + 520 * line} y2="555" stroke={V8.colors.accent} strokeWidth="3" />
          <line x1="810" y1="95" x2="810" y2={95 + 420 * line} stroke={V8.colors.accent2} strokeWidth="3" />
        </svg>
      </div>
      <div style={{position: "absolute", right: 96, top: 340, width: 620}}>
        <Advantage title="外形尺寸" value={PRODUCT.dimensions} note="紧凑结构 · 高度集成" delay={16} valueSize={55} />
        <Panel style={{marginTop: 52, padding: "28px 32px", ...enter(frame, 38)}}>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, fontSize: 22}}><div><span style={{color: V8.colors.muted}}>射频端口</span><br /><strong style={{fontSize: 28}}>RF IN / OUT</strong></div><div><span style={{color: V8.colors.muted}}>中频端口</span><br /><strong style={{fontSize: 28}}>IF IN / OUT</strong></div></div>
        </Panel>
      </div>
    </SafeScene>
  );
};

export const SummaryV8: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SafeScene>
      <TechBackground />
      <SceneHeader kicker="PRODUCT VALUE" title="高性能频率转换解决方案" subtitle="关键优势，一屏汇总" />
      <div style={{position: "absolute", left: 96, right: 96, top: 285, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22}}>
        {SELLING_POINTS.map((item, i) => (
          <Panel key={item.title} style={{height: 450, padding: "34px 30px", display: "flex", flexDirection: "column", ...enter(frame, 8 + i * 8)}}>
            <div style={{fontFamily: V8.mono, color: V8.colors.accent, fontSize: 17}}>0{i + 1}</div>
            <div style={{fontSize: 28, fontWeight: 700, marginTop: 44}}>{item.title}</div>
            <div style={{height: 2, width: interpolate(frame, [30 + i * 8, 78 + i * 8], [0, 96], clamp), background: i % 2 ? V8.colors.accent2 : V8.colors.accent, marginTop: 26}} />
            <div style={{fontFamily: V8.mono, fontSize: 38, fontWeight: 750, marginTop: 42, color: V8.colors.text, lineHeight: 1.2}}>{item.value}</div>
            <div style={{fontSize: 21, color: V8.colors.muted, marginTop: "auto", lineHeight: 1.5}}>{item.note}</div>
          </Panel>
        ))}
      </div>
    </SafeScene>
  );
};

const PosterQr: React.FC<{cropX: number; cropY: number; cropSize: number}> = ({cropX, cropY, cropSize}) => {
  const size = 170;
  const scale = size / cropSize;
  return (
    <div style={{position: "relative", width: size, height: size, overflow: "hidden", background: "white"}}>
      <Img src={staticFile("assets/brand/v3-product-promo.jpg")} style={{position: "absolute", width: 3508 * scale, height: 4961 * scale, left: -cropX * scale, top: -cropY * scale}} />
    </div>
  );
};

export const EndV8: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SafeScene>
      <AbsoluteFill style={{background: "radial-gradient(circle at 78% 18%, #15374A 0%, #07141E 40%, #04090F 100%)"}} />
      <div style={{position: "absolute", left: 96, top: 105, display: "flex", alignItems: "center", gap: 24, ...enter(frame)}}>
        <div style={{width: 112, height: 112, borderRadius: 17, background: "white", overflow: "hidden"}}><Img src={staticFile("assets/brand/logo.png")} style={{width: "100%", height: "100%", objectFit: "contain"}} /></div>
        <div><div style={{fontSize: 39, fontWeight: 720}}>{COMPANY_V8.name}</div><div style={{fontSize: 20, color: V8.colors.accent, letterSpacing: 2, marginTop: 10}}>{COMPANY_V8.positioning} · {COMPANY_V8.value}</div></div>
      </div>
      <div style={{position: "absolute", left: 96, top: 330, width: 920, ...enter(frame, 10)}}>
        <div style={{fontFamily: V8.mono, fontSize: 19, color: V8.colors.accent}}>{PRODUCT.model}</div>
        <div style={{fontSize: 47, fontWeight: 720, marginTop: 20}}>技术沟通 · 产品资料</div>
        <Panel style={{marginTop: 42, padding: "28px 34px", width: 720}}>
          <div style={{display: "grid", gridTemplateColumns: "110px 1fr", rowGap: 17, alignItems: "baseline", fontSize: 21}}>
            <span style={{color: V8.colors.muted}}>联系人</span><strong style={{fontSize: 28}}>{COMPANY_V8.contact}</strong>
            <span style={{color: V8.colors.muted}}>电话</span><strong style={{fontFamily: V8.mono, fontSize: 27}}>{COMPANY_V8.phone} <small style={{fontFamily: V8.font, color: V8.colors.muted, fontSize: 17}}>微信同号</small></strong>
            <span style={{color: V8.colors.muted}}>邮箱</span><strong style={{fontFamily: V8.mono, fontSize: 24}}>{COMPANY_V8.email}</strong>
          </div>
        </Panel>
      </div>
      <div style={{position: "absolute", right: 96, top: 340, display: "flex", gap: 26}}>
        {[
          {label: "产品小程序", x: 1940, y: 1630, size: 340},
          {label: "公司网址", x: 2935, y: 1630, size: 330},
        ].map((item, i) => (
          <Panel key={item.label} style={{padding: 18, textAlign: "center", ...enter(frame, 14 + i * 8)}}>
            <PosterQr cropX={item.x} cropY={item.y} cropSize={item.size} />
            <div style={{fontSize: 20, fontWeight: 650, marginTop: 14}}>{item.label}</div>
          </Panel>
        ))}
      </div>
      <div style={{position: "absolute", left: 96, right: 96, bottom: 92, height: 1, background: V8.colors.line}} />
    </SafeScene>
  );
};
