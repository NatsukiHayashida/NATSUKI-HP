# Next.js 14.2.11ダウングレード - @react-three/fiber互換性修正

## 問題の概要

Next.js 15.5.6とReact 18.2.0の組み合わせで、@react-three/fiberが以下のランタイムエラーを引き起こしていました：

```
Cannot read properties of undefined (reading 'ReactCurrentBatchConfig')
Cannot read properties of undefined (reading 'ReactCurrentOwner')
```

## 根本原因

- Next.js 15のwebpackモジュール解決とReact reconciliationの不整合
- 複数のReactインスタンスまたはモジュール解決の競合
- @react-three/fiber@9.4.0がReact 19を要求（peer dependency）

## 解決策: Next.js 14スタックへのダウングレード

### 最終的な依存関係バージョン

```json
{
  "dependencies": {
    "next": "14.2.11",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "@react-three/fiber": "8.15.19",
    "@react-three/drei": "9.105.6",
    "three": "0.160.0"
  }
}
```

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
# → すべての依存がreact@18.2.0 (deduped)

# 4. ビルドテスト
npm run build
# → 成功（24ページコンパイル）

# 5. デプロイ
git add package.json package-lock.json
git commit -m "fix: Next.js 14.2.11へダウングレード - @react-three/fiber互換性問題を解決"
git push
```

## Three.js実装の注意点

### クライアントサイドレンダリングの設定

**app/blog/_components/BlogNetworkBanner.tsx**（ラッパー）:
```typescript
"use client"

import dynamic from "next/dynamic"

const NetworkAnimation = dynamic(
  () => import("@/app/components/NetworkAnimation"),
  { ssr: false }  // ← SSR無効化が必須
)
```

**app/components/NetworkAnimation.tsx**（Three.jsコンポーネント）:
```typescript
"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

// TypeScriptエラー回避
// @ts-expect-error - Three.js line element
<line geometry={geometry}>
  <shaderMaterial ref={materialRef} ... />
</line>
```

## 試行したが失敗したアプローチ

1. ❌ @react-three/fiberを8.17.10に下げる → エラー継続
2. ❌ @react-three/fiberを8.13.7に下げる → エラー継続
3. ❌ ReactをExact version（^18 → 18.2.0）に固定のみ → エラー継続
4. ✅ **Next.js 14.2.11への完全ダウングレード** → 成功

## 重要な教訓

- **Next.js 15とReact 18の組み合わせでは@react-three/fiberが動作しない**
- React 19が必要な場合はNext.js 15、React 18の場合はNext.js 14が安定
- `npm ls react`でReactインスタンスのdedup確認が重要
- Three.jsコンポーネントは必ず`{ ssr: false }`でdynamic import

## 検証ポイント

- ✅ ローカルビルド成功（`npm run build`）
- ✅ React単一インスタンス確認（`npm ls react`）
- ✅ Vercelデプロイ成功
- ✅ ブラウザでハートビートアニメーション動作確認
- ✅ ブラウザコンソールでReactエラーなし

## 関連ファイル

- `package.json` - 依存関係定義
- `app/components/NetworkAnimation.tsx` - Three.jsハートビートアニメーション
- `app/blog/_components/BlogNetworkBanner.tsx` - SSR無効化ラッパー
- `app/blog/page.tsx` - ブログ一覧ページ（バナー使用）

## コミット情報

- コミットハッシュ: `8b8bee4`
- ブランチ: `main`
- 日付: 2025-10-27
- メッセージ: "fix: Next.js 14.2.11へダウングレード - @react-three/fiber互換性問題を解決"

## 今後の対応

- Next.js 15への再アップグレードはReact 19への移行と同時に実施
- React 19への移行時はRadix UIも全て最新版に更新が必要
- @react-three/fiberもReact 19対応版（v9.x）に更新可能
