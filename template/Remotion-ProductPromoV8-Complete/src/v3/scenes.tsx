import React from "react";
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from "remotion";
import {COMPANY} from "../config/brand";
import {PRODUCT_MODEL, PRODUCT_NAME, PRODUCT_PARAMS, PRODUCT_TYPE} from "../config/content";
import {enter, Footage, Metric, Panel, ProductVisual, SafeFrame, SceneTitle, TechBackground} from "./components";
import {V3, V3_CLIPS} from "./theme";

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

export const CompanyIntroV3: React.FC = () => {
  const frame = useCurrentFrame();
  const logoReveal = interpolate(frame, [16, 88], [100, 0], clamp);
  const scanX = interpolate(frame, [36, 152], [-280, 280], clamp);
  const lineProgress = interpolate(frame, [0, 124], [0, 1], clamp);
  const circuits = [
    {x1: 205, y1: 120, x2: 720, y2: 330},
    {x1: 1715, y1: 150, x2: 1200, y2: 330},
    {x1: 130, y1: 880, x2: 720, y2: 600},
    {x1: 1790, y1: 900, x2: 1200, y2: 600},
  ];
  return (
    <SafeFrame>
      <TechBackground focus="center" />
      <svg width="1920" height="1080" style={{position: "absolute", inset: 0}}>
        {circuits.map((line, index) => (
          <g key={index} opacity={0.65}>
            <line {...line} stroke={index % 2 ? V3.colors.accent2 : V3.colors.accent} strokeWidth="2" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - lineProgress} />
            <circle cx={line.x1} cy={line.y1} r="5" fill={V3.colors.accent} opacity={lineProgress} />
          </g>
        ))}
      </svg>
      <div style={{position: "absolute", left: "50%", top: 130, width: 320, height: 320, translate: "-50% 0", scale: interpolate(frame, [16, 92], [0.82, 1], clamp), borderRadius: 38, background: "rgba(255,255,255,0.96)", boxShadow: `0 0 0 1px ${V3.colors.line}, 0 0 80px rgba(72,214,255,0.22)`, overflow: "hidden", clipPath: `inset(0 ${logoReveal}% 0 0 round 38px)`}}>
        <Img src={staticFile("assets/brand/logo.png")} style={{width: "100%", height: "100%", objectFit: "contain"}} />
        <div style={{position: "absolute", top: 0, bottom: 0, left: "50%", width: 72, translate: `${scanX}px 0`, background: "linear-gradient(90deg, transparent, rgba(72,214,255,0.55), transparent)", filter: "blur(7px)"}} />
      </div>
      <div style={{position: "absolute", left: "50%", top: 500, width: 1540, translate: "-50% 0", textAlign: "center"}}>
        <div style={{fontSize: 54, fontWeight: 700, letterSpacing: 2, ...enter(frame, 68)}}>成都中远创视科技有限公司</div>
        <div style={{width: interpolate(frame, [88, 164], [0, 860], clamp), height: 2, margin: "24px auto 0", background: `linear-gradient(90deg, transparent, ${V3.colors.accent}, ${V3.colors.accent2}, transparent)`}} />
        <div style={{fontSize: 31, color: V3.colors.accent, letterSpacing: 3, marginTop: 28, ...enter(frame, 112)}}>电子对抗微波射频组件核心供应商</div>
        <div style={{fontSize: 24, lineHeight: 1.65, color: V3.colors.muted, marginTop: 28, ...enter(frame, 152)}}>
          专注微波射频芯片、组件及模组研发制造
        </div>
      </div>
      <div style={{position: "absolute", left: "50%", bottom: 52, translate: "-50% 0", fontFamily: V3.mono, fontSize: 15, color: V3.colors.faint, letterSpacing: 5, ...enter(frame, 176)}}>MICROWAVE · RF · INNOVATION</div>
    </SafeFrame>
  );
};

