import { useState, useRef, useEffect } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

const ITEMS = [
  { id: '01', ko: '화분', img: '01.화분.png', emoji: '🪴', rarity: 'common' },
  { id: '02', ko: '길냥이', img: '02.길냥이.png', emoji: '🐱', rarity: 'common' },
  { id: '03', ko: '하얀꽃', img: '03.하얀꽃.png', emoji: '🌸', rarity: 'common' },
  { id: '04', ko: '담쟁이넝쿨', img: '04.담쟁이넝쿨.png', emoji: '🌿', rarity: 'common' },
  { id: '05', ko: '산책중강아지', img: '05.산책중강아지.png', emoji: '🐕', rarity: 'common' },
  { id: '06', ko: '비둘기', img: '06.비둘기.png', emoji: '🕊️', rarity: 'common' },
  { id: '07', ko: '참새', img: '07.참새.png', emoji: '🐦', rarity: 'common' },
  { id: '08', ko: '개미', img: '08.개미.png', emoji: '🐜', rarity: 'common' },
  { id: '09', ko: '오리', img: '09.오리.png', emoji: '🦆', rarity: 'common' },
  { id: '10', ko: '민들레', img: '10.민들레.png', emoji: '🌼', rarity: 'common' },
  { id: '11', ko: '라바콘', img: '11.라바콘.png', emoji: '🚧', rarity: 'common' },
  { id: '12', ko: '빨래줄', img: '12.빨래줄.png', emoji: '👕', rarity: 'common' },
  { id: '13', ko: '벽화', img: '13.벽화.png', emoji: '🎨', rarity: 'common' },
  { id: '14', ko: '산스장', img: '14.산스장.png', emoji: '🏋️', rarity: 'common' },
  { id: '15', ko: '황금색마티즈', img: '15.황금색마티즈.png', emoji: '🚗', rarity: 'uncommon' },
  { id: '16', ko: '붕어빵가게', img: '16.붕어빵가게.png', emoji: '🐟', rarity: 'common' },
  { id: '17', ko: '복권당첨간판', img: null, emoji: '🎰', rarity: 'uncommon' },
  { id: '18', ko: '드르륵칵', img: '18.드르륵칵.png', emoji: '🚪', rarity: 'rare' },
  { id: '19', ko: '공사중가림막', img: null, emoji: '🏗️', rarity: 'common' },
  { id: '20', ko: '우편함', img: '20.우편함.png', emoji: '📬', rarity: 'common' },
  { id: '21', ko: '소화전', img: '21.소화전.png', emoji: '🔴', rarity: 'common' },
  { id: '22', ko: '옥상물탱크', img: null, emoji: '🏢', rarity: 'common' },
  { id: '23', ko: '따릉이', img: '23.따릉이.png', emoji: '🚲', rarity: 'common' },
  { id: '24', ko: '킥보드', img: null, emoji: '🛴', rarity: 'common' },
  { id: '25', ko: '리어카', img: null, emoji: '🛒', rarity: 'uncommon' },
  { id: '26', ko: '경찰차', img: null, emoji: '🚔', rarity: 'uncommon' },
  { id: '27', ko: '소방차', img: null, emoji: '🚒', rarity: 'uncommon' },
  { id: '28', ko: '인형뽑기가게', img: null, emoji: '🎮', rarity: 'common' },
  { id: '29', ko: '이발소간판', img: null, emoji: '💈', rarity: 'uncommon' },
  { id: '30', ko: '폐업한가게', img: null, emoji: '🏚️', rarity: 'common' },
  { id: '31', ko: '벤치', img: null, emoji: '🪑', rarity: 'common' },
  { id: '32', ko: '포장마차', img: null, emoji: '🏮', rarity: 'common' },
  { id: '33', ko: '자판기', img: null, emoji: '📦', rarity: 'common' },
  { id: '34', ko: '편의점파라솔', img: null, emoji: '☂️', rarity: 'common' },
  { id: '35', ko: '물웅덩이', img: null, emoji: '💧', rarity: 'common' },
  { id: '36', ko: '횡단보도노란불', img: null, emoji: '🚦', rarity: 'common' },
  { id: '37', ko: '맨홀뚜껑', img: null, emoji: '⚙️', rarity: 'common' },
  { id: '38', ko: '버려진의자', img: null, emoji: '🪑', rarity: 'uncommon' },
  { id: '39', ko: '버려진거울', img: null, emoji: '🪞', rarity: 'uncommon' },
  { id: '40', ko: '파란대문', img: null, emoji: '🚪', rarity: 'common' },
  { id: '41', ko: '지하철입구', img: null, emoji: '🚇', rarity: 'common' },
  { id: '42', ko: '주차금지표지판', img: null, emoji: '🚫', rarity: 'common' },
  { id: '43', ko: '바람개비', img: null, emoji: '🌀', rarity: 'uncommon' },
  { id: '44', ko: '공중전화부스', img: null, emoji: '☎️', rarity: 'rare' },
  { id: '45', ko: '놀이터흔들목마', img: null, emoji: '🎠', rarity: 'uncommon' },
  { id: '46', ko: '동상', img: null, emoji: '🗿', rarity: 'uncommon' },
  { id: '47', ko: '핑크색보도블록', img: null, emoji: '🌸', rarity: 'uncommon' },
  { id: '48', ko: '어린이보호구역', img: null, emoji: '🏫', rarity: 'common' },
  { id: '49', ko: '시계', img: null, emoji: '🕐', rarity: 'common' },
  { id: '50', ko: '쇼핑카트', img: null, emoji: '🛒', rarity: 'rare' },
  { id: '51', ko: '요구르트아주머니카트', img: null, emoji: '🥛', rarity: 'legendary' },
  { id: '52', ko: '챱츄리버', img: '52.챱츄리버.png', emoji: '🐕‍🦺', rarity: 'legendary' },
  { id: '53', ko: '고양이밥그릇', img: null, emoji: '🍚', rarity: 'common' },
  { id: '54', ko: '버려진우산', img: null, emoji: '☂️', rarity: 'uncommon' },
  { id: '55', ko: '네잎클로버', img: null, emoji: '🍀', rarity: 'legendary' },
  { id: '56', ko: '무지개', img: null, emoji: '🌈', rarity: 'legendary' },
  { id: '57', ko: '버려진신발', img: null, emoji: '👟', rarity: 'uncommon' },
]

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => ({
  id: `L${l}`, ko: `문자 ${l}`, img: null, emoji: l, rarity: 'common', isSpecial: true
}))
const NUMBERS = '0123456789'.split('').map(n => ({
  id: `N${n}`, ko: `숫자 ${n}`, img: null, emoji: n, rarity: 'common', isSpecial: true
}))
const ALL_ITEMS = [...ITEMS, ...LETTERS, ...NUMBERS]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function generateBoard(mode) {
  const size = mode === 'normal' ? 3 : 5
  const total = size * size
  const letter = LETTERS[Math.floor(Math.random() * LETTERS.length)]
  const number = NUMBERS[Math.floor(Math.random() * NUMBERS.length)]
  const regular = shuffle([...ITEMS]).slice(0, total - 2)
  return shuffle([...regular, letter, number])
}

