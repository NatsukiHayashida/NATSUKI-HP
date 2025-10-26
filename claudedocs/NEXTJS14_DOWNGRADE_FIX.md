# Next.js 14.2.11ダウングレード - @react-three/fiber互換性修正

**日付**: 2025-10-27
**コミット**: `8b8bee4`
**ステータス**: ✅ 修正完了、Vercelデプロイ成功

---

## 問題の概要

Next.js 15.5.6とReact 18.2.0の組み合わせで、@react-three/fiberが以下のランタイムエラーを引き起こしていました：

```
Cannot read properties of undefined (reading 'ReactCurrentBatchConfig')
at (app-pages-browser)/./node_modules/@react-three/fiber/dist/index-e6b5343a.esm.js

Cannot read properties of undefined (reading 'ReactCurrentOwner')
at (app-pages-browser)/./node_modules/@react-three/fiber/dist/index-673ef987.esm.js
```

### 症状

- ✅ Vercelデプロイ成功（ビルドは通る）
- ❌ ブラウザでランタイムエラー（Three.jsアニメーション動作しない）
- ❌ React内部のモジュール解決エラー

---

## 根本原因

1. **Next.js 15とReact 18の不整合**
   - Next.js 15のwebpackモジュール解決がReact 18との組み合わせで不安定
   - React reconciliationとの互換性問題

2. **@react-three/fiberのpeer dependency**
   - @react-three/fiber@9.4.0がReact 19を要求
   - React 18との組み合わせでバージョンミスマッチ

3. **複数のReactインスタンス可能性**
   - webpackの重複解決によるReactモジュール競合

---

## 解決策: Next.js 14スタックへのダウングレード

### 最終的な依存関係バージョン

| パッケージ | 変更前 | 変更後 |
|-----------|--------|--------|
| next | 15.5.4 | **14.2.11** |
| react | ^18 | **18.2.0** |
| react-dom | ^18 | **18.2.0** |
| @react-three/fiber | 9.4.0 | **8.15.19** |
| @react-three/drei | - | **9.105.6**（新規追加） |
| three | ^0.180.0 | **0.160.0** |

### 実行したコマンド

```bash
# 1. バージョン設定
npm pkg set next="14.2.11" react="18.2.0" react-dom="18.2.0"
npm pkg set three="0.160.0" @react-three/fiber="8.15.19" @react-three/drei="9.105.6"

# 2. クリーン再インストール
rm -rf node_modules package-lock.json pnpm-lock.yaml yarn.lock .next
npm install

# 3. React単一インスタンス確認
npm ls react
# 出力例:
# natsuki-hp@0.1.0 /Users/.../natsuki-hp
# ├─┬ @react-three/drei@9.105.6
# │ └── react@18.2.0 deduped
# ├─┬ @react-three/fiber@8.15.19
# │ └── react@18.2.0 deduped
# └── react@18.2.0

# 4. ビルドテスト
npm run build
# ✅ Route (app)                             Size     First Load JS
# ✅ ○ /                                    4.02 kB        98.9 kB
# ✅ ○ /blog                                4.96 kB        134 kB
# ...（全24ページコンパイル成功）

# 5. デプロイ
git add package.json package-lock.json
git commit -m "fix: Next.js 14.2.11へダウングレード - @react-three/fiber互換性問題を解決"
git push
```

---

## Three.js実装の注意点

### クライアントサイドレンダリングの設定

#### ラッパーコンポーネント（BlogNetworkBanner.tsx）

```typescript
"use client"

import dynamic from "next/dynamic"

// SSR無効化が必須
const NetworkAnimation = dynamic(
  () => import("@/app/components/NetworkAnimation"),
  { ssr: false }
)

export default function BlogNetworkBanner({
  title = "Blog",
  subtitle = "AI、プログラミング、製造業の学びを記録しています。",
  minHeightPx = 360,
}: Props) {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-card"
         style={{ minHeight: `${minHeightPx}px`, height: `${minHeightPx}px` }}>
      <NetworkAnimation />
      <div className="relative z-10 flex items-center justify-center text-center"
           style={{ minHeight: `${minHeightPx}px` }}>
        <div className="mx-auto max-w-3xl px-6 py-14">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-3 text-sm md:text-base text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}
```

#### Three.jsコンポーネント（NetworkAnimation.tsx）

```typescript
"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function LightStreak({ curve, speed, offset, color }: Props) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  // TypeScript型エラー回避
  return (
    // @ts-expect-error - Three.js line element
    <line geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        transparent
        blending={THREE.AdditiveBlending}
        // ...
      />
    </line>
  )
}

export default function NetworkAnimation() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <NetworkScene />
      </Canvas>
    </div>
  )
}
```

---

## 試行したが失敗したアプローチ