export const OpeningV3: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SafeFrame>
      <TechBackground focus="right" />
      <div style={{position: "absolute", left: V3.safeX, top: 260, width: 1060}}>
        <div style={{fontSize: 22, color: V3.colors.accent, letterSpacing: 4, ...enter(frame, 0)}}>ZCVISION · RF SYSTEM</div>
        <div style={{fontSize: 82, fontWeight: 700, lineHeight: 1.08, marginTop: 24, ...enter(frame, 8)}}>{PRODUCT_NAME}</div>
        <div style={{fontSize: 34, color: V3.colors.muted, marginTop: 24, ...enter(frame, 16)}}>宽带变频能力 · 一体化集成</div>
        <div style={{fontFamily: V3.mono, fontSize: 24, color: V3.colors.faint, marginTop: 42, ...enter(frame, 24)}}>{PRODUCT_MODEL}</div>
      </div>
      <div style={{position: "absolute", right: 110, top: 200, fontFamily: V3.mono, fontSize: 230, fontWeight: 700, color: "rgba(72,214,255,0.08)", letterSpacing: -20}}>2—18</div>
    </SafeFrame>
  );
};

export const ProductV3: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SafeFrame>
      <TechBackground focus="left" />
      <SceneTitle kicker="PRODUCT" title={PRODUCT_NAME} subtitle={PRODUCT_TYPE} />
      <div style={{position: "absolute", left: V3.safeX, top: 210, width: 820, height: 760, display: "flex", alignItems: "center", justifyContent: "center"}}>
        <ProductVisual width={650} delay={8} />
      </div>
      <Panel style={{position: "absolute", right: V3.safeX, top: 175, width: 780, height: 690, overflow: "hidden", ...enter(frame, 12)}}>
        <Footage src={V3_CLIPS.productBench.asset} startSecond={V3_CLIPS.productBench.startSecond} darken={0.12} radius={V3.radius} objectPosition="48% 50%" />
        <div style={{position: "absolute", left: 28, bottom: 26, padding: "12px 18px", borderRadius: 10, background: "rgba(4,12,18,0.72)", fontSize: 22}}>产品与测试平台同框</div>
      </Panel>
      <div style={{position: "absolute", left: V3.safeX, bottom: 72, fontFamily: V3.mono, fontSize: 23, color: V3.colors.muted, ...enter(frame, 24)}}>{PRODUCT_MODEL}</div>
    </SafeFrame>
  );
};

const capabilities = [
  {index: "01", title: "上变频", note: "UP CONVERSION"},
  {index: "02", title: "下变频", note: "DOWN CONVERSION"},
  {index: "03", title: "跳频源＋点频源", note: "FREQUENCY SOURCE"},
];

export const CapabilitiesV3: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SafeFrame>
      <TechBackground focus="center" />
      <SceneTitle kicker="INTEGRATION" title="三大功能，一体集成" subtitle="减少分立模块，让系统架构更清晰" />
      <div style={{position: "absolute", left: V3.safeX, right: V3.safeX, top: 330, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28}}>
        {capabilities.map((item, i) => (
          <Panel key={item.index} style={{height: 360, padding: 34, ...enter(frame, 12 + i * 12)}}>
            <div style={{fontFamily: V3.mono, fontSize: 22, color: V3.colors.accent}}>{item.index}</div>
            <div style={{fontSize: 38, fontWeight: 700, marginTop: 52}}>{item.title}</div>
            <div style={{fontFamily: V3.mono, fontSize: 19, color: V3.colors.muted, marginTop: 18}}>{item.note}</div>
            <div style={{height: 3, width: interpolate(frame, [28 + i * 12, 70 + i * 12], [0, 100], clamp) + "%", background: `linear-gradient(90deg, ${V3.colors.accent}, ${V3.colors.accent2})`, marginTop: 70}} />
          </Panel>
        ))}
      </div>
    </SafeFrame>
  );
};

