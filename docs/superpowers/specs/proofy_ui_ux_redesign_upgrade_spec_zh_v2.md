# Proofy App UI/UE 设计升级方案（iOS / SwiftUI）

## 项目目标

当前版本已经具备：

- 清晰的信息结构
- 轻量化的操作路径
- 较强的实用性
- 偏 Apple 原生风格

但目前主要问题是：

- 视觉层次偏弱
- 高级感不足
- 缺乏品牌记忆点
- 卡片与列表过于传统
- 页面留白虽然舒服，但不够“惊艳”
- 整体更像工具，而不是高品质产品

因此，本次升级目标不是“重做”，而是：

> 在保留轻量与易用性的基础上，让产品拥有：

- 更强的高级感
- 更现代的科技感
- 更有未来感的空间层次
- 更好的微交互反馈
- 更符合 2026 年 iOS 精品 App 的设计趋势

目标参考方向：

- Arc Browser
- Notion Calendar
- Linear
- Superhuman
- Raycast
- Revolut
- Apple Wallet
- Craft
- Cosmos
- Airbnb 2026 Design Trend
- Dribbble 高端金融/效率工具风格

---

# 一、整体视觉升级方向

## 1.1 视觉关键词

新的 UI 风格关键词：

- Frosted Glass（磨砂玻璃）
- Layer Depth（空间层次）
- Soft Shadow（柔和阴影）
- Dynamic Lighting（动态光感）
- Floating Cards（浮空卡片）
- Premium Minimalism（高级极简）
- Spatial Interface（空间化界面）
- Ambient Glow（环境辉光）
- AI-native UI

不要做成：

- 普通 SaaS 后台
- Android 风 Material 风
- 传统蓝白工具 App
- 老式表格管理系统

而是：

> “像一个 AI 时代的数字保险箱”

---

# 二、全局视觉系统升级

---

## 2.1 颜色系统升级

当前问题：

- 蓝色太普通
- 灰白背景缺乏质感
- 页面缺少情绪氛围

升级方案：

---

## 主色（Primary）

推荐使用：

```swift
Primary Blue = #4C6FFF
```

但不要直接纯色大面积使用。

需要加入：

- 渐变
- 光感
- 半透明
- 动态亮度

推荐渐变：

```swift
LinearGradient(
    colors: [
        Color(hex: "#5B7CFF"),
        Color(hex: "#7B61FF")
    ]
)
```

形成：

- 蓝紫科技感
- 高级金融产品氛围

---

## 背景色

不要纯白。

推荐：

```swift
Background = #F5F7FB
```

深色模式：

```swift
Dark Background = #0F1115
```

加入轻微：

- 噪点纹理
- 环境光渐变
- 超淡 radial gradient

提升质感。

---

## 功能色

### 成功色

```swift
#31C48D
```

### 风险提醒

```swift
#FFB648
```

### 错误

```swift
#FF5A6B
```

全部采用：

- 低饱和
- 柔和发光
- 不刺眼

---

# 三、布局体系升级

---

## 3.1 彻底取消“平面列表感”

当前问题：

页面像：

- iOS 设置页
- 普通记账 App
- 文件管理器

升级方向：

> 卡片浮空化 + 分层空间感

---

## 3.2 卡片系统（核心升级）

所有模块改造成：

# Floating Card System

卡片样式：

```swift
.background(.ultraThinMaterial)
.clipShape(RoundedRectangle(cornerRadius: 24))
.overlay(
    RoundedRectangle(cornerRadius: 24)
        .stroke(.white.opacity(0.25), lineWidth: 1)
)
.shadow(color: .black.opacity(0.08), radius: 20, y: 10)
```

卡片必须拥有：

- 半透明感
- 玻璃感
- 浮空感
- 边缘高光
- 柔和阴影

不要传统矩形。

---

## 3.3 卡片层级

采用：

| 层级 | 用途 |
|---|---|
| Hero Card | 首页核心信息 |
| Primary Card | 主要内容 |
| Secondary Card | 辅助内容 |
| Mini Card | 快捷操作 |
| Floating Widget | AI 提醒/动态信息 |

