# ProductPromoV8 完整 Remotion 工程

这是当前已完成的“成都中远创视 ZCUF/DF-RF0218-IF1.8-BW1G-B 宽带上下变频组件宣传片”完整工程。

工程保留现有全部 Composition、场景结构、动画、字幕、旁白、背景音乐、实拍片段、PDF技术图和二维码素材。交付目录不包含 `node_modules` 与历史渲染文件，换一台电脑后可通过 `npm install` 恢复依赖。

## 运行环境

- Node.js 18 或更高版本，推荐 Node.js 20 LTS
- npm 9 或更高版本
- Windows、macOS、Linux 均可运行

## 安装与启动

```bash
npm install
npm run typecheck
npm start
```

Remotion Studio 启动后选择 `ProductPromoV8`。

## 主入口与 Composition

- Remotion 主入口：`src/index.ts`
- Composition 注册入口：`src/Root.tsx`
- 当前成片 Composition：`ProductPromoV8`
- Composition 组件：`src/compositions/ProductPromoV8.tsx`
- 分辨率：1920×1080
- 帧率：30fps
- 总帧数：1680帧
- 总时长：约56秒

工程中同时保留：

- `ZCUFDF0218ProductPromo`
- `ProductPromoV3`
- `ChromeTest`

## V8 场景文件

所有 V8 场景组件集中在 `src/v8/scenes.tsx`，由 `src/compositions/ProductPromoV8.tsx` 按时间线组合。

| 时间 | 场景组件 | 作用 | 对应文件 |
|---|---|---|---|
| 0–6.60秒 | `CompanyIntroV8` | 公司Logo、品牌定位、科技开场 | `src/v8/scenes.tsx` |
| 6.60–14.43秒 | `ProductRevealV8` | 产品外观、实拍测试台、三功能集成 | `src/v8/scenes.tsx` |
| 14.43–22.43秒 | `FrequencyV8` | 2–18GHz宽频覆盖 | `src/v8/scenes.tsx` |
| 22.43–26.73秒 | `BandwidthV8` | 1GHz瞬时带宽、上下变频信号链 | `src/v8/scenes.tsx` |
| 26.73–35.40秒 | `ControlV8` | 10MHz步进、31dB衰减、SPI时序 | `src/v8/scenes.tsx` |
| 35.40–41.27秒 | `PurityV8` | ≥50dBc、仪器界面、测试曲线 | `src/v8/scenes.tsx` |
| 41.27–46.80秒 | `CompactV8` | 68×78.5×9.5mm尺寸设计 | `src/v8/scenes.tsx` |
| 46.80–52.47秒 | `SummaryV8` | 四项核心优势总结 | `src/v8/scenes.tsx` |
| 52.47–56.00秒 | `EndV8` | 公司信息、联系人、二维码收尾 | `src/v8/scenes.tsx` |

## V8 代码结构

```text
src/
├─ index.ts                         Remotion主入口
├─ Root.tsx                         Composition注册
├─ compositions/
│  └─ ProductPromoV8.tsx            V8总时间线、音乐、旁白
└─ v8/
   ├─ content.ts                    公司、产品、参数和卖点文案
   ├─ theme.ts                      分辨率、颜色、字体、时间线和素材路径
   ├─ components.tsx                背景、面板、实拍、参数等通用组件
   ├─ scenes.tsx                    九个完整场景
   ├─ overlays.tsx                  角标Logo和中文字幕
   └─ captions.json                 旁白字幕时间码
```

## 素材目录

V8专用素材位于：

```text
public/assets/v8/
├─ audio/
│  ├─ narration.mp3                 中文男声旁白
│  └─ narration.srt                 旁白原始字幕
├─ video/
│  ├─ product-rig.mp4               产品与测试台
│  ├─ operation.mp4                 接线及测试操作
│  ├─ instrument.mp4                仪器测试界面
│  └─ spectrum.mp4                  频谱结果特写
└─ pdf/
   ├─ signal-blocks.png             上/下变频原理图
   ├─ spi-timing.png                纯SPI时序波形
   ├─ downconversion-curves.png     下变频测试曲线
   ├─ upconversion-curves.png       上变频测试曲线
   └─ dimensions.png                产品尺寸图
```

公共品牌与产品素材：

```text
public/assets/
├─ audio/music.mp3                  背景音乐
├─ brand/logo.png                   公司Logo
├─ brand/v3-product-promo.jpg       二维码来源图片
└─ product/product-main.png         产品主体图片
```

所有实拍片段均已移除原声，成片只使用统一背景音乐与旁白。

## 替换下一个产品

保持文件名不变即可直接替换以下素材：

1. `public/assets/product/product-main.png`
2. `public/assets/v8/video/` 中四段实拍
3. `public/assets/v8/pdf/` 中原理图、时序图、曲线和尺寸图
4. `public/assets/v8/audio/narration.mp3`
5. `public/assets/brand/logo.png`

产品与公司信息统一修改：

```text
src/v8/content.ts
```

旁白文字或时长发生变化时，同时更新：

```text
src/v8/captions.json
src/v8/theme.ts
```

`theme.ts` 中的 `V8_TIMELINE` 使用帧数，30帧等于1秒。

建议实拍素材提前转换为：

- MP4 / H.264
- 1920×1080
- 30fps
- 不含音轨

## 视频渲染命令

启动可视化编辑：

```bash
npm start
```

渲染540p低清预览：

```bash
npm run render:v8:preview
```

渲染1080p最终版：

```bash
npm run render:v8
```

也可以直接使用 Remotion 命令：

```bash
npx remotion render ProductPromoV8 out/ProductPromoV8-final-1080p.mp4 --codec=h264 --crf=18 --audio-bitrate=192k
```

渲染封面静帧：

```bash
npm run still:v8
```

输出文件统一位于 `out/`。

## 交付前检查

替换素材后建议依次执行：

```bash
npm run typecheck
npm run render:v8:preview
npm run render:v8
```

低清预览需要检查：

- 实拍是否静音
- 是否出现人脸或遮挡
- 是否存在重复镜头
- 字幕与旁白是否同步
- 参数是否与产品资料一致
- 文字、Logo、二维码是否越界
- 是否存在黑帧或素材缺失
