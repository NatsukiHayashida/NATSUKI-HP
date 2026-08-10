import { MailCompare } from './diagrams/mail-compare'
import { Legend, Schematic } from './schematic'
import { ReworkBreakdown } from './diagrams/rework-breakdown'
import { SystemMap } from './diagrams/system-map'

/**
 * 記事本文に差し込む模式図。
 * MDX 側に <figure data-diagram="キー"></figure> と書くと、対応する図が描画される。
 * 記述は本文で述べた範囲に限る（伏字ルール：社名・製品名・社内パス・金額は載せない）。
 */

function WorkHubMap() {
  return (
    <Schematic
      label="FIG. 01"
      title="スマートフォンを中心に見た全体像"
      note="中心から外へ向かって層が重なっている。手元のスマートフォンから見ると、閉域ネットワークを越え、中継プロセスを通り、仮想環境（ハッチングの層）の中のサーバーに届いて、はじめて外側の記録に手が届く。"
    >
      <SystemMap className="mx-auto w-full max-w-[560px] text-foreground" />
      <Legend
        items={[
          {
            no: '01',
            title: 'スマートフォン',
            body: '通勤中や外出先から見る。片手で操作できるよう、文字入力をさせない画面にしてある。',
          },
          {
            no: '02',
            title: '閉域ネットワーク',
            body: 'インターネットへの公開機能は使わない。暗証番号で照合し、成功したらトークンを発行してCookieで保持する。連続5回失敗で5分ロック。',
          },
          {
            no: '03',
            title: '中継プロセス（Windows・ユーザー権限）',
            body: 'システム権限側からは仮想環境に直接届かないため、1段だけ挟んでいる。起動時にアドレスを解決し、失敗したら再解決する。',
          },
          {
            no: '04',
            title: 'Pythonサーバー（WSL2）',
            body: 'ダッシュボードとレポート閲覧ハブの2本。標準ライブラリだけで書いてあり、依存パッケージはゼロ。',
          },
          {
            no: '05',
            title: 'プロジェクトの記録（約30）',
            body: 'ファイルの更新日時、進捗ファイル、コミット履歴を走査する。進捗の手入力はゼロ。',
          },
          {
            no: '06',
            title: '会社のメール',
            body: '一覧は起動時に先読みし、個別表示は指定した1通だけを取りにいく。',
          },
          {
            no: '07',
            title: '予定',
            body: '毎朝5時半に、その日の予定と各プロジェクトの状況をまとめた要約が自動生成される。',
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
      title="メール表示が遅かった理由と、直したあとの形"
      note="体感ではなく処理を計測してから直した。真因は「1通開くたびに最新200通を落としていた」ことで、想像していた原因とは違っていた。"
    >
      <MailCompare />
    </Schematic>
  )
}

function FusionRework() {
  return (
    <Schematic
      label="FIG. 01"
      title="19.6時間を分解する ― 何に時間を使っていたのか"
      note="体感ではなく作業ログを全部集計して出した内訳。遅かったのは作業そのものではなく、正しさを確定させる前に作り始めて、作ってから照合して壊すループだった。"
    >
      <ReworkBreakdown />
      <Legend
        items={[
          {
            no: '01',
            title: '手戻り・是正・復旧',
            body: '13.8時間。全体の70%。何が正しいかを確定させる前に作り始め、作ってから照合して壊す、というループがここで回っていた。',
          },
          {
            no: '02',
            title: '正味の新しい作業',
            body: '5.8時間。前へ進んだ時間はこれだけ。構築そのものは速く、ここが遅かったわけではない。',
          },
          {
            no: '03',
            title: '計測が失われた範囲',
            body: '記録の25%。クラッシュや再起動で計測そのものが失われ、概算になっている。特定の区間ではなく全体に散っているため、帯の厚みを貫く形で示している。',
          },
          {
            no: '04',
            title: '発端になった作業',
            body: '部品に穴をあけるという単純な作業に35分と12万トークンを使っていた。何かがおかしい、と思ったのがこの集計の出発点。',
          },
          {
            no: '05',
            title: '集計した全体',
            body: '5日間で38件、合計19.6時間。自分の作業ログをすべて集めた範囲。',
          },
        ]}
      />
    </Schematic>
  )
}

export const articleDiagrams: Record<string, () => React.JSX.Element> = {
  'work-hub-map': WorkHubMap,
  'work-hub-mail': WorkHubMail,
  'fusion-rework': FusionRework,
}