形成明显空间层次。

---

# 四、首页（最关键）升级

当前首页问题：

- 太像工具软件
- 缺少视觉冲击
- 缺少品牌氛围

首页应该做成：

> “数字人生控制中心”

而不是文件列表。

---

# 4.1 Hero 顶部区域（重点）

顶部不要普通 Header。

改造成：

# Dynamic Hero Area

结构：

```text
┌────────────────┐
│ 用户状态信息     │
│ 家庭资料箱       │
│ 46 个重要文件    │
│ AI 安全评分 95% │
│                │
│ 动态渐变背景     │
│ 发光装饰元素     │
└────────────────┘
```

效果：

- 大圆角
- 动态渐变
- 柔和辉光
- 玻璃浮层
- 微动态粒子

推荐：

```swift
MeshGradient
```

或：

```swift
AngularGradient
```

营造科技感。

---

## 4.2 首页背景动态光感

背景不要纯色。

加入：

- 大面积柔和 radial gradient
- blur 光斑
- 微弱流动动画

类似：

- Arc Browser
- Linear
- Apple WWDC 页面

动画极轻。

目标：

“高级，而不是花哨。”

---

## 4.3 首页模块布局重构

当前：

纵向列表。

升级：

采用：

# Dashboard Layout

结构：

```text
Hero
Quick Actions
AI Insights
Recent Files
Collections
Timeline
Smart Reminders
```

形成节奏感。

---

# 五、文件卡片系统升级

---

## 5.1 文件卡片不要传统列表

当前：

```text
图标 + 标题 + 时间
```

太普通。

升级：

# Smart Document Card

结构：

```text
┌─────────────────┐
│ 渐变标签         │
│ MacBook Pro 发票│
│ Apple Store     │
│                 │
│ AI 风险分析      │
│ 保修剩余 312 天  │
│                 │
│ 时间轴 / 标签    │
└─────────────────┘
```

重点：

- 信息层次
- 微渐变
- 发光 icon
- 卡片 hover 感

---

## 5.2 文件缩略图升级

不要普通文件 icon。

加入：

- 真实 PDF 缩略图
- 毛玻璃容器
- AI 标签
- 状态角标

比如：

```text
[PDF]
已识别
可报销
即将过期
已归档
```

---

# 六、AI 感增强（非常重要）

你这个产品天然适合：

# AI Native UI

当前几乎没有体现 AI。

建议重点升级。

---

## 6.1 AI 助手模块

首页加入：

# AI Insight Card

示例：

```text
你的 MacBook 保修将在 128 天后到期
建议整理以下缺失资料：
- 房屋保险
- 儿童疫苗记录
```

UI 风格：

- 蓝紫动态渐变
- 流动边框
- 微光动画
- AI Orb

类似：

- ChatGPT Mac App
- Perplexity
- Gemini

---

## 6.2 AI Orb（视觉重点）

设计一个：

# Floating AI Orb

类似：

- Siri 新 UI
- OpenAI Voice Orb
- Humane AI Pin

用于：

- 搜索
- AI 对话
- 智能整理
- 文件分析

动画：

- breathing
- glow
- pulse
- liquid gradient

这是整个 App 的视觉记忆点。

---

# 七、动画系统升级（核心）

当前页面太静态。

高级 App 的差异：

> 动画质量。

---

## 7.1 页面切换动画

不要默认 push。

升级：

- shared element transition
- fluid transition
- spring animation
- depth transform

推荐：

```swift
.matchedGeometryEffect
```

效果类似：

- Apple Wallet
- Music App
- Arc Search

---

## 7.2 卡片交互

加入：

- hover light
- tilt effect
- press depth
- glow feedback

例如：

```swift
.scaleEffect(isPressed ? 0.97 : 1)
```

并配合：

```swift
.spring(response: 0.4)
```

---

## 7.3 页面出现动画

不要直接出现。