function getAllLines(size) {
  const lines = []
  for (let r = 0; r < size; r++)
    lines.push(Array.from({ length: size }, (_, c) => r * size + c))
  for (let c = 0; c < size; c++)
    lines.push(Array.from({ length: size }, (_, r) => r * size + c))
  lines.push(Array.from({ length: size }, (_, i) => i * size + i))
  lines.push(Array.from({ length: size }, (_, i) => i * size + (size - 1 - i)))
  return lines
}

function countBingos(checked, size) {
  return getAllLines(size).filter(line => line.every(i => checked.has(i))).length
}

function isNearBingo(checked, size) {
  return getAllLines(size).some(line => line.filter(i => checked.has(i)).length === size - 1)
}

function getKSTDate() {
  return new Date().toLocaleDateString('ko-KR', {
    timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit'
  }).replace(/\. /g, '-').replace('.', '')
}

function getAppInstallDate() {
  let d = localStorage.getItem('dooribun_install_date')
  if (!d) { d = getKSTDate(); localStorage.setItem('dooribun_install_date', d) }
  return d
}

function getDatesRange(from, to, futureDays = 4) {
  const dates = []
  const start = new Date(from.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1/$2/$3'))
  const end = new Date(to.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1/$2/$3'))
  end.setDate(end.getDate() + futureDays)
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(d.toLocaleDateString('ko-KR', {
      timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit'
    }).replace(/\. /g, '-').replace('.', ''))
  }
  return dates
}

const STORAGE_KEY = 'dooribun_history'
function saveRecord(record) {
  const history = loadHistory()
  history.push(record)
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(history)) }
  catch (e) { history.shift(); localStorage.setItem(STORAGE_KEY, JSON.stringify(history)) }
}
function loadHistory() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}

