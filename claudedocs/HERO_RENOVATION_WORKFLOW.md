# Heroセクションリニューアル実装ワークフロー

**プロジェクト**: トップページHeroセクションのshadcn/ui化
**戦略**: Systematic（体系的）
**作成日**: 2025-10-12
**ステータス**: 実装準備完了

---

## 📋 プロジェクト概要

### 目的
トップページのHeroセクションを、shadcn/uiコンポーネントを使用してリニューアルし、親しみやすいトーンで日本語の自己紹介を表示する。

### 要件
- ✅ 日本語の自己紹介文を使用
- ✅ 親しみやすいトーンで表示
- ✅ shadcn/uiコンポーネントを活用
- ✅ モバイルファーストレスポンシブ対応
- ✅ 既存のデザインシステムに準拠

### 現状分析
**現在の実装** (`app/page.tsx` 15-35行):
- シンプルなテキストベースのレイアウト
- 日本語の自己紹介文は適切
- shadcn/uiコンポーネント未使用
- プレーンなHTMLとTailwind CSSのみ

**利用可能なshadcn/uiコンポーネント**:
- Card, CardHeader, CardTitle, CardContent, CardDescription
- Badge
- Button
- Accordion, Dialog, Sheet, Popover, Dropdown-menu

---

## 🎨 デザイン仕様

### コンポーネント構成

```tsx
<section className="py-12 md:py-16">
  <div className="container max-w-4xl">
    <Card className="border-2">
      <CardHeader>
        {/* 役割バッジ */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">自動車エンジニア</Badge>
          <Badge variant="secondary">AI開発者</Badge>
          <Badge variant="secondary">Web開発</Badge>
        </div>

        {/* メイン見出し */}
        <CardTitle className="text-3xl md:text-5xl">
          こんにちは、
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* 自己紹介文 */}
        <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>普段は自動車の保安部品をつくる仕事に携わっていて、冷間鍛造の技術を中心に開発業務を行っています。</p>
          <p>一方で、AI や Web アプリの開発にも取り組み、現場での気づきをプロダクトや仕組みに落とし込むことを楽しんでいます。</p>
          <p>このサイトは、そんな私のプレイグラウンド。プロジェクトの記録や学んだことをシェアしています。</p>
          <p>成功も失敗も、そのすべてを含めて共有していきますので、気軽にのぞいてください。</p>
        </div>

        {/* CTAボタン */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button asChild>
            <Link href="/projects">プロジェクトを見る</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/blog">ブログを読む</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</section>
```

### デザイン要素

#### カラースキーム
- **Card border**: `border-2` (ブランドカラーindigoのアクセント)
- **Badge**: `variant="secondary"` (控えめな背景色)
- **Text**: `text-muted-foreground` (読みやすいコントラスト)

#### タイポグラフィ
- **見出し**: `text-3xl md:text-5xl` (モバイル→デスクトップ)
- **本文**: `text-base md:text-lg` (日本語に適したサイズ)
- **行間**: `leading-relaxed` (可読性重視)

#### レスポンシブ対応
- **コンテナ幅**: `max-w-4xl` (プロジェクト標準)
- **パディング**: `py-12 md:py-16` (適切な余白)
- **ボタン配置**: `flex-col sm:flex-row` (モバイルは縦、デスクトップは横)

#### 親しみやすさの演出
1. **「こんにちは、」**: 親しみやすい挨拶
2. **Badgeでの役割表示**: 視覚的な自己紹介
3. **温かみのあるCard**: 枠組みで包容感
4. **明確なCTA**: 次のアクションへの誘導

---

## 🔧 実装ワークフロー

### Phase 1: 準備と設計 ✅
**目的**: 実装に必要な情報収集と設計確定

#### タスク
- [x] 現在のHero実装分析 (app/page.tsx 15-35行)
- [x] 利用可能なshadcn/uiコンポーネント確認
- [x] デザインパターン調査 (CLAUDE.md参照)
- [x] レスポンシブ要件確認
- [x] コンポーネント構成設計

#### 成果物
- ✅ デザイン仕様書 (本ドキュメント)
- ✅ コンポーネント構造図