推荐：

```text
fade + move + blur
```

节奏：

- 轻
- 慢
- 高级

避免：

- 夸张 bounce
- 安卓感动画

---

# 八、TabBar 升级

当前 TabBar：

太普通。

---

## 8.1 Floating Tab Bar

采用：

# 浮空 TabBar

效果：

```swift
.background(.ultraThinMaterial)
.clipShape(Capsule())
.shadow(radius: 20)
```

位置：

- 悬浮
- 离底部有间距

类似：

- Arc
- Fantastical
- Superlist

---

## 8.2 中间 AI 按钮

中间：

加入一个：

# AI Action Button

效果：

- 发光
- 动态渐变
- Orb
- Pulse

点击后：

```text
AI 整理
AI 搜索
AI 分析
AI 提醒
```

这是产品核心亮点。

---

# 九、详情页升级

当前详情页问题：

太像表单。

---

## 9.1 改造成 Timeline Style

文件详情：

不要：

```text
字段 + 值
```

而是：

# 时间轴信息结构

例如：

```text
2023 购买
2024 延保
2025 维修
2026 即将过保
```

形成“人生资产轨迹”的感觉。

---

## 9.2 顶部 Header

顶部使用：

- 大图
- 文件预览（首版支持 PDF、RTF、纯文本、CSV、Office / iWork 文档、图片 / HEIC / Live Photo，以及系统 AVFoundation / QuickTime 可播放的音频 / 视频文件）
- 动态背景
- 模糊玻璃层

类似：

Apple Wallet 卡片展开。

---

# 十、搜索页升级

搜索页不要只是输入框。

升级成：

# AI Search Experience

结构：

```text
搜索问题：
“我的车险什么时候到期？”
“帮我找 2024 年所有发票”
```

加入：

- 推荐问题
- 动态 suggestions
- 智能分类
- AI 搜索动画

---

# 十一、暗黑模式（必须重点做）

这个产品非常适合暗黑模式。

甚至：

> 暗黑模式应该比浅色更高级。

---

## 11.1 Dark Mode 风格

采用：

```text
深空黑 + 蓝紫辉光
```

而不是纯黑。

颜色：

```swift
#0F1115
#151922
#1D2330
```

配合：

- 环境辉光
- 毛玻璃
- 动态高亮

效果会非常高级。

---

# 十二、字体系统升级

不要默认全系统字号。

建议：

# Typography Hierarchy

| 类型 | 字重 |
|---|---|
| Hero Number | Bold |
| Section Title | Semibold |
| Card Title | Medium |
| Metadata | Regular |
| AI Label | Medium |

重点数字：

- 超大
- 超粗
- 高级留白

例如：

```text
46
份重要资料
```

而不是普通描述。

---

# 十三、图标系统升级

当前图标：

偏系统化。

建议：

- SF Symbols + 自定义渐变容器
- 不直接裸 icon
- icon 需要发光底座

例如：

```swift
Circle()
    .fill(gradient)
    .blur(radius: 20)
```

形成高级感。

---

# 十四、文件分类视觉升级

当前分类区过于平。

升级：

# Bento Grid Layout

类似：

- iOS18 Photos
- Notion
- Arc

分类采用：

- 不同尺寸
- 不同层级
- 渐变背景
- 图形装饰

例如：

```text
家庭资料
保险
发票
房产
车辆
教育
```

做成动态 Dashboard。

---

# 十五、会员页升级（重点变现）

当前会员页：

太普通。

高级产品的会员页：

必须像：

> “未来产品发布页”

---

## 15.1 Pricing Hero

加入：

- 光效背景
- 高级渐变
- 动态粒子
- AI Orb
- 超大价格

例如：

```text
¥18
守护你的数字人生
```

不要传统功能列表。

---

## 15.2 Feature Card

每个会员能力：

做成：

- 独立卡片
- 发光 icon
- 动态边框

而不是简单勾选列表。

---

# 十六、SwiftUI 技术实现建议

---

## 16.1 推荐技术栈

