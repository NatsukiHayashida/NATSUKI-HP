import { DomainShift } from './diagrams/domain-shift'
import { GateCoverage } from './diagrams/gate-coverage'
import { MailCompare } from './diagrams/mail-compare'
import { Legend, Readout, Schematic } from './schematic'
import { MaskPosition } from './diagrams/mask-position'
import { MetricBlindspot } from './diagrams/metric-blindspot'
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

function GaikanMetric() {
  return (
    <Schematic
      label="FIG. 01"
      title="旧指標は、4象限のうち上段の2つしか見ていなかった"
      note="左右は同じ盤面で、違うのは中身だけ。上段しか数字にならないので、全品を不良側へ送ると満点が取れてしまう。まず、4象限を全部使う指標に入れ替えるところから始めた。"
    >
      <MetricBlindspot />
      <Readout
        items={[
          { value: '100%', label: '全品を不良と判定したときの「検出率」' },
          { value: '0', label: '同じときの見逃し' },
          {
            value: '対象外',
            label: '同じとき最大まで膨らむ過検出。旧指標の計算には入らない',
            accent: true,
          },
        ]}
      />
      <Legend
        items={[
          {
            no: '01',
            title: '旧指標が計算に使う範囲',
            body: '「不良品の検出率」は、上段の2つ（不良を検出・見逃し）だけで決まる。下段の過検出と良品を通過は、どれだけ増えても数字にまったく現れない。',
          },
          {
            no: '02',
            title: '全品を不良と判定すると',
            body: 'すべてを不良側へ送れば見逃しがゼロになり、検出率100%が成立する。このとき過検出は最大まで膨らむが、01の線より下なので数字には出ない。指標が壊れているとはこういうこと。',
          },
        ]}
      />
    </Schematic>
  )
}

function GaikanMask() {
  return (
    <Schematic
      label="FIG. 02"
      title="同じマスクでも、かける場所で結果が逆転する"
      note="並びは上下で同じで、違うのは朱のマスクをどこに挿すかだけ。モデル自体は何も変えていない。"
    >
      <MaskPosition />
      <Readout
        items={[
          { value: '44.2%', label: 'マスクなし（ベースライン）の過検出率' },
          { value: '72.4%', label: '入力側にマスクをかけたとき', accent: true },
          { value: '20.8%', label: '同じ処理を推論後へ移したとき' },
        ]}
      />
      <Legend
        items={[
          {
            no: '01',
            title: 'なぜ入力側だと悪化するのか',
            body: '外周を塗りつぶすマスクが、端にあった欠陥まで一緒に消していた。欠陥が消えれば不良品の異常スコアが下がる。見逃しゼロを守るには閾値をその最低値まで下げるしかなく、閾値が下がった分だけ良品が不良側へ落ちた。過検出が跳ね上がった実体はこれで、マスクが背景を消し損ねたわけではない。',
          },
          {
            no: '02',
            title: 'なぜ推論後だと効くのか',
            body: 'モデルには元の画像をそのまま見せるので、欠陥の情報は一切削れない。できあがった異常マップから、検査対象外の領域の反応だけを判定から外す。捨てるのが入力ではなく出力なら、失うものがない。',
          },
        ]}
      />
    </Schematic>
  )
}

function GaikanShift() {
  return (
    <Schematic
      label="FIG. 03"
      title="別の日に撮った良品は、不良品の山の中に入っていた"
      note="当時の推論スコアを1枚ずつ集計して描いた実測の分布。高さは各群の中での相対度数で、枚数が違うためレーンごとに正規化している。閾値をどこへ動かしても、別の日の良品と不良品は分けられない。"
    >
      <DomainShift />
      <Readout
        items={[
          {
            value: '100 / 100',
            label: '別の日に撮った良品のうち、不良と判定された枚数',
            accent: true,
          },
          { value: '0.999', label: '同じ日に撮った画像だけで測ったときのAUC' },
          { value: '0.38 → 0.5385', label: '良品スコアの上端と、別の日の良品の下端' },
        ]}
      />
      <Legend
        items={[
          {
            no: '01',
            title: '当時の閾値',
            body: '同じ日の画像なら、この線で良品と不良品がほぼ分かれていた。線の右へ出た良品が、当時の過検出10.8%にあたる。',
          },
          {
            no: '02',
            title: '良品の上端 ― 0.38',
            body: '学習と同じ条件で撮った良品が到達した最大値。ここより上に良品は出ない、というのが当時の前提だった。',
          },
          {
            no: '03',
            title: '別の日の良品の下端 ― 0.5385',
            body: '別の日に撮った無選別の良品100枚は、その最小値でさえ0.38を大きく超えた。しかも不良品178枚のうち108枚は、この0.5385より低いスコアだった。良品のほうが不良品より「不良らしく」出ている。',
          },
        ]}
      />
    </Schematic>
  )
}

function FusionGate() {
  return (
    <Schematic
      label="FIG. 02"
      title="門は、門が見ている対象しか守らない"
      note="検査ゲートは全部合格した。合格したのに加工できなかったのは、ゲートが見ている範囲と、図面として成立するのに必要な範囲がずれていたから。抜けた項目はすべて、その差の領域に落ちている。"
    >
      <GateCoverage />
      <Legend
        items={[
          {
            no: '01',
            title: '図面として成立するために必要な範囲',
            body: '加工する人が手を動かせる図面になっているか、という条件の全体。',
          },
          {
            no: '02',
            title: '検査ゲートが見ていた範囲',
            body: '寸法も表題欄も図枠も、ここは全部通った。通ったのに図面は成立していなかった。',
          },
          {
            no: '03',
            title: '投影図の数',
            body: '投影図が1面しかなく、二面幅があるのかないのかを確かめる手段がなかった。なお「その図面に投影図が何個あるか」を機械で正しく数える方法は現在も見つかっておらず、この項目だけは追加ゲートでも拾えていない。',
          },
          {
            no: '04',
            title: '一般公差',
            body: '図面全体に適用する公差の注記が抜けていた。',
          },
          {
            no: '05',
            title: '面粗さ',
            body: '加工面に必要な表面性状の指示が抜けていた。',
          },
          {
            no: '06',
            title: '面取り',
            body: '角部の面取り指示が抜けていた。',
          },
          {
            no: '07',
            title: '外形線',
            body: '同じ構造の失敗がもう一度起きた箇所。寸法も表題欄も図枠も通るのに、描いた形そのものを見る門がなかった。',
          },
          {
            no: '08',
            title: '後から足した、原本と同じ物差しで測るゲート',
            body: '既存ゲートの外側まで走査し、原本にあってこちらに無い項目を違反として検出する。実際の図面21枚から616個の寸法要素を、366枚から自社の作図の流儀を実測してつくった。',
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
  'fusion-gate': FusionGate,
  'gaikan-metric': GaikanMetric,
  'gaikan-mask': GaikanMask,
  'gaikan-shift': GaikanShift,
}