---

### Phase 2: コンポーネント実装
**目的**: Heroセクションの実装

#### タスク 2.1: インポート確認
```bash
# 必要なインポートが既に存在するか確認
# app/page.tsx の既存インポート:
# - Card, CardContent, CardDescription, CardHeader, CardTitle ✅
# - Badge ✅
# - Button ✅
# - Link (next/link) ✅
```

**アクション**:
- [ ] 既存インポートを確認
- [ ] CardTitle が未インポートの場合追加

#### タスク 2.2: Heroセクション実装
**ファイル**: `app/page.tsx`
**対象行**: 15-35行

**実装手順**:
1. 既存のHeroセクション (15-35行) を新デザインに置き換え
2. Cardコンポーネントで囲む構造に変更
3. Badgeで役割を表示
4. CTAボタンを追加
5. 既存のテキストを活用

**コード変更**:
```tsx
// Before (15-35行)
<section className="py-8 md:py-12">
  <div className="container max-w-5xl">
    <h1 className="text-2xl md:text-3xl font-bold mb-6">
      こんにちは、
    </h1>
    <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
      {/* 既存の自己紹介文 */}
    </div>
  </div>
</section>

// After
<section className="py-12 md:py-16">
  <div className="container max-w-4xl">
    <Card className="border-2">
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">自動車エンジニア</Badge>
          <Badge variant="secondary">AI開発者</Badge>
          <Badge variant="secondary">Web開発</Badge>
        </div>
        <CardTitle className="text-3xl md:text-5xl">
          こんにちは、
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          {/* 既存の自己紹介文 */}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button asChild>
            <Link href="/projects">プロジェクトを見る</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/blog">ブログを読む</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</section>
```

**実装チェックリスト**:
- [ ] Cardコンポーネントの配置
- [ ] Badgeの実装（3つの役割）
- [ ] 見出しサイズの調整 (text-3xl md:text-5xl)
- [ ] 自己紹介文の配置（既存テキスト活用）
- [ ] CTAボタンの実装（プロジェクト、ブログ）
- [ ] レスポンシブクラスの適用

#### タスク 2.3: スタイリング調整
**目的**: デザインシステムとの整合性確保

**チェック項目**:
- [ ] コンテナ幅が max-w-4xl に変更されているか
- [ ] パディングが py-12 md:py-16 に設定されているか
- [ ] テキストサイズがモバイルファーストになっているか
- [ ] Cardのborder-2が適用されているか
- [ ] ボタン配置が flex-col sm:flex-row になっているか

---

### Phase 3: 品質保証とテスト
**目的**: 実装の品質とアクセシビリティの確保

#### タスク 3.1: ビジュアルテスト
**テスト環境**:
```bash
npm run dev
# http://localhost:3000 でアクセス
```

**テストケース**:
- [ ] **モバイル表示** (375px):
  - [ ] Cardが適切に表示される
  - [ ] Badgeが折り返し表示される
  - [ ] ボタンが縦並びになる
  - [ ] テキストが読みやすい

- [ ] **タブレット表示** (768px):
  - [ ] レイアウトが適切に拡大される
  - [ ] ボタンが横並びになる
  - [ ] 余白が適切に確保される

- [ ] **デスクトップ表示** (1024px+):
  - [ ] Cardが中央に配置される
  - [ ] max-w-4xlが効いている
  - [ ] 見出しが大きく表示される

#### タスク 3.2: テーマ切替テスト
**テストケース**:
- [ ] ライトモードで適切に表示される
- [ ] ダークモードで適切に表示される
- [ ] Cardのborderがテーマに合っている
- [ ] テキストコントラストが十分

#### タスク 3.3: アクセシビリティチェック
**チェック項目**:
- [ ] セマンティックHTML (h1, section)
- [ ] Buttonのフォーカスリング
- [ ] Linkの視認性
- [ ] Badgeのコントラスト比
- [ ] キーボードナビゲーション