```text
SwiftUI
iOS 18+
MeshGradient
PhaseAnimator
KeyframeAnimator
matchedGeometryEffect
Material
Canvas
TimelineView
```

---

## 16.2 动画推荐

```swift
.spring(
    response: 0.5,
    dampingFraction: 0.82
)
```

避免：

- 太硬
- 太快
- 太机械

---

## 16.3 背景实现

推荐：

```swift
ZStack {
    MeshGradient
    RadialGradient
    NoiseTexture
}
```

形成空间感。

---

# 十七、建议新增的视觉模块

---

## 17.1 Digital Life Score

数字人生安全评分：

```text
92 分
你的数字资产状态优秀
```

加入：

- 环形动态图
- 发光边缘
- AI 建议

---

## 17.2 Smart Timeline

展示：

```text
最近新增
最近提醒
最近扫描
最近风险
```

形成产品活跃感。

---

## 17.3 Memory Capsule

把重要文件：

做成：

# 数字记忆胶囊

例如：

```text
2022 MacBook Pro
2023 日本签证
2024 儿童出生证明
```

强化情感价值。

---

# 十八、产品气质升级

当前产品气质：

```text
实用工具
```

升级后应该变成：

```text
AI 数字资产管家
```

这是完全不同的感受。

---

# 十九、最终视觉方向总结

最终 UI 应该达到：

```text
50% Apple
30% Linear
20% AI Future
```

核心体验：

- 高级
- 克制
- 流畅
- 有空间感
- 有呼吸感
- 有 AI 气质
- 有未来感

而不是：

- 花哨
- 炫技
- 重设计
- 复杂化

---

# 二十、Codex 实施优先级（重要）

建议按下面顺序重构：

## 第一阶段（最高优先级）

1. 全局颜色系统
2. 卡片系统
3. 首页 Hero
4. Floating TabBar
5. 背景空间感

这 5 项完成后：

产品会立刻高级 70%。

---

## 第二阶段

1. 动画系统
2. AI Orb
3. 页面转场
4. 文件详情页
5. Dashboard Layout

---

## 第三阶段

1. 粒子动画
2. MeshGradient
3. 智能搜索
4. 时间轴系统
5. AI Insights

---

# 二十一、给 Codex 的实施要求

## UI 开发原则

Codex 在实现时必须遵守：

```text
不要传统 iOS 表单风
不要普通列表风
不要大面积纯白
不要过度边框
不要安卓 Material 风
```

必须：

```text
空间感
玻璃感
动态光感
层级感
柔和阴影
高级渐变
流畅动画
```

---

## 动画原则

```text
快：错误
慢：高级
```

所有动画：

- 克制
- 柔和
- 高级
- 有惯性

---

## 最终目标

让用户第一次打开 App 时：

感觉这是：

> “一个真正属于 AI 时代的数字人生保险箱。”

---

# 二十二、第二轮 UI/UE 优化建议（基于最新设计稿）

新版设计已经明显提升了：

- 高级感
- 层次感
- 柔和感
- 卡片质感
- 空间感
- AI 产品气质

目前已经从：

```text
普通工具 App
```

升级到了：

```text
高级数字资产管理产品
```

但距离真正的：

```text
Apple Design Award 级别
```

还差最后一步：

# “视觉呼吸感 + 品牌记忆点 + 动态生命力”

目前的问题已经不是“丑”。

而是：

```text
太安全
太静态
太规整
太理性
```

缺少：

```text
情绪
氛围
未来感
视觉记忆
```

因此第二轮优化重点：

> 从「高级 UI」升级到「令人记住的产品体验」。

---

# 二十三、当前版本的核心问题分析

---

## 23.1 现在整体已经“太白”了

虽然已经加入：

- 渐变
- 毛玻璃
- 阴影

但整体依然：

```text
白色占比过高
```

导致：

- 品牌氛围不足
- 科技感不足
- 页面不够沉浸
- 不够“Pro”

现在更像：

```text
优化过的 iOS 工具 App
```