export const FrequencyV3: React.FC = () => {
  const frame = useCurrentFrame();
  const endValue = Math.round(interpolate(frame, [18, 82], [2, 18], clamp));
  const lineProgress = interpolate(frame, [16, 84], [0, 1], clamp);
  return (
    <SafeFrame>
      <TechBackground focus="left" />
      <SceneTitle kicker="WIDEBAND" title="2～18GHz 宽频覆盖" subtitle="核心参数来自现有正式产品文案" />
      <Panel style={{position: "absolute", left: V3.safeX, top: 265, width: 1080, height: 610, padding: 46, ...enter(frame, 8)}}>
        <div style={{fontFamily: V3.mono, fontSize: 130, fontWeight: 700, letterSpacing: -8}}><span style={{color: V3.colors.accent}}>2</span><span style={{color: V3.colors.faint}}> — </span>{endValue}<span style={{fontSize: 42, marginLeft: 18, color: V3.colors.muted}}>GHz</span></div>
        <div style={{position: "relative", height: 120, marginTop: 74}}>
          <div style={{position: "absolute", left: 0, right: 0, top: 46, height: 2, background: V3.colors.line}} />
          <div style={{position: "absolute", left: 0, top: 42, width: `${lineProgress * 100}%`, height: 10, borderRadius: 5, background: `linear-gradient(90deg, ${V3.colors.accent}, ${V3.colors.accent2})`}} />
          {[2, 6, 10, 14, 18].map((n, i) => <div key={n} style={{position: "absolute", left: `${i * 25}%`, top: 72, translate: i === 4 ? "-100% 0" : i === 0 ? "0 0" : "-50% 0", fontFamily: V3.mono, fontSize: 22, color: V3.colors.muted}}>{n}GHz</div>)}
        </div>
        <div style={{fontSize: 26, color: V3.colors.muted, marginTop: 82}}>宽频覆盖 · 宽带处理</div>
      </Panel>
      <div style={{position: "absolute", right: V3.safeX, top: 265, width: 510, display: "grid", gap: 22}}>
        <Metric label="中频范围" value={PRODUCT_PARAMS.ifRange} delay={22} />
        <Metric label="瞬时带宽" value={PRODUCT_PARAMS.instantaneousBandwidth} note="BANDWIDTH" delay={34} />
      </div>
    </SafeFrame>
  );
};

export const OperationV3: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SafeFrame>
      <Footage src={V3_CLIPS.operation.asset} startSecond={V3_CLIPS.operation.startSecond} darken={0.18} objectPosition="58% 50%" />
      <div style={{position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(4,12,18,0.88) 0%, rgba(4,12,18,0.25) 52%, transparent 78%)"}} />
      <div style={{position: "absolute", left: V3.safeX, top: 250, width: 650, ...enter(frame, 4)}}>
        <div style={{fontSize: 20, letterSpacing: 3, color: V3.colors.accent}}>OPERATION</div>
        <div style={{fontSize: 58, fontWeight: 700, marginTop: 18}}>连接、调试、操作</div>
        <div style={{fontSize: 26, color: V3.colors.muted, lineHeight: 1.55, marginTop: 22}}>真实实验环境与设备操作画面<br />用于呈现完整的工作流程</div>
      </div>
      <div style={{position: "absolute", left: V3.safeX, bottom: 72, fontSize: 22, color: V3.colors.muted, ...enter(frame, 22)}}>产品操作场景展示</div>
    </SafeFrame>
  );
};

export const TestV3: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SafeFrame>
      <Footage src={V3_CLIPS.instrument.asset} startSecond={V3_CLIPS.instrument.startSecond} darken={0.08} objectPosition="center" />
      <div style={{position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(4,12,18,0.72) 0%, transparent 34%, transparent 65%, rgba(4,12,18,0.72) 100%)"}} />
      <div style={{position: "absolute", left: V3.safeX, top: V3.safeY, ...enter(frame, 2)}}>
        <div style={{fontSize: 20, letterSpacing: 3, color: V3.colors.accent}}>TEST PROCESS</div>
        <div style={{fontSize: 52, fontWeight: 700, marginTop: 12}}>仪器测试过程</div>
      </div>
      <Panel style={{position: "absolute", right: V3.safeX, bottom: 72, padding: "20px 26px", ...enter(frame, 18)}}>
        <div style={{fontSize: 24}}>测试平台全景 · 仪器屏幕变化</div>
        <div style={{fontSize: 18, color: V3.colors.muted, marginTop: 8}}>画面仅作产品操作场景展示</div>
      </Panel>
    </SafeFrame>
  );
};

