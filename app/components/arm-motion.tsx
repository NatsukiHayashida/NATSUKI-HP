'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef, useSyncExternalStore } from 'react'

/**
 * 搬送アームとダイセットが連動して動くところを、**スクロールで送る**。
 * 記事「CAD操作をAIに任せる」の「動画を1コマンドで生成する仕組み」の段落の直後に置く。
 *
 * **仕掛けの正体**（2026-08-12 に Apple の製品ページを実測して分かったこと）。
 * 向こうの動画13本は全部 muted・controls なし・**autoplay が false**。
 * 再生ボタンで流しているのではなく、**スクロール位置がそのまま再生位置**になっている。
 * ここでも同じことをしている。試作は `app/dev/seamless`（採否が決まったので消してよい）。
 *
 * **素材が条件を満たしている。** 81フレーム＝プレス1サイクル。カメラのキーを6つ置いて
 * 各キー間を81フレームにしてあるので、6×81＝486フレームで**機構もカメラも同時に一周**する。
 * だから最後まで送っても先頭へ繋がる（末尾→先頭の差 2.131 は隣接フレーム差の範囲内）。
 * カットは1つもない。**尺を変えるときは81の倍数にすること**（10秒＝5キー、14秒＝7キー）。
 *
 * **出どころ**
 * ~/work/transfer-conveyance で生成した掲載用の別版。掲載用として変えてあるのは
 * 製品を非表示・HUDなしの2点と、透過（ダイセット30%／それ以外55%／稜線なし）。
 * 原本は `images/20260816/TRF搬送アーム_カメラワーク_1080p_B反転_crf19_20260816.mp4`。
 * 仕様は `docs/2026-08-15-web動画_カメラワーク版.md`。
 *
 * **B反転** ＝ 金型5段の色の割り当てを上下逆にした版（2026-08-16・林田氏が4案から裁定）。
 * 縦の円筒面は光を受けないため、下から順に暗くすると背の高い上型が黒に潰れていた。
 * 色そのものは承認済みの5色のまま、向きだけ変えてある。
 * 指示は `docs/2026-08-16-撮り直し指示-B反転.md`。
 *
 * **スクラブ用に焼き直してある**（`arm-motion-scrub-1080.mp4`）。
 * 通常のmp4は数フレームに1枚しかキーフレームが無く、途中へ飛ぶたびに前のキーフレームから
 * 復号し直すのでスクロールに追従できない。**全フレームをキーフレームにする**（`-g 1`）。
 * 重くなるぶんは**コマ数で相殺する。解像度で落とすと単に粗くなる**
 * （2026-08-15 に 960×540 まで落として「ぼける」と言われた）。
 *
 * ```
 * ffmpeg -i <原本> -vf "select='not(mod(n\,3))',setpts=N/13.5/TB" -r 13.5 \
 *   -c:v libx264 -crf 31 -g 1 -preset slow -pix_fmt yuv420p -movflags +faststart -an out.mp4
 * ```
 *
 * 1920×1080・162コマ・3.6MB。crf26 なら 5.8MB だが SSIM 0.988 の差しかない。
 *
 * **表示幅は 1280px で頭打ちにしてある（2026-08-16）。理由は引き伸ばし。**
 * 上下の空きを詰めるために画面幅いっぱいまで広げたところ、2倍ディスプレイでは
 * 表示1440pxに2880px、16インチの1728pxには3456px要ることになり、
 * 素材1920pxに対して**1.50〜1.80倍の引き伸ばし**になっていた（実測）。
 * 1280で止めれば1.33倍に収まり、上下の空きもほとんど変わらない。
 *
 * | 表示幅 | 2倍ディスプレイで必要 | 素材1920pxでは |
 * |---|---|---|
 * | 1728px | 3456 | 1.80倍 |
 * | 1440px | 2880 | 1.50倍 |
 * | **1280px** | 2560 | **1.33倍** |
 * | 960px | 1920 | 等倍 |
 *
 * **等倍にしたいなら960pxまで狭めるか、素材を4Kで撮り直してもらうしかない。**
 * コマ数と解像度は交換できるが、解像度と素材は交換できない。
 *
 * **state を持たない。** 毎フレーム setState すると再描画が追いつかない。
 * 送り位置は rAF の中で DOM（`video.currentTime`）へ直接書く。
 * lint の `react-hooks/set-state-in-effect` にも触れない。
 *
 * **iOS では最初に一度 play→pause して復号器を起こす。** これをしないと、
 * 触るまで currentTime を動かしても絵が変わらないことがある。
 *
 * **3.6MB あるので、近づくまで読み込まない。** src は最初から張らず、
 * 画面の1つ手前に来てから入れる（`rootMargin`）。
 *
 * **文字は一切置かない（2026-08-14・本人判断）。** 説明文もラベルも罫線の囲みも、
 * 一度付けてから外した経緯がある。試作にあった進捗バーとラベルも本番には持ってきていない。
 * **足し直さないこと。** 動きの中身は目に見えない読者のために aria-label にだけ残してある。
 */

