'use client'

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'

type IconName =
  | 'home'
  | 'spark'
  | 'book'
  | 'chart'
  | 'headphones'
  | 'sun'
  | 'droplet'
  | 'wind'
  | 'pen'
  | 'arrow'
  | 'send'
  | 'play'
  | 'pause'
  | 'check'
  | 'leaf'
  | 'close'
  | 'back'
  | 'minimize'
  | 'plus'
  | 'mic'
  | 'stop'

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    spark: (
      <>
        <path d="M12 3c.7 4.1 2.9 6.3 7 7-4.1.7-6.3 2.9-7 7-.7-4.1-2.9-6.3-7-7 4.1-.7 6.3-2.9 7-7Z" />
        <path d="M19 16v5M16.5 18.5h5" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22Z" />
        <path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22Z" />
      </>
    ),
    chart: (
      <>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </>
    ),
    headphones: (
      <>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <path d="M4 14h3v7H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 1-2ZM20 14h-3v7h2a2 2 0 0 0 2-2v-3a2 2 0 0 0-1-2Z" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
    droplet: <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z" />,
    wind: (
      <>
        <path d="M3 8h11a2.5 2.5 0 1 0-2.5-2.5" />
        <path d="M3 12h16a2 2 0 1 1-2 2" />
        <path d="M3 16h8a2.5 2.5 0 1 1-2.5 2.5" />
      </>
    ),
    pen: (
      <>
        <path d="m15 5 4 4L8 20l-5 1 1-5Z" />
        <path d="m13 7 4 4" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14M14 7l5 5-5 5" />
      </>
    ),
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </>
    ),
    play: <path d="m8 5 11 7-11 7Z" />,
    pause: (
      <>
        <path d="M9 5v14M15 5v14" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    leaf: (
      <>
        <path d="M20 4C11 4 5 8 5 14c0 3 2 5 5 5 6 0 10-6 10-15Z" />
        <path d="M4 21c3-5 7-8 12-11" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    minimize: <path d="M5 12h14" />,
    plus: <path d="M12 5v14M5 12h14" />,
    mic: (
      <>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />
      </>
    ),
    stop: <rect x="6" y="6" width="12" height="12" rx="2" />,
    back: (
      <>
        <path d="m15 18-6-6 6-6" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

const moods = [
  { label: 'Low', mouth: 'M9 17c1.8-1.7 4.2-1.7 6 0' },
  { label: 'Meh', mouth: 'M9 16h6' },
  { label: 'Okay', mouth: 'M9 15.5c1.8.7 4.2.7 6 0' },
  { label: 'Good', mouth: 'M8.5 15c2 2.4 5 2.4 7 0' },
  { label: 'Great', mouth: 'M8 14c2.2 3.5 5.8 3.5 8 0' },
]

function MoodFace({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" />
      <path d="M8.5 9.5h.01M15.5 9.5h.01" />
      <path d={moods[index].mouth} />
    </svg>
  )
}

function Tree({ growth }: { growth: number }) {
  return (
    <div className="tree-wrap" style={{ '--growth': `${growth}%` } as React.CSSProperties}>
      <span className="tree-spark spark-one" />
      <span className="tree-spark spark-two" />
      <svg
        className="tree"
        viewBox="0 0 260 240"
        role="img"
        aria-label={`Your tree is ${growth}% grown`}
      >
        <defs>
          <linearGradient id="pot" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#e6b99a" />
            <stop offset="1" stopColor="#c98260" />
          </linearGradient>
          <linearGradient id="trunk" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#7d5840" />
            <stop offset=".5" stopColor="#a77652" />
            <stop offset="1" stopColor="#6d4b39" />
          </linearGradient>
          <radialGradient id="leaf" cx=".35" cy=".3">
            <stop stopColor="#a9cf87" />
            <stop offset="1" stopColor="#5d8c64" />
          </radialGradient>
          <filter id="shadow">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodOpacity=".12" />
          </filter>
        </defs>
        <ellipse cx="130" cy="220" rx="62" ry="10" fill="#425642" opacity=".1" />
        <g className="tree-growth">
          <path
            d="M128 185c-2-42 2-79-7-114M129 147c19-20 31-42 36-65M125 128c-18-13-30-28-37-45M129 109c10-20 12-38 10-54"
            stroke="url(#trunk)"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <g fill="url(#leaf)" filter="url(#shadow)">
            <circle cx="76" cy="75" r="28" />
            <circle cx="101" cy="52" r="31" />
            <circle cx="135" cy="47" r="34" />
            <circle cx="169" cy="65" r="32" />
            <circle cx="187" cy="92" r="26" />
            <circle cx="155" cy="96" r="37" />
            <circle cx="114" cy="92" r="37" />
            <circle cx="82" cy="106" r="25" />
            <circle cx="137" cy="23" r="22" />
          </g>
          <g fill="#bddb94" opacity=".85">
            <circle cx="102" cy="31" r="7" />
            <circle cx="173" cy="49" r="6" />
            <circle cx="82" cy="86" r="5" />
            <circle cx="147" cy="77" r="6" />
          </g>
        </g>
        <g filter="url(#shadow)">
          <path d="M83 174h94l-10 55H93Z" fill="url(#pot)" />
          <path d="M79 171c0-5 4-9 9-9h84c5 0 9 4 9 9v10H79Z" fill="#efc4a3" />
          <path d="M96 191h68" stroke="#bb7658" strokeWidth="2" opacity=".35" />
        </g>
      </svg>
    </div>
  )
}

const days = [
  { d: 'M', h: 42 },
  { d: 'T', h: 55 },
  { d: 'W', h: 38 },
  { d: 'T', h: 72 },
  { d: 'F', h: 64 },
  { d: 'S', h: 82 },
  { d: 'S', h: 70 },
]

const spotifyPlaylists = [
  {
    name: 'Peaceful Piano',
    detail: 'Soft instrumental focus',
    id: '37i9dQZF1DX4sWSpwq3LiO',
  },
  {
    name: 'Deep Focus',
    detail: 'Atmospheric concentration',
    id: '37i9dQZF1DWZeKCadgRdKQ',
  },
  {
    name: 'Lofi Beats',
    detail: 'Warm beats to settle in',
    id: '37i9dQZF1DWWQRwui0ExPn',
  },
  {
    name: 'White Noise',
    detail: 'A steady, quiet backdrop',
    id: '37i9dQZF1DWUZ5bk6qqDSy',
  },
]

type SpotifyPlaylist = (typeof spotifyPlaylists)[number]

type JournalEntry = {
  id: string
  text: string
  createdAt: string
  wordCount: number
  audioData?: string
}

const JOURNAL_STORAGE = 'grow-your-mind-journals'
const PLAYLIST_STORAGE = 'grow-your-mind-playlists'

function loadLocal<T>(key: string): T | null {
  try {
    const value = window.localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : null
  } catch {
    return null
  }
}

function saveLocal(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export default function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [view, setView] = useState('home')
  const [growth, setGrowth] = useState(68)
  const [mood, setMood] = useState<number | null>(null)
  const [toast, setToast] = useState('')
  const [journal, setJournal] = useState('')
  const [journalMode, setJournalMode] = useState<'write' | 'saved'>('write')
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])
  const [voiceNote, setVoiceNote] = useState('')
  const [voiceError, setVoiceError] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [breathing, setBreathing] = useState(false)
  const [breathSeconds, setBreathSeconds] = useState(60)
  const [customPlaylists, setCustomPlaylists] = useState<SpotifyPlaylist[]>([])
  const [playlist, setPlaylist] = useState<SpotifyPlaylist>(spotifyPlaylists[0])
  const [playlistName, setPlaylistName] = useState('')
  const [playlistUrl, setPlaylistUrl] = useState('')
  const [playlistError, setPlaylistError] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      from: 'ai',
      text: 'Hi Alex. I’m here to listen, reflect, or help you gently untangle what’s on your mind.',
    },
  ])

  useEffect(() => {
    setJournalEntries(loadLocal<JournalEntry[]>(JOURNAL_STORAGE) ?? [])
    setCustomPlaylists(loadLocal<SpotifyPlaylist[]>(PLAYLIST_STORAGE) ?? [])
  }, [])

  useEffect(() => {
    if (!isRecording) return
    const timer = window.setInterval(() => {
      setRecordingSeconds((seconds) => {
        if (seconds >= 44 && recorderRef.current?.state === 'recording') {
          recorderRef.current.stop()
        }
        return Math.min(45, seconds + 1)
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [isRecording])

  useEffect(() => {
    if (!breathing || breathSeconds <= 0) return
    const timer = window.setInterval(() => setBreathSeconds((s) => s - 1), 1000)
    return () => window.clearInterval(timer)
  }, [breathing, breathSeconds])

  useEffect(() => {
    if (breathSeconds === 0 && breathing) {
      setBreathing(false)
      setBreathSeconds(60)
      reward('A mindful minute added', 4)
    }
  }, [breathSeconds, breathing])

  const breathPhase = useMemo(() => {
    const elapsed = 60 - breathSeconds
    return elapsed % 12 < 4 ? 'Breathe in' : elapsed % 12 < 8 ? 'Hold gently' : 'Breathe out'
  }, [breathSeconds])

  function reward(messageText: string, amount: number) {
    setGrowth((g) => Math.min(100, g + amount))
    setToast(messageText)
    window.setTimeout(() => setToast(''), 2600)
  }

  function chooseMood(index: number) {
    if (mood !== null) return
    setMood(index)
    reward('Check-in complete — your tree grew', 3)
  }

  function saveJournal() {
    if (!journal.trim() && !voiceNote) return
    const cleanText = journal.trim()
    const words = cleanText ? cleanText.split(/\s+/).length : 0
    const entry: JournalEntry = {
      id: `${Date.now()}`,
      text: cleanText,
      createdAt: new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }).format(new Date()),
      wordCount: words,
      audioData: voiceNote || undefined,
    }
    const nextEntries = [entry, ...journalEntries]
    if (!saveLocal(JOURNAL_STORAGE, nextEntries)) {
      setToast('This voice note is too large to save. Try a shorter one.')
      window.setTimeout(() => setToast(''), 3000)
      return
    }
    setJournalEntries(nextEntries)
    setJournal('')
    setVoiceNote('')
    setRecordingSeconds(0)
    setJournalMode('saved')
    reward('Reflection saved — a new leaf appeared', 5)
  }

  async function startVoiceRecording() {
    setVoiceError('')
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      setVoiceError('Voice notes are not supported in this browser.')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const chunks: Blob[] = []
      streamRef.current = stream
      recorderRef.current = recorder
      recorder.ondataavailable = (event) => {
        if (event.data.size) chunks.push(event.data)
      }
      recorder.onstop = () => {
        const audio = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' })
        const reader = new FileReader()
        reader.onloadend = () => setVoiceNote(String(reader.result))
        reader.readAsDataURL(audio)
        stream.getTracks().forEach((track) => track.stop())
        setIsRecording(false)
      }
      setVoiceNote('')
      setRecordingSeconds(0)
      setIsRecording(true)
      recorder.start()
    } catch {
      setVoiceError('Microphone access is needed to record a voice note.')
    }
  }

  function stopVoiceRecording() {
    if (recorderRef.current?.state === 'recording') recorderRef.current.stop()
  }

  function addSpotifyPlaylist(event: FormEvent) {
    event.preventDefault()
    const match = playlistUrl
      .trim()
      .match(/(?:open\.spotify\.com\/playlist\/|spotify:playlist:)([A-Za-z0-9]+)/)
    if (!match) {
      setPlaylistError('Paste a valid Spotify playlist link.')
      return
    }
    if ([...spotifyPlaylists, ...customPlaylists].some((item) => item.id === match[1])) {
      setPlaylistError('That playlist is already in your library.')
      return
    }
    const newPlaylist: SpotifyPlaylist = {
      id: match[1],
      name: playlistName.trim() || 'My Spotify playlist',
      detail: 'Added by you',
    }
    const nextPlaylists = [...customPlaylists, newPlaylist]
    setCustomPlaylists(nextPlaylists)
    setPlaylist(newPlaylist)
    setPlaylistName('')
    setPlaylistUrl('')
    setPlaylistError('')
    saveLocal(PLAYLIST_STORAGE, nextPlaylists)
    setToast('Playlist added to your focus library')
    window.setTimeout(() => setToast(''), 2600)
  }

  function sendMessage(event: FormEvent) {
    event.preventDefault()
    if (!message.trim()) return
    const text = message.trim()
    setMessages((m) => [...m, { from: 'user', text }])
    setMessage('')
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: 'ai',
          text: 'That sounds like a lot to carry. What part of it feels most present in your body right now?',
        },
      ])
    }, 650)
  }

  const nav = [
    { id: 'home', icon: 'home' as IconName, label: 'Home' },
    { id: 'reflect', icon: 'spark' as IconName, label: 'Reflect' },
    { id: 'journal', icon: 'book' as IconName, label: 'Journal' },
    { id: 'history', icon: 'chart' as IconName, label: 'History' },
    { id: 'focus', icon: 'headphones' as IconName, label: 'Focus' },
  ]

  if (collapsed) {
    return (
      <main className="desktop desktop-collapsed">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <button
          className="app-launcher"
          onClick={() => setCollapsed(false)}
          aria-label="Open Grow Your Mind"
          title="Open Grow Your Mind"
        >
          <Icon name="leaf" size={28} />
          <span className="launcher-pulse" />
          <span className="launcher-tooltip">Take a mindful moment</span>
        </button>
      </main>
    )
  }

  return (
    <main className="desktop">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="app-window" aria-label="Grow Your Mind wellbeing companion">
        {toast && (
          <div className="toast">
            <span>
              <Icon name="check" size={14} />
            </span>
            {toast}
          </div>
        )}
        <aside className="sidebar">
          <button
            className="brand-mark"
            onClick={() => setView('home')}
            aria-label="Grow Your Mind home"
          >
            <Icon name="leaf" size={22} />
          </button>
          <nav>
            {nav.map((item) => (
              <button
                key={item.id}
                className={view === item.id ? 'active' : ''}
                onClick={() => setView(item.id)}
                aria-label={item.label}
                title={item.label}
              >
                <Icon name={item.icon} size={20} />
              </button>
            ))}
          </nav>
          <button
            className="sidebar-collapse"
            onClick={() => setCollapsed(true)}
            aria-label="Hide Grow Your Mind"
            title="Hide to desktop"
          >
            <Icon name="minimize" size={19} />
          </button>
        </aside>

        <div className="app-content">
          {view === 'home' && (
            <div className="screen home-screen">
              <header className="topbar">
                <div>
                  <span className="eyebrow">MONDAY, MAY 19</span>
                  <h2>Good morning, Alex</h2>
                </div>
                <div className="streak">
                  <Icon name="sun" size={16} />
                  <span>
                    <strong>6</strong> day streak
                  </span>
                </div>
              </header>

              <section className="tree-card">
                <div className="tree-copy">
                  <span className="status-dot" />
                  YOUR MIND GARDEN
                </div>
                <Tree growth={growth} />
                <div className="growth-copy">
                  <div>
                    <span>Growing steadily</span>
                    <strong>{growth}%</strong>
                  </div>
                  <div className="progress">
                    <span style={{ width: `${growth}%` }} />
                  </div>
                  <p>Two more mindful moments to sprout a new branch.</p>
                </div>
              </section>

              <section className="mood-card">
                <div className="section-title">
                  <div>
                    <span>Daily check-in</span>
                    <h3>How are you feeling?</h3>
                  </div>
                  {mood !== null && (
                    <span className="done-label">
                      <Icon name="check" size={13} /> Done
                    </span>
                  )}
                </div>
                <div className="moods">
                  {moods.map((item, index) => (
                    <button
                      key={item.label}
                      className={mood === index ? 'selected' : ''}
                      onClick={() => chooseMood(index)}
                      disabled={mood !== null && mood !== index}
                    >
                      <MoodFace index={index} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="quick-section">
                <div className="section-title">
                  <div>
                    <span>Give yourself a moment</span>
                    <h3>Quick care</h3>
                  </div>
                </div>
                <div className="quick-grid">
                  <button
                    onClick={() => {
                      setBreathing(true)
                      setView('breathe')
                    }}
                  >
                    <span className="quick-icon sage">
                      <Icon name="wind" />
                    </span>
                    <span>
                      <strong>Breathe</strong>
                      <small>1 minute</small>
                    </span>
                    <Icon name="arrow" size={16} />
                  </button>
                  <button onClick={() => setView('journal')}>
                    <span className="quick-icon peach">
                      <Icon name="pen" />
                    </span>
                    <span>
                      <strong>Reflect</strong>
                      <small>Open journal</small>
                    </span>
                    <Icon name="arrow" size={16} />
                  </button>
                </div>
              </section>
            </div>
          )}

          {view === 'breathe' && (
            <div className="screen breathe-screen">
              <button
                className="back-button"
                onClick={() => {
                  setBreathing(false)
                  setView('home')
                }}
              >
                <Icon name="back" size={18} /> Back
              </button>
              <div className="centered-flow">
                <span className="eyebrow">ONE MINUTE RESET</span>
                <h2>Make space to breathe</h2>
                <p>Follow the circle at a pace that feels comfortable.</p>
                <div className={`breath-orb ${breathing ? 'is-breathing' : ''}`}>
                  <div>
                    <strong>{breathing ? breathPhase : 'Ready?'}</strong>
                    <span>{breathSeconds}s</span>
                  </div>
                </div>
                <button className="primary-button" onClick={() => setBreathing((b) => !b)}>
                  <Icon name={breathing ? 'pause' : 'play'} size={17} />
                  {breathing ? 'Pause' : 'Begin breathing'}
                </button>
              </div>
            </div>
          )}

          {view === 'journal' && (
            <div className="screen journal-screen">
              <header className="simple-header">
                <div>
                  <span className="eyebrow">PRIVATE ON THIS DEVICE</span>
                  <h2>{journalMode === 'write' ? 'What’s on your mind?' : 'Your reflections'}</h2>
                  <p>
                    {journalMode === 'write'
                      ? 'Write without editing yourself. This space is yours.'
                      : 'A quiet record of the moments you made space for yourself.'}
                  </p>
                </div>
                <span className="date-chip">{journalEntries.length} saved</span>
              </header>
              <div className="journal-tabs">
                <button
                  className={journalMode === 'write' ? 'active' : ''}
                  onClick={() => setJournalMode('write')}
                >
                  Write
                </button>
                <button
                  className={journalMode === 'saved' ? 'active' : ''}
                  onClick={() => setJournalMode('saved')}
                >
                  Saved reflections <span>{journalEntries.length}</span>
                </button>
              </div>
              {journalMode === 'write' ? (
                <>
                  <div className="prompt-card">
                    <Icon name="spark" size={18} />
                    <span>
                      <small>TODAY’S PROMPT</small>What do you need a little more of today?
                    </span>
                  </div>
                  <div className={`voice-note ${isRecording ? 'recording' : ''}`}>
                    <div className="voice-note-copy">
                      <span className="voice-note-icon">
                        <Icon name="mic" size={17} />
                      </span>
                      <div>
                        <strong>
                          {isRecording ? 'Recording your reflection' : 'Add a voice note'}
                        </strong>
                        <small>
                          {isRecording
                            ? `${recordingSeconds}s of 45s`
                            : voiceNote
                              ? 'Ready to save with your reflection'
                              : 'Speak freely for up to 45 seconds'}
                        </small>
                      </div>
                    </div>
                    {voiceNote ? (
                      <div className="voice-preview">
                        <audio controls src={voiceNote}>
                          <track kind="captions" />
                        </audio>
                        <button
                          onClick={() => {
                            setVoiceNote('')
                            setRecordingSeconds(0)
                          }}
                          aria-label="Discard voice note"
                          title="Discard voice note"
                        >
                          <Icon name="close" size={15} />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="record-button"
                        onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                      >
                        <Icon name={isRecording ? 'stop' : 'mic'} size={14} />
                        {isRecording ? 'Stop' : 'Record'}
                      </button>
                    )}
                    {voiceError && <span className="voice-error">{voiceError}</span>}
                  </div>
                  <textarea
                    value={journal}
                    onChange={(e) => setJournal(e.target.value)}
                    placeholder="Write here, record a note, or do both..."
                    autoFocus
                  />
                  <div className="journal-footer">
                    <span>{journal.trim() ? journal.trim().split(/\s+/).length : 0} words</span>
                    <button
                      className="primary-button"
                      onClick={saveJournal}
                      disabled={!journal.trim() && !voiceNote}
                    >
                      <Icon name="leaf" size={17} /> Save reflection
                    </button>
                  </div>
                </>
              ) : (
                <div className="journal-library">
                  {journalEntries.length ? (
                    journalEntries.map((entry) => (
                      <article key={entry.id} className="journal-entry">
                        <div>
                          <span>{entry.createdAt}</span>
                          <small>
                            {entry.wordCount ? `${entry.wordCount} words` : 'Voice reflection'}
                          </small>
                        </div>
                        {entry.text && <p>{entry.text}</p>}
                        {entry.audioData && (
                          <audio className="saved-audio" controls src={entry.audioData}>
                            <track kind="captions" />
                          </audio>
                        )}
                      </article>
                    ))
                  ) : (
                    <div className="journal-empty">
                      <span>
                        <Icon name="book" size={25} />
                      </span>
                      <h3>Your journal is ready</h3>
                      <p>Saved reflections will stay here on this device.</p>
                      <button className="primary-button" onClick={() => setJournalMode('write')}>
                        Write your first entry
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {view === 'reflect' && (
            <div className="screen chat-screen">
              <header className="chat-header">
                <div className="ai-avatar">
                  <Icon name="spark" size={19} />
                  <i />
                </div>
                <div>
                  <h2>Reflect with Willow</h2>
                  <span>
                    <i /> Here with you
                  </span>
                </div>
              </header>
              <div className="chat-intro">
                <span>SPACE TO UNLOAD</span>
                <h3>You don’t have to make it sound okay.</h3>
                <p>Share what’s on your mind. Willow can help you reflect, never diagnose.</p>
              </div>
              <div className="messages">
                {messages.map((item, i) => (
                  <div key={i} className={`message ${item.from}`}>
                    {item.text}
                  </div>
                ))}
              </div>
              <form className="chat-form" onSubmit={sendMessage}>
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type whatever’s on your mind..."
                />
                <button aria-label="Send message">
                  <Icon name="send" size={17} />
                </button>
              </form>
              <small className="ai-note">
                AI can make mistakes. This is not a substitute for professional care.
              </small>
            </div>
          )}

          {view === 'focus' && (
            <div className="screen focus-screen">
              <header className="simple-header">
                <div>
                  <span className="eyebrow">SPOTIFY FOCUS</span>
                  <h2>Settle into your flow</h2>
                  <p>Real Spotify playlists for focus, rest, or quiet company.</p>
                </div>
                <a
                  className="spotify-link"
                  href={`https://open.spotify.com/playlist/${playlist.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="spotify-mark">
                    <i />
                    <i />
                    <i />
                  </span>
                  Open Spotify
                </a>
              </header>
              <div className="spotify-player">
                <iframe
                  key={playlist.id}
                  title={`${playlist.name} on Spotify`}
                  src={`https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator&theme=0`}
                  width="100%"
                  height="352"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
              <div className="spotify-library-title">
                <div>
                  <span>CHOOSE A SOUND</span>
                  <strong>Focus library</strong>
                </div>
                <small>Powered by Spotify</small>
              </div>
              <form className="playlist-form" onSubmit={addSpotifyPlaylist}>
                <div className="playlist-form-heading">
                  <span>
                    <Icon name="plus" size={15} />
                  </span>
                  <div>
                    <strong>Add your own playlist</strong>
                    <small>Paste any public Spotify playlist link</small>
                  </div>
                </div>
                <div className="playlist-fields">
                  <input
                    value={playlistName}
                    onChange={(event) => setPlaylistName(event.target.value)}
                    placeholder="Playlist name (optional)"
                    aria-label="Playlist name"
                  />
                  <div>
                    <input
                      value={playlistUrl}
                      onChange={(event) => {
                        setPlaylistUrl(event.target.value)
                        setPlaylistError('')
                      }}
                      placeholder="https://open.spotify.com/playlist/..."
                      aria-label="Spotify playlist link"
                    />
                    <button type="submit" aria-label="Add Spotify playlist">
                      Add
                    </button>
                  </div>
                  {playlistError && <small className="playlist-error">{playlistError}</small>}
                </div>
              </form>
              <div className="sound-list">
                {[...spotifyPlaylists, ...customPlaylists].map((sound, index) => (
                  <button
                    key={sound.id}
                    className={playlist.id === sound.id ? 'selected' : ''}
                    onClick={() => setPlaylist(sound)}
                  >
                    <span className={`sound-thumb s${(index % 4) + 1}`}>
                      <Icon
                        name={index < 2 ? 'droplet' : index === 2 ? 'wind' : 'headphones'}
                        size={17}
                      />
                    </span>
                    <span>
                      <strong>{sound.name}</strong>
                      <small>{sound.detail}</small>
                    </span>
                    {playlist.id === sound.id ? (
                      <span className="spotify-playing">PLAYING</span>
                    ) : (
                      <Icon name="play" size={15} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {view === 'history' && (
            <div className="screen history-screen">
              <header className="simple-header">
                <div>
                  <span className="eyebrow">YOUR PATTERNS</span>
                  <h2>A week in your garden</h2>
                  <p>Notice your rhythms without judging them.</p>
                </div>
                <span className="date-chip">This week</span>
              </header>
              <div className="summary-grid">
                <div>
                  <span>Mindful moments</span>
                  <strong>14</strong>
                  <small>+4 from last week</small>
                </div>
                <div>
                  <span>Average mood</span>
                  <strong>Good</strong>
                  <small>Steady this week</small>
                </div>
              </div>
              <section className="chart-card">
                <div className="chart-title">
                  <div>
                    <span>Mood & care</span>
                    <strong>Daily wellbeing</strong>
                  </div>
                  <span className="legend">
                    <i /> Care moments
                  </span>
                </div>
                <div className="bars">
                  {days.map((day, i) => (
                    <div key={i}>
                      <span className={i === 5 ? 'today' : ''} style={{ height: `${day.h}%` }} />
                      <small>{day.d}</small>
                    </div>
                  ))}
                </div>
              </section>
              <section className="insight">
                <span>
                  <Icon name="leaf" size={19} />
                </span>
                <div>
                  <small>GENTLE INSIGHT</small>
                  <strong>You tend to feel lighter on days you journal.</strong>
                  <p>Even a few honest lines seem to make a difference.</p>
                </div>
              </section>
              <section className="recent">
                <h3>Recent moments</h3>
                <div>
                  <span className="quick-icon sage">
                    <Icon name="wind" size={17} />
                  </span>
                  <p>
                    <strong>Breathing reset</strong>
                    <small>Today · 8:42 AM</small>
                  </p>
                  <b>+4</b>
                </div>
                <div>
                  <span className="quick-icon peach">
                    <Icon name="pen" size={17} />
                  </span>
                  <p>
                    <strong>Evening reflection</strong>
                    <small>Yesterday · 9:16 PM</small>
                  </p>
                  <b>+5</b>
                </div>
              </section>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