#### タスク 3.4: パフォーマンステスト
**チェック項目**:
- [ ] Server Componentとして動作
- [ ] 不要なクライアントJSなし
- [ ] ハイドレーションエラーなし
- [ ] Linkのprefetch動作確認

---

### Phase 4: ビルドと検証
**目的**: 本番環境での動作確認

#### タスク 4.1: 型チェック
```bash
npx tsc --noEmit
```

**期待結果**: エラー0件

#### タスク 4.2: Lint実行
```bash
npm run lint
```

**期待結果**: 警告・エラー0件

#### タスク 4.3: 本番ビルド
```bash
npm run build
```

**チェック項目**:
- [ ] ビルドが成功
- [ ] 静的生成の確認
- [ ] バンドルサイズが適切
- [ ] エラー・警告なし

#### タスク 4.4: 本番環境テスト
```bash
npm run build
npm start
# http://localhost:3000 でアクセス
```

**テストケース**:
- [ ] Heroセクションが正しく表示
- [ ] CTAボタンのリンク動作
- [ ] レスポンシブ表示
- [ ] パフォーマンス確認

---

### Phase 5: ドキュメント更新とコミット
**目的**: 変更の記録と共有

#### タスク 5.1: CLAUDE.md更新
**更新内容**:
```markdown
## 📅 最新の開発進捗

### 2025-10-12: トップページHeroセクションリニューアル

**実装内容**:
1. **shadcn/uiコンポーネント導入**
   - Cardコンポーネントで自己紹介を囲む
   - Badgeで役割を視覚的に表示（自動車エンジニア、AI開発者、Web開発）
   - ButtonでCTA実装（プロジェクト、ブログへのリンク）

2. **デザイン改善**
   - 見出しサイズ拡大: text-3xl md:text-5xl
   - Card border-2で視覚的なアクセント
   - レスポンシブボタン配置（モバイル縦、デスクトップ横）

3. **親しみやすさの向上**
   - 温かみのあるCard枠組み
   - 役割Badgeで視覚的な自己紹介
   - 明確なCTAで次のアクション誘導

**技術的特徴**:
- Server Component維持（パフォーマンス最適化）
- モバイルファーストレスポンシブ
- アクセシビリティ準拠
```

**アクション**:
- [ ] CLAUDE.mdの「最新の開発進捗」セクションに追加
- [ ] 実装パターンとして記録

#### タスク 5.2: Gitコミット
**コミット前チェック**:
- [ ] git status で変更確認
- [ ] git diff で差分確認
- [ ] 不要な変更が含まれていないか確認