/**
 * **ダークは背景が黒い版に差し替える（2026-08-16）。**
 * 素材の地はライトが 255、ダークが 0。ページの地はライト 252・ダーク 20 なので、
 * どちらもほぼ同化する。直す前はダークで白い板が浮いていた（地 230 対 20）。
 *
 * **透過（アルファ付き）は使わない。** 2つ理由がある。
 * ①届いた透過版は3本とも `yuv420p` でアルファが入っていなかった
 *   （`-pix_fmt yuva420p -auto-alt-ref 0` が要る）
 * ②**そもそも WebM のアルファは Safari が対応していない**。iPhone で何も見えなくなる。
 *   2026-08-14 に案Gを却下したのもこれが理由
 * **背景色の違う版を2本持つほうが確実で、どのブラウザでも破綻しない。**
 */
const VARIANTS = {
  light: {
    scrub: '/video/arm-motion-scrub-1080.mp4',
    loop: '/video/arm-motion-camera-1080.mp4',
    poster: '/video/arm-motion-camera-1080-poster.webp',
  },
  dark: {
    scrub: '/video/arm-motion-scrub-1080-dark.mp4',
    loop: '/video/arm-motion-camera-1080-dark.mp4',
    poster: '/video/arm-motion-camera-1080-dark-poster.webp',
  },
} as const

/**
 * いま出すべき版。**組み上がるまでは null を返す。**
 *
 * サーバー側では `resolvedTheme` が未確定なのに、**クライアントの初回描画では
 * すでに値が返る**。そのまま属性に流すとサーバーの出力と食い違い、
 * 水和の不一致になる（実際に出した。Next の「1 Issue」バッジで気づいた）。
 * **だから mount するまでは何も返さず、src と poster は effect で入れる。**
 * どちらも元々あとから入れる作りなので、決まってからで間に合う。
 */
const noSubscribe = () => () => {}

function useVariant() {
  const { resolvedTheme } = useTheme()
  // 組み上がったかどうか。effect で setState すると lint の
  // react-hooks/set-state-in-effect に触れるので、こちらで取る
  const mounted = useSyncExternalStore(
    noSubscribe,
    () => true,
    () => false
  )
  if (!mounted || !resolvedTheme) return null
  return resolvedTheme === 'dark' ? VARIANTS.dark : VARIANTS.light
}

const ALT =
  '搬送アームとダイセットが連動して動くところ。俯瞰から全景、反対側への回り込み、' +
  'ツール部への寄り、1ステーションのアップを経て俯瞰へ戻る。機構はその間ずっと、' +
  '持ち上げ、掴み、送り、下ろし、離し、戻るを繰り返している'

/** 何画面ぶんスクロールさせるか。長いほどゆっくり送られる */
const SCREENS = 3

/** 貼りつけに切り替える幅。本文が864pxになるのと同じ境目 */
const DESKTOP = '(min-width: 1024px)'

function subscribe(cb: () => void) {
  const mq = window.matchMedia(DESKTOP)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

/**
 * **スマホでは貼りつけない（2026-08-16・本人の指摘「余白でかすぎ」）。**
 * 16:9 を縦長の画面に貼りつけると、画面844pxに対し動画が211pxしか埋まらず、
 * 上下が大きく空く。**切らない限りこの空きは消せない**（390:844 に合わせて
 * object-cover で埋めると横を7割以上落とすことになり、搬送レールが両端とも切れる）。
 * なので幅1024px未満では貼りつけをやめ、本文の中でそのまま流す。
 *
 * この記事の模式図が「PC横組み／スマホ縦組み」を `lg:` で出し分けているのと同じ考え方。
 * **縦位置で撮り直してもらえれば、スマホでも貼りつけに寄せられる**（それが本筋）。
 *
 * 描き分けは CSS ではなく matchMedia で行う。CSS の hidden で隠すと、
 * **隠したほうの動画も読み込まれて 2.6MB か 3.6MB を無駄に落とす**。
 */
export function ArmMotion() {
  const desktop = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP).matches,
    () => false // サーバー側はスマホ側を返す（モバイルファースト）
  )

  return desktop ? <ScrollScrub /> : <InlineLoop />
}

/** 本文の中でそのまま流す。スマホ用 */
function InlineLoop() {
  const ref = useRef<HTMLVideoElement>(null)
  const variant = useVariant()
  const src = variant?.loop
  const poster = variant?.poster

  // テーマが決まってから入れる。切り替えたらそのまま差し替わる
  useEffect(() => {
    const el = ref.current
    if (!el || !src || !poster) return
    el.poster = poster
    if (el.getAttribute('src') !== src) el.src = src
  }, [src, poster])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // 動きを減らす設定のときは自動再生させず、本人が押して見られるようにする
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.autoplay = false
      el.controls = true
      el.pause()
      return
    }

    // 画面の外にある間は止める（ずっとデコードさせ続けない）
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <figure className="not-prose my-10">
      {/* 地の色が合っている版を出すので、明るさの補正（dark:brightness-90）は要らない */}
      <video
        ref={ref}
        width={1920}
        height={1080}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={ALT}
        className="mx-auto block h-auto w-full"
      />
    </figure>
  )
}