| アプローチ | 結果 | 理由 |
|-----------|------|------|
| @react-three/fiber@8.17.10にダウングレード | ❌ 失敗 | Next.js 15の問題は未解決 |
| @react-three/fiber@8.13.7にダウングレード | ❌ 失敗 | 同上 |
| React exact version（^18 → 18.2.0）固定のみ | ❌ 失敗 | Next.js 15とReact 18の根本的不整合 |
| **Next.js 14.2.11への完全ダウングレード** | ✅ **成功** | React 18と完全互換 |

---

## 重要な教訓

### バージョン互換性

- **Next.js 15 + React 18 + @react-three/fiber = ❌ 動作しない**
- **Next.js 14 + React 18 + @react-three/fiber@8.x = ✅ 動作する**
- **Next.js 15 + React 19 + @react-three/fiber@9.x = ✅ 動作する（未検証）**

### デバッグポイント

1. **React単一インスタンス確認**
   ```bash
   npm ls react
   # すべてが "deduped" であることを確認
   ```

2. **ローカルビルドテスト**
   ```bash
   npm run build
   # エラーなしで完了することを確認
   ```

3. **クリーン再インストール**
   ```bash
   rm -rf node_modules package-lock.json .next
   npm install
   ```

### Three.js実装のベストプラクティス

- ✅ `{ ssr: false }` でdynamic import必須
- ✅ `"use client"` ディレクティブ必須
- ✅ Three.js型エラーは `@ts-expect-error` で回避
- ✅ `Canvas`コンポーネントは常にクライアントサイドレンダリング

---

## 検証ポイント

### ローカル環境

- ✅ `npm run build` 成功（24ページコンパイル）
- ✅ `npm ls react` で単一インスタンス確認（全てdeduped）
- ✅ `npm run dev` でローカルサーバー起動成功

### 本番環境（Vercel）

- ✅ Vercelビルド成功
- ✅ デプロイ成功
- ✅ ブラウザでハートビートアニメーション表示確認
- ✅ ブラウザコンソールでReactエラーなし確認

---

## 関連ファイル

| ファイル | 役割 | 変更内容 |
|---------|------|----------|
| `package.json` | 依存関係定義 | Next.js 14.2.11、React 18.2.0、@react-three/fiber@8.15.19に変更 |
| `package-lock.json` | ロックファイル | クリーン再インストールで再生成 |
| `app/components/NetworkAnimation.tsx` | Three.jsハートビートアニメーション | TypeScript `@ts-expect-error` 追加 |
| `app/blog/_components/BlogNetworkBanner.tsx` | SSR無効化ラッパー | `{ ssr: false }` で dynamic import |
| `app/blog/page.tsx` | ブログ一覧ページ | バナーコンポーネント使用 |

---

## コミット情報

```bash
コミットハッシュ: 8b8bee4
ブランチ: main
日付: 2025-10-27

メッセージ:
fix: Next.js 14.2.11へダウングレード - @react-three/fiber互換性問題を解決

Next.js 15.5.6とReact 18.2.0の組み合わせで@react-three/fiberが
ReactCurrentBatchConfig/ReactCurrentOwnerエラーを引き起こしていた問題を解決。

変更内容:
- Next.js: 15.5.4 → 14.2.11
- @react-three/fiber: 9.4.0 → 8.15.19
- @react-three/drei: 9.105.6（新規追加）
- React: ^18 → 18.2.0（exact version）
- React-DOM: ^18 → 18.2.0（exact version）
- Three.js: ^0.180.0 → 0.160.0

npm ls reactで単一Reactインスタンスを確認済み（全てdeduped）
ローカルビルドテスト成功

🤖 Generated with [Claude Code](https://claude.com/claude-code)
Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## 今後の対応

### 短期（現状維持）

- ✅ Next.js 14.2.11 + React 18.2.0で安定稼働
- ✅ Three.jsアニメーション正常動作
- ✅ Vercelデプロイパイプライン安定

### 中長期（アップグレード計画）

Next.js 15への再アップグレードは**React 19への移行と同時に実施**：

1. **React 19へのアップグレード**
   ```bash
   npm pkg set react="^19.0.0" react-dom="^19.0.0"
   ```

2. **Radix UI全パッケージ更新**（React 19対応版）
   ```bash
   npm update @radix-ui/react-*
   ```

3. **@react-three/fiber v9.x更新**（React 19対応版）
   ```bash
   npm pkg set @react-three/fiber="^9.0.0"
   npm pkg set three="^0.180.0"
   ```

4. **Next.js 15.x更新**
   ```bash
   npm pkg set next="^15.0.0"
   ```

5. **クリーン再インストールとテスト**
   ```bash
   rm -rf node_modules package-lock.json .next
   npm install
   npm run build
   npm run dev  # ローカルテスト
   ```

---

## 参考リンク

- [Next.js 14 Documentation](https://nextjs.org/docs/14)
- [@react-three/fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs/)
- [GitHub Issue: ReactCurrentBatchConfig error](https://github.com/pmndrs/react-three-fiber/issues)

---

**最終確認日**: 2025-10-27
**ステータス**: ✅ 問題解決、本番環境稼働中