而不是：

```text
AI Native Product
```

---

# 二十四、重点优化方向（非常重要）

---

# 24.1 引入 Ambient Background System（环境背景系统）

这是下一阶段最重要升级。

当前背景：

```text
纯浅灰 + 微渐变
```

还是太普通。

建议升级：

# Spatial Ambient Background

实现：

```text
超淡动态光斑
超大模糊渐变
空间化颜色漂浮
微弱动态移动
```

类似：

- Apple WWDC
- Arc Browser
- Linear
- Nothing OS

推荐背景结构：

```swift
ZStack {
    MeshGradient
    Large Blur Orbs
    Noise Texture
    Ultra Thin Overlay
}
```

目标：

让页面“活着”。

而不是：

静态白板。

---

# 24.2 页面之间缺少“情绪差异”

目前所有页面：

```text
视觉情绪一致
```

导致：

用户没有探索感。

建议：

# 每个一级页面拥有独立氛围色

例如：

| 页面 | 氛围色 |
|---|---|
| 首页 | 蓝紫 |
| 记录 | 暖白 + 金色 |
| AI | 电光蓝 |
| 提醒 | 橙黄 |
| 设置 | 深灰蓝 |

注意：

不是大面积换色。

而是：

```text
背景光感
按钮辉光
Header Glow
```

 subtly 改变。

这样会：

- 页面更有记忆点
- 增强空间感
- 增强品牌感

---

# 二十五、首页优化（重点）

当前首页已经不错。

但还不够：

# Hero。

---

## 25.1 Hero 区域需要“更大胆”

当前问题：

```text
Hero 高度不足
视觉冲击不足
```

建议：

首页顶部 Hero：

高度提升：

```text
增加 20%~30%
```

加入：

- 更强渐变
- 大型 glow
- 动态流光
- floating particles
- AI Orb
- 超大数字

例如：

```text
46
份重要资料
```

这个数字应该：

- 更粗
- 更大
- 更有呼吸感

而不是普通文本。

---

## 25.2 首页卡片现在“太整齐”

高级感已经有了。

但：

```text
缺少设计张力
```

建议：

# Bento 化布局

例如：

```text
大卡片
小卡片
横向卡片
悬浮模块
```

不要全部：

```text
统一尺寸
统一排列
```

否则会像：

```text
后台管理系统
```

---

# 二十六、卡片系统升级（关键）

当前卡片已经：

- 有阴影
- 有圆角
- 有渐变

但问题：

```text
缺少“空气感”
```

---

## 26.1 卡片需要更“浮”

建议：

阴影分层：

```swift
.shadow(color: .black.opacity(0.06), radius: 8, y: 4)
.shadow(color: .black.opacity(0.03), radius: 30, y: 20)
```

形成：

```text
真实悬浮
```

而不是：

```text
普通卡片阴影
```

---

## 26.2 卡片边缘需要 Light Border

现在边界不够精致。

增加：

```swift
.stroke(.white.opacity(0.5), lineWidth: 1)
```

并加入：

```swift
.overlay(
    LinearGradient(...)
)
```

形成：

# 光边效果

这会非常高级。

---

## 26.3 卡片之间距离太平均

建议：

加入：

```text
呼吸式留白
```

即：

- 大模块间距更大
- 小模块间距更紧

形成：

```text
视觉节奏
```

目前还是：

```text
机械排版
```

---

# 二十七、图标系统问题

目前图标仍然偏：

```text
SF Symbol 默认风格
```

高级产品一般会：

# 图标容器化

例如：

```text
渐变底座
发光底座
玻璃底座
```

而不是裸 icon。

建议：

```swift
Circle()
    .fill(gradient)
    .blur(radius: 20)
```

配合：

```swift
symbolRenderingMode(.palette)
```

会高级很多。

---

# 二十八、TabBar 还不够惊艳

现在 TabBar 已经升级。

但还缺少：

```text
未来感
```

---

## 28.1 AI 中央按钮需要成为“品牌符号”