export const PerformanceV3: React.FC = () => {
  const frame = useCurrentFrame();
  const path = "M 80 400 C 180 398, 240 395, 330 392 C 420 390, 480 368, 530 352 C 570 342, 590 110, 620 84 C 650 110, 670 342, 710 352 C 790 380, 860 392, 980 394 C 1080 396, 1160 398, 1240 400";
  const progress = interpolate(frame, [12, 75], [0, 1], clamp);
  return (
    <SafeFrame>
      <TechBackground focus="center" />
      <SceneTitle kicker="PERFORMANCE" title="输出交调及杂散抑制" subtitle="产品关键指标" />
      <Panel style={{position: "absolute", left: V3.safeX, top: 235, width: 1320, height: 650, padding: 34, ...enter(frame, 6)}}>
        <svg width="1250" height="540" viewBox="0 0 1320 520">
          {[100, 200, 300, 400].map((y) => <line key={y} x1="55" x2="1260" y1={y} y2={y} stroke={V3.colors.line} />)}
          <path d={path} fill="none" stroke={V3.colors.accent} strokeWidth="5" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - progress} />
          <path d="M80 400 C250 392 320 385 410 380" fill="none" stroke={V3.colors.accent2} strokeWidth="2" opacity="0.7" />
          <path d="M830 382 C930 388 1090 396 1240 400" fill="none" stroke={V3.colors.accent2} strokeWidth="2" opacity="0.7" />
        </svg>
      </Panel>
      <Panel style={{position: "absolute", right: V3.safeX, top: 330, width: 360, padding: "32px 30px", ...enter(frame, 22)}}>
        <div style={{fontSize: 20, color: V3.colors.muted}}>核心指标</div>
        <div style={{fontFamily: V3.mono, fontSize: 68, fontWeight: 700, color: V3.colors.accent2, marginTop: 12}}>{PRODUCT_PARAMS.spurSuppression}</div>
        <div style={{fontSize: 22, marginTop: 14}}>杂散抑制</div>
      </Panel>
    </SafeFrame>
  );
};

export const IntegrationValueV3: React.FC = () => {
  const frame = useCurrentFrame();
  const items = [
    {label: "内置信号源", value: "跳频 + 点频", note: "FREQUENCY SOURCE"},
    {label: "控制方式", value: "SPI", note: "频率与衰减控制"},
    {label: "模块化集成", value: "68 × 78.5 × 9.5", note: "mm · 120g"},
  ];
  return (
    <SafeFrame>
      <TechBackground focus="right" />
      <SceneTitle kicker="PRODUCT VALUE" title="高性能频率转换解决方案" subtitle="信号转换 · 频率控制 · 模块化集成" />
      <div style={{position: "absolute", left: V3.safeX, right: V3.safeX, top: 330, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28}}>
        {items.map((item, i) => (
          <Panel key={item.label} style={{height: 350, padding: 34, ...enter(frame, 8 + i * 12)}}>
            <div style={{fontSize: 21, color: V3.colors.muted}}>{item.label}</div>
            <div style={{fontFamily: V3.mono, fontSize: i === 2 ? 40 : i === 0 ? 43 : 66, fontWeight: 700, color: i === 1 ? V3.colors.accent : V3.colors.text, marginTop: 66}}>{item.value}</div>
            <div style={{fontSize: 22, color: V3.colors.accent2, marginTop: 20}}>{item.note}</div>
          </Panel>
        ))}
      </div>
    </SafeFrame>
  );
};

const PosterQr: React.FC<{cropX: number; cropY: number; cropSize: number}> = ({cropX, cropY, cropSize}) => {
  const size = 210;
  const scale = size / cropSize;
  return (
    <div style={{position: "relative", width: size, height: size, overflow: "hidden", background: "white"}}>
      <Img
        src={staticFile("assets/brand/v3-product-promo.jpg")}
        style={{position: "absolute", width: 3508 * scale, height: 4961 * scale, left: -cropX * scale, top: -cropY * scale}}
      />
    </div>
  );
};