**コミット実行**:
```bash
git add app/page.tsx
git add claudedocs/HERO_RENOVATION_WORKFLOW.md
git add CLAUDE.md

git commit -m "feat: トップページHeroセクションをshadcn/uiでリニューアル

- Cardコンポーネントで自己紹介を囲み、視覚的な改善
- Badgeで役割表示（自動車エンジニア、AI開発者、Web開発）
- CTAボタン追加（プロジェクト、ブログへのリンク）
- 見出しサイズ拡大（text-3xl md:text-5xl）
- モバイルファーストレスポンシブ対応
- 親しみやすいトーンを視覚的に表現

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

**アクション**:
- [ ] 変更をステージング
- [ ] コミットメッセージ作成
- [ ] コミット実行
- [ ] git log で確認

---

## 📊 進捗管理

### 実装マイルストーン

| Phase | タスク | ステータス | 担当 |
|-------|--------|-----------|------|
| Phase 1 | 準備と設計 | ✅ 完了 | Claude |
| Phase 2 | コンポーネント実装 | ⏳ 待機中 | 実装者 |
| Phase 3 | 品質保証とテスト | ⏳ 待機中 | 実装者 |
| Phase 4 | ビルドと検証 | ⏳ 待機中 | 実装者 |
| Phase 5 | ドキュメント更新 | ⏳ 待機中 | 実装者 |

### タスク進捗

#### Phase 1: 準備と設計 ✅
- [x] 現状分析完了
- [x] デザイン仕様確定
- [x] コンポーネント構造設計完了

#### Phase 2: コンポーネント実装 ⏳
- [ ] インポート確認
- [ ] Heroセクション実装
- [ ] スタイリング調整

#### Phase 3: 品質保証とテスト ⏳
- [ ] ビジュアルテスト（モバイル、タブレット、デスクトップ）
- [ ] テーマ切替テスト
- [ ] アクセシビリティチェック
- [ ] パフォーマンステスト

#### Phase 4: ビルドと検証 ⏳
- [ ] 型チェック
- [ ] Lint実行
- [ ] 本番ビルド
- [ ] 本番環境テスト

#### Phase 5: ドキュメント更新 ⏳
- [ ] CLAUDE.md更新
- [ ] Gitコミット

---

## 🎯 成功基準

### 必須要件
- ✅ shadcn/uiコンポーネントを使用
- ✅ 日本語の自己紹介文を表示
- ✅ 親しみやすいトーンを表現
- ✅ モバイルファーストレスポンシブ対応

### 品質基準
- [ ] TypeScriptエラー0件
- [ ] Lintエラー・警告0件
- [ ] 本番ビルド成功
- [ ] 全デバイスで適切に表示
- [ ] アクセシビリティ準拠
- [ ] パフォーマンス劣化なし

### ユーザー体験
- [ ] 親しみやすさが視覚的に伝わる
- [ ] CTAが明確で行動喚起できる
- [ ] 読みやすいタイポグラフィ
- [ ] テーマ切替で適切に表示

---

## 🔍 リスクと対策

### 潜在的リスク

#### リスク 1: レイアウト崩れ
**リスク**: モバイルでCardが狭すぎる、またはBadgeが多すぎて見づらい

**対策**:
- `max-w-4xl`で適切な幅を確保
- Badgeを`flex-wrap gap-2`で折り返し対応
- モバイルテストで実機確認

#### リスク 2: パフォーマンス劣化
**リスク**: Cardコンポーネント追加でバンドルサイズ増加

**対策**:
- Server Componentとして実装（クライアントJS不要）
- shadcn/uiは既に使用中（追加インパクト小）
- ビルドサイズを監視

#### リスク 3: アクセシビリティ低下
**リスク**: Cardで囲むことでスクリーンリーダーの読み上げが不適切

**対策**:
- セマンティックHTML維持 (`<section>`, 見出し階層)
- Cardは装飾的な要素として扱う
- フォーカス管理を確認

#### リスク 4: テーマ対応
**リスク**: ダークモードでCardの境界が見えない

**対策**:
- `border-2`で明確な境界線
- テーマ別のビジュアルテスト
- コントラスト比の確認

---

## 📚 参考資料

### プロジェクトドキュメント
- `CLAUDE.md` - プロジェクト全体のガイド
- `claudedocs/CODE_ANALYSIS_REPORT.md` - コード品質分析
- `claudedocs/RENEWAL_PLAN.md` - リニューアル計画

### 技術リファレンス
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)

### デザインパターン
- モバイルファーストレスポンシブ: `CLAUDE.md` 83-89行
- コンテナ幅規約: `CLAUDE.md` 287-293行
- タイポグラフィ規約: `CLAUDE.md` 79-86行

---

## 🚀 次のステップ

### 即座に実行可能
1. **Phase 2開始**: コンポーネント実装
2. **インポート確認**: app/page.tsx の既存インポートチェック
3. **コード置き換え**: 15-35行を新デザインに変更

### 実装後
1. ビジュアルテスト実施
2. ビルド・検証
3. ドキュメント更新
4. Gitコミット

### 将来的な改善案
- Heroセクションのアニメーション追加（TypeAnimation等）
- プロフィール画像の追加（Avatarコンポーネント）
- 統計情報の表示（プロジェクト数、記事数等）
- ソーシャルリンクの追加

---

## 📝 変更履歴

| 日付 | バージョン | 変更内容 | 作成者 |
|------|----------|---------|--------|
| 2025-10-12 | 1.0.0 | 初版作成 - 体系的ワークフロー生成 | Claude |

---

**ワークフロー作成者**: Claude Code
**戦略**: Systematic Implementation
**最終更新**: 2025-10-12