const MESSAGES = {
  1: '시작이 좋아요! ✨',
  3: '왠지 오늘 느낌이 좋은데요 😊',
  nearBingo: '고지가 얼마 안남았어요! 🎯',
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [mode, setMode] = useState('normal')
  const [board, setBoard] = useState([])
  const [checked, setChecked] = useState(new Set())
  const [photos, setPhotos] = useState({})
  const [bingos, setBingos] = useState(0)
  const [message, setMessage] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [showBingoPopup, setShowBingoPopup] = useState(false)
  const [showRestartConfirm, setShowRestartConfirm] = useState(false)
  const [history, setHistory] = useState([])
  const [selectedRecord, setSelectedRecord] = useState(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const size = mode === 'normal' ? 3 : 5

  function startGame() {
    setBoard(generateBoard(mode))
    setChecked(new Set())
    setPhotos({})
    setBingos(0)
    setMessage('')
    setShowBingoPopup(false)
    setScreen('game')
  }

  function tapItem(idx) {
    if (checked.has(idx)) return
    setSelectedIdx(idx)
    setScreen('camera')
  }

  function checkItem(idx, photo) {
    const nc = new Set(checked)
    nc.add(idx)
    const np = { ...photos }
    if (photo) np[idx] = photo
    setChecked(nc)
    setPhotos(np)
    const newBingos = countBingos(nc, size)
    if (newBingos > bingos) {
      setBingos(newBingos)
      setShowBingoPopup(true)
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } })
    }
    const count = nc.size
    if (count === 1) setMessage(MESSAGES[1])
    else if (count === 3) setMessage(MESSAGES[3])
    else if (isNearBingo(nc, size)) setMessage(MESSAGES.nearBingo)
    setScreen('game')
  }

  async function openCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      streamRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
    } catch (e) { checkItem(selectedIdx, null) }
  }

  function closeCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
  }

  function capturePhoto() {
    const canvas = document.createElement('canvas')
    canvas.width = 512; canvas.height = 512
    const ctx = canvas.getContext('2d')
    if (videoRef.current) ctx.drawImage(videoRef.current, 0, 0, 512, 512)
    closeCamera()
    checkItem(selectedIdx, canvas.toDataURL('image/jpeg', 0.5))
  }

  function skipPhoto() { closeCamera(); checkItem(selectedIdx, null) }
  function closeCameraScreen() { closeCamera(); setSelectedIdx(null); setScreen('game') }

  useEffect(() => { if (screen === 'camera') openCamera() }, [screen])

  async function exportBingo() {
    const s = size; const cell = 140; const pad = 16; const header = 100
    const canvas = document.createElement('canvas')
    canvas.width = cell * s + pad * 2; canvas.height = cell * s + pad * 2 + header
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#FAF5E9'; ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = '#2C3E6B'; ctx.lineWidth = 3
    ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8)
    ctx.fillStyle = '#2C3E6B'; ctx.font = 'bold 32px Georgia,serif'; ctx.textAlign = 'center'
    ctx.fillText('두리번 빙고', canvas.width / 2, 44)
    ctx.font = '14px sans-serif'; ctx.fillStyle = '#8B8B9E'
    ctx.fillText(getKSTDate(), canvas.width / 2, 66)
    ctx.font = 'bold 16px sans-serif'; ctx.fillStyle = bingos > 0 ? '#D4B44A' : '#8B8B9E'
    ctx.fillText(bingos > 0 ? `${bingos} 빙고 달성!` : '0 빙고', canvas.width / 2, 90)
    board.forEach((item, idx) => {
      const row = Math.floor(idx / s); const col = idx % s
      const x = pad + col * cell; const y = header + pad + row * cell
      ctx.fillStyle = '#FAF5E9'; ctx.fillRect(x, y, cell, cell)
      ctx.strokeStyle = '#2C3E6B'; ctx.lineWidth = 1.5; ctx.strokeRect(x, y, cell, cell)
      ctx.font = `${cell * 0.32}px sans-serif`; ctx.textAlign = 'center'; ctx.fillStyle = '#2C3E6B'
      ctx.fillText(item.emoji, x + cell / 2, y + cell * 0.52)
      ctx.font = `bold ${Math.max(10, cell * 0.1)}px sans-serif`
      ctx.fillText(item.ko, x + cell / 2, y + cell * 0.8)
      if (checked.has(idx)) {
        ctx.save(); ctx.translate(x + cell / 2, y + cell / 2); ctx.rotate(-0.14)
        ctx.globalAlpha = 0.7; ctx.strokeStyle = '#1a3a8a'; ctx.lineWidth = 3
        ctx.beginPath(); ctx.arc(0, 0, cell * 0.34, 0, Math.PI * 2); ctx.stroke()
        ctx.fillStyle = '#1a3a8a'
        ctx.beginPath(); ctx.arc(-9, -6, 4, 0, Math.PI * 2); ctx.fill()
        ctx.beginPath(); ctx.arc(9, -6, 4, 0, Math.PI * 2); ctx.fill()
        ctx.beginPath(); ctx.arc(0, 4, 12, 0, Math.PI); ctx.stroke()
        ctx.globalAlpha = 1; ctx.restore()
      }
    })
    const link = document.createElement('a')
    link.download = `dooribun-bingo-${getKSTDate()}.png`
    link.href = canvas.toDataURL('image/png'); link.click()
  }

  function doSave() {
    saveRecord({
      date: new Date().toISOString(), kstDate: getKSTDate(), mode,
      board: board.map(i => i.id), checked: [...checked],
      photoKeys: Object.keys(photos), photos, bingos,
    })
    setHistory(loadHistory()); setShowBingoPopup(false); setScreen('home')
  }

  if (screen === 'home') return <HomeScreen mode={mode} setMode={setMode} onStart={startGame} onCalendar={() => { setHistory(loadHistory()); setScreen('calendar') }} />
  if (screen === 'game') return <GameScreen board={board} checked={checked} photos={photos} bingos={bingos} mode={mode} size={size} message={message} showBingoPopup={showBingoPopup} showRestartConfirm={showRestartConfirm} onTapItem={tapItem} onRestart={() => checked.size > 0 ? setShowRestartConfirm(true) : startGame()} onConfirmRestart={() => { setShowRestartConfirm(false); startGame() }} onCancelRestart={() => setShowRestartConfirm(false)} onContinue={() => setShowBingoPopup(false)} onFinish={doSave} onExport={exportBingo} onBack={() => setScreen('home')} />
  if (screen === 'camera') return <CameraScreen item={board[selectedIdx]} videoRef={videoRef} onCapture={capturePhoto} onSkip={skipPhoto} onClose={closeCameraScreen} />
  if (screen === 'calendar') return <CalendarScreen history={history} onBack={() => setScreen('home')} onSelectRecord={r => { setSelectedRecord(r); setScreen('dateDetail') }} />
  if (screen === 'dateDetail') return <DateDetailScreen record={selectedRecord} onBack={() => setScreen('calendar')} />
  return null
}