export const EndV3: React.FC = () => {
  const frame = useCurrentFrame();
  const qrItems = [
    {label: "产品小程序", cropX: 1940, cropY: 1630, cropSize: 340},
    {label: "公司网址", cropX: 2935, cropY: 1630, cropSize: 330},
  ];
  return (
    <SafeFrame>
      <AbsoluteFill style={{background: "radial-gradient(circle at 82% 14%, #123247 0%, #08141E 38%, #040A0F 100%)", color: V3.colors.text}}>
        <svg width="1920" height="1080" style={{position: "absolute", inset: 0, opacity: 0.48}}>
          <defs><linearGradient id="endLine" x1="0" x2="1"><stop stopColor="#48D6FF" stopOpacity="0" /><stop offset="0.55" stopColor="#48D6FF" /><stop offset="1" stopColor="#66F0C1" stopOpacity="0.15" /></linearGradient></defs>
          <path d="M0 910 C460 820 890 1010 1340 900 C1580 840 1760 850 1920 805" fill="none" stroke="url(#endLine)" strokeWidth="2" />
          <path d="M0 930 C460 840 890 1030 1340 920 C1580 860 1760 870 1920 825" fill="none" stroke="#48D6FF" strokeWidth="18" opacity="0.07" />
          {[210, 420, 630, 840, 1050, 1260, 1470, 1680].map((x) => <line key={x} x1={x} x2={x} y1="0" y2="1080" stroke="#48D6FF" strokeOpacity="0.055" />)}
        </svg>

        <div style={{position: "absolute", left: V3.safeX, top: V3.safeY, display: "flex", alignItems: "center", gap: 22, ...enter(frame, 0)}}>
          <div style={{width: 112, height: 112, borderRadius: 16, overflow: "hidden", background: "white", boxShadow: "0 0 50px rgba(72,214,255,0.18)"}}>
            <Img src={staticFile("assets/brand/logo.png")} style={{width: "100%", height: "100%", objectFit: "contain"}} />
          </div>
          <div>
            <div style={{fontSize: 36, fontWeight: 700}}>{COMPANY.name}</div>
            <div style={{fontFamily: V3.mono, fontSize: 18, color: V3.colors.muted, letterSpacing: 2, marginTop: 8}}>ZHONGYUAN CHUANGSHI TECHNOLOGY</div>
          </div>
        </div>

        <div style={{position: "absolute", left: V3.safeX, top: 292, width: 760, ...enter(frame, 10)}}>
          <div style={{fontFamily: V3.mono, fontSize: 20, color: V3.colors.accent, letterSpacing: 1.2}}>{PRODUCT_MODEL}</div>
          <div style={{fontSize: 48, fontWeight: 700, lineHeight: 1.18, marginTop: 18}}>技术沟通 · 产品资料</div>
          <div style={{fontSize: 23, color: V3.colors.muted, marginTop: 16}}>欢迎联系我们，获取详细技术资料</div>
          <div style={{marginTop: 46, padding: "30px 36px 32px", borderRadius: 20, background: "rgba(8,24,35,0.76)", border: `1px solid ${V3.colors.line}`, boxShadow: "0 24px 70px rgba(0,0,0,0.24)"}}>
            <div style={{display: "grid", gridTemplateColumns: "116px 1fr", rowGap: 17, alignItems: "baseline"}}>
              <div style={{fontSize: 20, color: V3.colors.muted}}>联系人</div>
              <div style={{fontSize: 29, fontWeight: 700}}>宋经理</div>
              <div style={{fontSize: 20, color: V3.colors.muted}}>联系电话</div>
              <div style={{fontFamily: V3.mono, fontSize: 27, fontWeight: 650}}>{COMPANY.phone}<span style={{fontFamily: V3.font, fontSize: 18, fontWeight: 500, color: V3.colors.muted, marginLeft: 12}}>微信同号</span></div>
            </div>
            <div style={{height: 1, background: V3.colors.line, margin: "24px 0"}} />
            <div style={{display: "grid", gridTemplateColumns: "116px 1fr", alignItems: "baseline"}}>
              <div style={{fontSize: 20, color: V3.colors.muted}}>邮箱</div>
              <div style={{fontFamily: V3.mono, fontSize: 26, fontWeight: 600}}>{COMPANY.email}</div>
            </div>
          </div>
        </div>

        <div style={{position: "absolute", right: V3.safeX, top: 350, display: "flex", gap: 34}}>
          {qrItems.map((item, i) => (
            <div key={item.label} style={{width: 250, padding: "20px 20px 22px", borderRadius: 22, background: "rgba(8,24,35,0.78)", border: `1px solid ${V3.colors.line}`, boxShadow: "0 24px 70px rgba(0,0,0,0.28)", textAlign: "center", ...enter(frame, 16 + i * 10)}}>
              <div style={{width: 210, height: 210, overflow: "hidden", borderRadius: 10, background: "white"}}><PosterQr cropX={item.cropX} cropY={item.cropY} cropSize={item.cropSize} /></div>
              <div style={{fontSize: 22, fontWeight: 650, marginTop: 18}}>{item.label}</div>
            </div>
          ))}
        </div>

        <div style={{position: "absolute", right: V3.safeX, bottom: 84, fontSize: 20, color: V3.colors.muted, letterSpacing: 1, ...enter(frame, 34)}}>微波射频芯片 · 组件 · 模组研发制造</div>
      </AbsoluteFill>
    </SafeFrame>
  );
};