/** スクロールで送る。PC用 */
function ScrollScrub() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const variant = useVariant()
  const src = variant?.scrub
  const poster = variant?.poster

  /*
    読み込みは「近づいたか」と「テーマが決まったか」の両方が揃ってから。
    どちらが先に立つかは決まっていないので、両方を ref に持って、
    後から立ったほうが読み込みを起こす。
  */
  const wantRef = useRef<string | undefined>(undefined)
  const nearRef = useRef(false)

  useEffect(() => {
    // この effect は下の（監視を張る）effect より先に走るので、loader が読む時点で入っている
    wantRef.current = src

    const video = videoRef.current
    if (!video || !src || !poster) return
    video.poster = poster

    const current = video.getAttribute('src')
    if (current === src) return

    // まだ何も入れていない：近くまで来ていれば入れる。まだなら loader に任せる
    if (!current) {
      if (nearRef.current) video.src = src
      return
    }

    /*
      **テーマを切り替えたときの差し替え。送り位置を保つ。**
      入れ替えると currentTime が 0 に戻るため、そのままだと絵が頭へ飛ぶ。
      読み直せた時点で書き戻す。
    */
    const t = video.currentTime
    video.src = src
    video.addEventListener('loadedmetadata', () => { video.currentTime = t }, { once: true })
  }, [src, poster])

  useEffect(() => {
    const wrap = wrapRef.current
    const stage = stageRef.current
    const video = videoRef.current
    if (!wrap || !stage || !video) return

    let raf = 0
    let primed = false
    let visible = false

    // iOS 対策。一度だけ再生して止め、復号器を起こしておく
    const prime = () => {
      if (primed) return
      primed = true
      video.play().then(() => video.pause()).catch(() => {})
    }

    /*
      本文の段組（864px）から出して画面いっぱいに広げる。**`w-screen` や `100vw` は使わない。**
      100vw はスクロールバーの幅を含むため、縦スクロールバーが出ている環境では
      その幅ぶん横にはみ出し、左右に揺れる（この記事で一度踏んでいる）。
      `clientWidth` はスクロールバーを含まないので、実測して当てれば揺れない。
    */
    const fitWidth = () => {
      const w = document.documentElement.clientWidth
      stage.style.width = `${w}px`
      stage.style.marginLeft = `${-wrap.getBoundingClientRect().left}px`
    }

    const tick = () => {
      raf = 0
      const rect = wrap.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0

      const d = video.duration
      if (d && Number.isFinite(d)) {
        // 末尾ちょうどは黒コマになる実装があるので気持ち手前で止める
        const t = p * (d - 0.001)
        if (Math.abs(video.currentTime - t) > 0.008) video.currentTime = t
      }
    }

    const onScroll = () => {
      if (!visible || raf) return
      raf = requestAnimationFrame(tick)
    }

    const onResize = () => {
      fitWidth()
      onScroll()
    }

    fitWidth()

    // 1画面ぶん手前で読み込みを始める（3.6MBを最初から取りに行かせない）
    const loader = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        nearRef.current = true
        const want = wantRef.current
        if (!want) return // テーマがまだ決まっていない。決まったら上の effect が入れる
        if (!video.getAttribute('src')) video.src = want
        loader.disconnect()
      },
      { rootMargin: '100% 0px' }
    )
    loader.observe(wrap)

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting
        if (visible) {
          prime()
          onScroll()
        }
      },
      { threshold: 0 }
    )
    io.observe(wrap)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    video.addEventListener('loadedmetadata', tick)

    return () => {
      loader.disconnect()
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      video.removeEventListener('loadedmetadata', tick)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  /*
    not-prose は必須。記事本文の prose が中のメディアに上下2emを付けるため、
    付けると枠と動画の間が32px空いて別ブロックに見える。

    sticky の親に overflow を持たせないこと（持たせると貼りつかなくなる）。
    max-h は、縦の短いウィンドウで動画が画面からはみ出さないようにするため。

    **上下の余白は付けない（2026-08-16・本人の指示）。** 図の前後は本文が遠いので
    `my-*` は効き目が無く、画面に見えている上下の空きは「動画が画面の高さを
    使い切っていない」ぶん。そちらは横を画面幅まで広げて詰めた（`fitWidth`）。
    16:9 なので、縦長のスマホでは上下の空きが残る。これは切らない限り消せない。
  */
  return (
    <figure
      ref={wrapRef}
      className="not-prose relative"
      style={{ height: `${SCREENS * 100}vh` }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 flex h-screen items-center justify-center"
      >
        {/* 地の色が合っている版を出すので、明るさの補正（dark:brightness-90）は要らない */}
        <video
          ref={videoRef}
          width={1920}
          height={1080}
          muted
          playsInline
          preload="none"
          aria-label={ALT}
          className="block h-auto max-h-screen w-full max-w-[1280px] object-contain"
        />
      </div>
    </figure>
  )
}
