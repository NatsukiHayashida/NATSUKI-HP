import { Flow, Schematic } from './schematic'

/**
 * 記事本文に差し込む模式図。
 * MDX 側に <figure data-diagram="キー"></figure> と書くと、対応する図が描画される。
 * 記述は本文で述べた範囲に限る（伏字ルール：社名・製品名・社内パス・金額は載せない）。
 */

function WorkHubCollect() {
  return (
    <Schematic
      label="FIG. 01"
      title="進捗が自動で集まるまで"
      note="進捗の手入力はゼロ。抽出はAIを使わず決め打ちのルールだけで行っているため、応答は即時で費用もかからない。"
    >
      <Flow
        steps={[
          {
            zone: '入力',
            title: 'プロジェクト群（約30）',
            lines: [
              'ファイルの更新日時',
              '進捗ファイル・記録ファイル',
              'コミット履歴・ブランチ・未コミット数',
            ],
          },
          {
            zone: '走査',
            title: 'アクセスのたびに走査',
            lines: [
              '60秒キャッシュ',
              '期限切れでも古い内容を先に返す',
              '更新は裏で実行',
              '依存フォルダと未来日付のファイルは除外',
            ],
          },
          {
            zone: '判定',
            title: 'ルールベースで解釈',
            accent: true,
            lines: [
              '活動レベルを4段階で判定（稼働中／直近／低活動／休眠）',
              '説明文と「次にやること」を決まった優先順位で抽出',
              '判断待ちと期限を全プロジェクトから抜き出す',
            ],
          },
          {
            zone: '出力',
            title: 'ダッシュボード',
            lines: [
              '56日分の活動をスパークラインで表示',
              '判断待ち・期限の横断一覧',
              'テキストファイルのその場検索',
            ],
          },
        ]}
      />
    </Schematic>
  )
}

function WorkHubMail() {
  return (
    <Schematic
      label="FIG. 02"
      title="メール表示が遅かった理由と、直したあとの経路"
      note="体感ではなく処理を計測してから直した。真因は「1通開くたびに最新200通を落としていた」ことで、想像していた原因とは違っていた。"
    >
      <Flow
        label="改善前"
        result="25s"
        steps={[
          { title: '一覧を開く' },
          {
            title: '最新200通を全文ダウンロード',
            lines: ['一覧をつくるのに全文は要らない'],
          },
          { title: '表示' },
        ]}
      />
      <Flow
        label="改善後 ─ 一覧"
        result="0.46s"
        steps={[
          { title: '起動時に先読み', lines: ['あらかじめ取得しておく'] },
          {
            title: '古い内容を先に返す',
            accent: true,
            lines: ['更新は裏で実行', '更新中もロックを握らない'],
          },
          { title: '待たされずに表示' },
        ]}
      />
      <Flow
        label="改善後 ─ 個別表示"
        result="0.36s"
        steps={[
          { title: '指定した1通だけ取得' },
          { title: '10分キャッシュ', accent: true },
          { title: '再表示は取得なし' },
        ]}
      />
    </Schematic>
  )
}

function WorkHubAccess() {
  return (
    <Schematic
      label="FIG. 03"
      title="外から中へ ― 到達するまでの経路"
      note="インターネットへの公開機能は使っていない。到達できるのは閉域ネットワークの内側からだけで、扱うファイルに業務の情報が含まれるためここは崩さない。"
    >
      <Flow
        steps={[
          {
            zone: '手元',
            title: 'スマートフォン',
            lines: ['通勤中や外出先から見る', '文字入力をさせない画面設計'],
          },
          {
            zone: '閉域ネットワーク',
            title: '認証を通す',
            lines: [
              '暗証番号で照合',
              '成功したらトークンを発行しCookieで保持',
              'トークンはサーバーのメモリ上だけに置く',
              '連続5回失敗で5分ロック',
            ],
          },
          {
            zone: 'Windows（ユーザー権限）',
            title: '中継プロセス',
            accent: true,
            lines: [
              'システム権限側からは仮想環境に直接届かない',
              '起動時にアドレスを解決し、失敗したら再解決',
            ],
          },
          {
            zone: 'WSL2',
            title: 'Pythonサーバー',
            lines: [
              '標準ライブラリのみ・依存パッケージゼロ',
              'ダッシュボードとレポート閲覧ハブの2本',
            ],
          },
        ]}
      />
    </Schematic>
  )
}

export const articleDiagrams: Record<string, () => React.JSX.Element> = {
  'work-hub-collect': WorkHubCollect,
  'work-hub-mail': WorkHubMail,
  'work-hub-access': WorkHubAccess,
}