当前：

还是一个普通 + 按钮。

建议升级：

# AI Orb Button

效果：

- 液态渐变
- 发光
- pulse
- breathing
- glow ring

类似：

- Siri Orb
- OpenAI Voice
- Nothing OS

目标：

用户一眼记住。

---

## 28.2 TabBar 需要更“悬浮”

当前：

还是有一点贴底。

建议：

```text
离底部更高
```

并加入：

```text
背景 blur
环境阴影
底部辉光
```

---

# 二十九、列表页问题（非常关键）

当前列表页：

例如：

- 记录
- 提醒
- 文件管理

问题：

```text
太像普通 iOS App
```

---

## 29.1 列表缺少层次

现在：

```text
所有 Cell 一样
```

建议：

# Smart List Hierarchy

例如：

```text
重要文件：大卡片
普通文件：小卡片
风险文件：高亮卡片
AI 推荐：发光卡片
```

形成：

```text
内容节奏
```

而不是：

```text
无限重复 Cell
```

---

## 29.2 列表需要微交互

建议加入：

```text
hover glow
滑动倾斜
轻微缩放
```

例如：

```swift
.scaleEffect(isPressed ? 0.98 : 1)
.rotation3DEffect(...)
```

高级感会提升巨大。

---

# 三十、详情页升级空间（很大）

详情页目前还是：

```text
信息展示页
```

建议升级成：

# Asset Experience

例如：

```text
MacBook Pro 发票
```

进入后：

应该像：

```text
Apple Wallet 卡片展开
```

---

## 30.1 顶部 Header 不够沉浸

建议：

加入：

- 文件封面大图
- 背景 blur
- glow
- parallax
- floating header

形成：

```text
沉浸式文件体验
```

---

## 30.2 信息结构太平

现在还是：

```text
字段 + 内容
```

建议：

# Timeline + AI Analysis

例如：

```text
2023 购买
2024 延保
2025 维修
2026 即将过保
```

并加入：

```text
AI 风险建议
```

产品会立刻：

```text
高级两个维度
```

---

# 三十一、暗黑模式还没有真正发挥

这个产品：

其实最适合：

# 深色模式

建议：

重点打磨 Dark Mode。

甚至：

```text
默认展示深色版截图
```

因为：

- 蓝紫 glow
- 毛玻璃
- 环境光
- AI Orb

在深色模式会：

```text
高级感翻倍
```

---

# 三十二、目前最缺少的东西：品牌记忆点

现在设计：

已经好看。

但：

```text
还不够“只属于你”
```

建议：

# 建立品牌级视觉符号

例如：

## 方案 A：AI Orb

让 Orb 成为品牌核心。

---

## 方案 B：数字生命流体

使用：

```text
液态渐变
流动光效
```

形成：

```text
数字记忆流动感
```

---

## 方案 C：Memory Capsule

把重要文件：

做成：

```text
人生记忆胶囊
```

增强情绪价值。

---

# 三十三、最终建议（非常重要）

你现在已经不是：

```text
缺 UI
```

而是：

```text
缺“灵魂”
```

下一阶段不要继续：

- 加功能
- 加模块
- 加按钮

而是：

# 增加情绪
# 增加氛围
# 增加生命感
# 增加品牌记忆

---

# 三十四、给 Codex 的第二轮实施重点

Codex 下一阶段优先实现：

## P0（必须）

1. Ambient Background System
2. AI Orb System
3. Hero 动态升级
4. Card Floating System
5. Dark Mode Pro Version

---

## P1

1. Bento Dashboard
2. Shared Element Transition
3. Timeline Experience
4. Smart List Hierarchy
5. Dynamic Glow System

---

## P2

1. 粒子系统
2. 液态渐变
3. Noise Texture
4. Parallax Motion
5. Dynamic Lighting

---

# 三十五、最终目标（第二阶段）

最终产品应该让用户感觉：

```text
这不是一个文件管理器。
```

而是：

> “一个 AI 时代的数字人生空间。”
