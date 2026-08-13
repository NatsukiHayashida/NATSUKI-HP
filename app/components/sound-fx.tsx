'use client'

import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

/*
  ON/OFF の正本は localStorage。React の state ではなく外部ストアとして購読する。
  useEffect + setState で読み込むと「effect 内の同期 setState」になり lint に弾かれ、
  ハイドレーション後の再描画も一段増える。
  getServerSnapshot が false を返すので、サーバー描画とハイドレーションは必ず一致する。
*/
const FX_KEY = 'nh_fx'
const listeners = new Set<() => void>()

function subscribe(cb: () => void) {
  listeners.add(cb)
  window.addEventListener('storage', cb) // 別タブでの変更にも追従する
  return () => {
    listeners.delete(cb)
    window.removeEventListener('storage', cb)
  }
}
function getSnapshot() {
  return localStorage.getItem(FX_KEY) === 'on'
}
function setFx(next: boolean) {
  localStorage.setItem(FX_KEY, next ? 'on' : 'off')
  listeners.forEach((cb) => cb())
}

/**
 * 操作音＋振動＋スクロール音。project-hub / report-hub と同じ方式を移植した
 * （原本は ~/work/project-hub/serve_progress.py の FX_JS・2026-08-13 移植）。
 *
 * **iOSの制約がこの実装の形を決めている。**
 * WebAudio はユーザー操作の完了（click / touchend）の中でしか解錠できず、
 * ページ復帰やタブ切替で suspended に戻る。そのため
 *   - 解錠（unlockAudio）は click と touchend の中でだけ呼ぶ
 *   - 復帰時（pageshow / visibilitychange）に resume を試す
 *   - スクロール中は解錠できない（touchmove があると touchend で解錠しない）
 * という順序になっている。ここを整理して「きれいに」書き換えると鳴らなくなる。
 *
 * 音は録音データではなく WebAudio の発振器で作る（外部ファイル不要・CSP に触れない）。
 * 設定は localStorage 'nh_fx'（既定OFF）。原本は既定ONだが、
 * こちらはポートフォリオサイトで初見の訪問者が多いため既定OFFにしてある。
 */
export default function SoundFx() {
  const on = useSyncExternalStore(subscribe, getSnapshot, () => false)
  const acRef = useRef<AudioContext | null>(null)
  const onRef = useRef(false)

  // イベントリスナーは張り替えたくないので、ON/OFF は ref 経由で読む
  useEffect(() => {
    onRef.current = on
  }, [on])

  const unlockAudio = useCallback(() => {
    if (!onRef.current) return
    try {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Ctor) return
      if (!acRef.current || acRef.current.state === 'closed') acRef.current = new Ctor()
      const ac = acRef.current
      if (ac.state === 'running') return
      // 無音1サンプルを鳴らして解錠する（iOSはこれが要る）
      const s = ac.createBufferSource()
      s.buffer = ac.createBuffer(1, 1, 22050)
      s.connect(ac.destination)
      s.start(0)
      ac.resume().catch(() => {})
      setTimeout(() => {
        if (acRef.current && acRef.current.state !== 'running') {
          try {
            acRef.current.close()
          } catch {}
          acRef.current = null
        }
      }, 500)
    } catch {}
  }, [])

  const beep = useCallback((freq: number, gain: number, dur: number) => {
    const ac = acRef.current
    if (!ac) return
    try {
      const t = ac.currentTime
      const o = ac.createOscillator()
      const g = ac.createGain()
      o.type = 'square'
      o.frequency.value = freq
      g.gain.setValueAtTime(gain, t)
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
      o.connect(g)
      g.connect(ac.destination)
      o.start(t)
      o.stop(t + dur + 0.005)
    } catch {}
  }, [])

  const click = useCallback(() => {
    try {
      unlockAudio()
      const ac = acRef.current
      if (!ac) return
      const play = () => beep(1800, 0.1, 0.03)
      if (ac.state === 'running') play()
      else ac.resume().then(play).catch(() => {})
    } catch {}
  }, [beep, unlockAudio])

  useEffect(() => {
    let touchMoved = false
    let lastTick = 0
    let lastY = window.scrollY
    let scrollAcc = 0
    let lastScrollTick = 0

    const tryResume = () => {
      const ac = acRef.current
      if (onRef.current && ac && ac.state !== 'closed' && ac.state !== 'running') {
        ac.resume().catch(() => {})
      }
    }

    const tick = () => {
      if (!onRef.current) return
      const n = Date.now()
      if (n - lastTick < 60) return
      lastTick = n
      click()
      navigator.vibrate?.(10)
    }

    const onTouchStart = () => {
      touchMoved = false
    }
    const onTouchMove = () => {
      touchMoved = true
    }
    const onTouchEnd = () => {
      // スクロール中は解錠しない（原本と同じ。指を滑らせただけで鳴らさないため）
      if (touchMoved) tryResume()
      else unlockAudio()
    }
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null
      if (el?.closest('[data-fx-toggle]')) return
      if (el?.closest('a,button,summary,label,[role="button"]')) tick()
      unlockAudio()
    }
    const onScroll = () => {
      if (!onRef.current) return
      const y = window.scrollY
      scrollAcc += Math.abs(y - lastY)
      lastY = y
      const n = Date.now()
      if (scrollAcc >= 48 && n - lastScrollTick >= 90) {
        scrollAcc = 0
        lastScrollTick = n
        const ac = acRef.current
        if (ac?.state === 'running') beep(2500, 0.035, 0.015)
      }
    }
    const onVisible = () => {
      if (!document.hidden) tryResume()
    }

    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchmove', onTouchMove, { passive: true })
    document.addEventListener('touchend', onTouchEnd, { passive: true })
    document.addEventListener('click', onClick)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pageshow', tryResume)
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
      document.removeEventListener('click', onClick)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pageshow', tryResume)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [beep, click, unlockAudio])

  const toggle = () => {
    const next = !on
    onRef.current = next
    setFx(next)
    // ONにした瞬間のタップで解錠する（iOSはこのタイミングを逃すと鳴らない）
    if (next) {
      unlockAudio()
      click()
      navigator.vibrate?.(10)
    }
  }

  return (
    <button
      type="button"
      data-fx-toggle
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? '操作音をオフにする' : '操作音をオンにする'}
      title={on ? '操作音 ON' : '操作音 OFF'}
      className="inline-flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
    >
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  )
}