function HomeScreen({ mode, setMode, onStart, onCalendar }) {
  return (
    <div className="screen home-screen">
      <div className="home-content">
        <div className="logo-area">
          <span className="logo-emoji">🚶</span>
          <h1 className="app-title">두리번 빙고</h1>
          <p className="app-subtitle">산책하면서 발견한 것들로 빙고!</p>
        </div>
        <div className="mode-section">
          <p className="mode-label">모드 선택</p>
          <div className="mode-buttons">
            <button className={`mode-btn ${mode === 'normal' ? 'active' : ''}`} onClick={() => setMode('normal')}>
              <span className="mode-name">노말</span><span className="mode-size">3 × 3</span>
            </button>
            <button className={`mode-btn ${mode === 'hard' ? 'active' : ''}`} onClick={() => setMode('hard')}>
              <span className="mode-name">하드</span><span className="mode-size">5 × 5</span>
            </button>
          </div>
        </div>
        <div className="action-buttons">
          <button className="btn-primary" onClick={onStart}>시작하기</button>
          <button className="btn-secondary" onClick={onCalendar}>📅 이전 산책 기록 보기</button>
        </div>
      </div>
    </div>
  )
}

function GameScreen({ board, checked, photos, bingos, mode, size, message, showBingoPopup, showRestartConfirm, onTapItem, onRestart, onConfirmRestart, onCancelRestart, onContinue, onFinish, onExport, onBack }) {
  return (
    <div className="screen game-screen">
      <div className="nav-bar">
        <button className="nav-btn" onClick={onBack}>←</button>
        <h2 className="nav-title">오늘의 빙고</h2>
        <div className="nav-right">
          <button className="nav-btn-text" onClick={onExport}>저장</button>
          <button className="nav-btn" onClick={onRestart} title="새판">↺</button>
        </div>
      </div>
      <div className="bingo-card-header">
        <div className="bingo-card-title">두리번빙고</div>
        <div className="bingo-card-sub">{mode === 'normal' ? '3 × 3' : '5 × 5'} &nbsp;·&nbsp; {bingos > 0 ? `${bingos} 빙고!` : '산책하며 찾아봐요'}</div>
      </div>
      <div className="bingo-card-frame">
        <div className={`bingo-grid grid-${size}`}>
          {board.map((item, idx) => {
            const colBorder = (idx % size !== size - 1) ? '1.5px solid #2C3E6B' : 'none'
            const rowBorder = (Math.floor(idx / size) !== size - 1) ? '1.5px solid #2C3E6B' : 'none'
            return <BingoCell key={idx} item={item} checked={checked.has(idx)} photo={photos[idx]} onClick={() => onTapItem(idx)} colBorder={colBorder} rowBorder={rowBorder} />
          })}
        </div>
      </div>
      {message && <div className="encouragement-banner">{message}</div>}
      {showBingoPopup && (
        <div className="popup-overlay">
          <div className="bingo-popup">
            <div className="popup-emoji">🎊</div>
            <h2 className="popup-bingo">{bingos} 빙고!</h2>
            <p className="popup-sub">산책이 즐거워지고 있어요</p>
            <button className="btn-primary popup-btn" onClick={onContinue}>계속 산책하기 →</button>
            <button className="btn-text" onClick={onFinish}>오늘은 여기까지</button>
          </div>
        </div>
      )}
      {showRestartConfirm && (
        <div className="popup-overlay">
          <div className="confirm-popup">
            <p className="confirm-title">처음부터 다시 시작할까요?</p>
            <p className="confirm-sub">지금까지의 체크 기록이 모두 사라져요</p>
            <div className="confirm-buttons">
              <button className="btn-cancel" onClick={onCancelRestart}>취소</button>
              <button className="btn-confirm" onClick={onConfirmRestart}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function BingoCell({ item, checked, photo, onClick, colBorder, rowBorder }) {
  const [imgError, setImgError] = useState(false)
  const showImg = item.img && !imgError
  return (
    <div className={`bingo-cell-wrapper ${checked ? 'checked' : ''}`} onClick={onClick} style={{ borderRight: colBorder, borderBottom: rowBorder }}>
      <div className="bingo-cell-frame">
        {item.rarity === 'legendary' && !checked && <div className="rarity-badge">★</div>}
        {photo && checked && <div className="photo-badge">📷</div>}
        {photo && checked ? (
          <img src={photo} alt={item.ko} className="cell-photo-taken" />
        ) : showImg ? (
          <img src={`/images/${item.img}`} alt={item.ko} className="cell-img" onError={() => setImgError(true)} />
        ) : (
          <span className="cell-emoji">{item.emoji}</span>
        )}
        {checked && (
          <div className="stamp-overlay">
            <div className="stamp-smiley">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="5.5"/>
                <circle cx="35" cy="42" r="5" fill="currentColor"/>
                <circle cx="65" cy="42" r="5" fill="currentColor"/>
                <path d="M 28 64 Q 50 84 72 64" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="cell-label">{item.ko}</div>
    </div>
  )
}

function CameraScreen({ item, videoRef, onCapture, onSkip, onClose }) {
  return (
    <div className="screen camera-screen" onClick={onCapture}>
      <video ref={videoRef} autoPlay playsInline muted className="camera-video" />
      <div className="camera-item-tag">{item?.ko} 찍는 중</div>
      <button className="camera-close" onClick={e => { e.stopPropagation(); onClose() }}>✕</button>
      <div className="camera-hint">화면을 탭하면 촬영돼요</div>
      <button className="skip-btn" onClick={e => { e.stopPropagation(); onSkip() }}>체크만 하고 넘어가기</button>
    </div>
  )
}

function CalendarScreen({ history, onBack, onSelectRecord }) {
  const calendarRef = useRef(null)
  const todayRef = useRef(null)
  const recordsByDate = {}
  history.forEach(r => {
    const d = r.kstDate || r.date?.split('T')[0] || '?'
    if (!recordsByDate[d]) recordsByDate[d] = []
    recordsByDate[d].push(r)
  })
  const installDate = getAppInstallDate()
  const today = getKSTDate()
  const allDates = getDatesRange(installDate, today, 4)
  const totalPlayed = history.length
  let streak = 0
  const todayDate = new Date()
  for (let i = 0; i < 365; i++) {
    const d = new Date(todayDate); d.setDate(d.getDate() - i)
    const ds = d.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace('.', '')
    if (recordsByDate[ds]) streak++
    else if (i > 0) break
  }
  useEffect(() => {
    setTimeout(() => { todayRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }, 100)
  }, [])
  const nodePositions = [18, 58, 35, 72, 22, 62, 42, 78, 28, 68]
  function getStickerSrc(records) {
    if (!records || records.length === 0) return null
    const maxBingos = Math.max(...records.map(r => r.bingos || 0))
    if (maxBingos >= 3) return '/images/stickers/pinksticker.png'
    if (maxBingos >= 1) return '/images/stickers/goldsticker.png'
    return '/images/stickers/greensticker.png'
  }
  return (
    <div className="screen calendar-screen">
      <div className="nav-bar">
        <button className="nav-btn" onClick={onBack}>←</button>
        <h2 className="nav-title">산책 기록</h2>
        <div style={{ width: 40 }} />
      </div>
      <div className="path-scroll" ref={calendarRef}>
        <div className="path-map" style={{ height: allDates.length * 90 + 80 }}>
          {allDates.map((date, idx) => {
            const records = recordsByDate[date]
            const isToday = date === today
            const isFuture = date > today
            const stickerSrc = getStickerSrc(records)
            const leftPos = nodePositions[idx % nodePositions.length]
            const dateNum = date.slice(8)
            return (
              <div key={date} ref={isToday ? todayRef : null}
                className={`sticker-slot ${stickerSrc ? 'filled' : ''} ${isToday ? 'today' : ''} ${isFuture ? 'future' : ''}`}
                style={{ left: `${leftPos}%`, top: idx * 90 + 40 }}
                onClick={() => records && onSelectRecord(records[0])}
              >
                {isToday && <div className="today-pin">📍</div>}
                {stickerSrc && <img src={stickerSrc} alt="sticker" className="sticker-img" />}
                <div className={`sticker-date ${stickerSrc ? 'on-sticker' : ''}`}>{dateNum}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="stats-bar">
        <div className="stat-item"><div className="stat-label">이달 산책</div><div className="stat-value">{history.filter(r => r.kstDate?.slice(0, 7) === today.slice(0, 7)).length}일</div></div>
        <div className="stat-item"><div className="stat-label">현재 연속</div><div className="stat-value">{streak}일 🔥</div></div>
        <div className="stat-item"><div className="stat-label">총 산책</div><div className="stat-value">{totalPlayed}일</div></div>
      </div>
    </div>
  )
}

function DateDetailScreen({ record, onBack }) {
  if (!record) return null
  const boardItems = (record.board || []).map(id => ALL_ITEMS.find(i => i.id === id) || { id, ko: id, emoji: '?' })
  const checkedSet = new Set(record.checked || [])
  const gridSize = record.mode === 'normal' ? 3 : 5
  return (
    <div className="screen detail-screen">
      <div className="nav-bar">
        <button className="nav-btn" onClick={onBack}>←</button>
        <h2 className="nav-title">{record.kstDate} 기록</h2>
        <div style={{ width: 40 }} />
      </div>
      <div className="detail-info">
        <span>{record.mode === 'normal' ? '노말 3×3' : '하드 5×5'}</span>
        <span>{record.bingos || 0}빙고 달성</span>
      </div>
      <div className="bingo-card-frame" style={{ margin: '0 12px' }}>
        <div className={`bingo-grid grid-${gridSize}`}>
          {boardItems.map((item, idx) => {
            const colBorder = (idx % gridSize !== gridSize - 1) ? '1.5px solid #2C3E6B' : 'none'
            const rowBorder = (Math.floor(idx / gridSize) !== gridSize - 1) ? '1.5px solid #2C3E6B' : 'none'
            return <BingoCell key={idx} item={item} checked={checkedSet.has(idx)} photo={record.photos?.[idx]} onClick={() => {}} colBorder={colBorder} rowBorder={rowBorder} />
          })}
        </div>
      </div>
      {(record.photoKeys || []).length > 0 && (
        <div className="photos-section">
          <p className="photos-title">인증 사진 {record.photoKeys.length}장</p>
          <div className="photos-grid">
            {record.photoKeys.map(key => record.photos?.[key] && <img key={key} src={record.photos[key]} className="photo-thumb" alt="인증" />)}
          </div>
        </div>
      )}
    </div>
  )
}
