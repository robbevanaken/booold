<template>
  <!-- PASSWORD GATE -->
  <div v-if="!authenticated" class="min-h-screen bg-black flex items-center justify-center p-6">
    <div class="w-full max-w-xs">
      <h1 class="font-dark-paradise italic text-white text-xl mb-1 text-center">Energie</h1>
      <p class="text-white/30 text-xs text-center mb-8">Dashboard</p>
      <input
        v-model="passwordInput"
        type="password"
        placeholder="Wachtwoord"
        class="w-full bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder-white/20 px-4 py-3 text-base mb-3 focus:outline-none focus:border-white/25 transition-colors"
        @keyup.enter="login"
      />
      <p v-if="passwordError" class="text-orange text-xs mb-3 pl-1">Ongeldig wachtwoord</p>
      <button
        @click="login"
        class="w-full bg-white text-black font-semibold text-base py-3 rounded-xl hover:bg-white/90 transition-colors"
      >
        Inloggen
      </button>
    </div>
  </div>

  <!-- DASHBOARD -->
  <div v-else class="min-h-screen bg-black text-white font-inter">

    <!-- Top bar -->
    <div class="flex items-center justify-between px-5 py-4 border-b border-white/10">
      <div>
        <h1 class="text-white font-semibold leading-tight" style="font-size:clamp(14px,1.5vw,16px)">Energie Dashboard</h1>
        <p class="text-white/30 text-xs mt-0.5">{{ dateRangeLabel }}</p>
      </div>
      <div class="flex gap-2">
        <button
          @click="showUpload = !showUpload"
          class="text-xs px-3 py-2 rounded-lg border transition-colors"
          :class="showUpload ? 'border-green text-green' : 'border-white/10 text-white/50 hover:text-white/80 hover:border-white/20'"
        >
          CSV uploaden
        </button>
        <button
          @click="logout"
          class="text-xs px-3 py-2 rounded-lg border border-white/10 text-white/30 hover:text-white/60 transition-colors"
        >
          Uitloggen
        </button>
      </div>
    </div>

    <!-- Upload panel -->
    <div v-show="showUpload" class="px-5 py-5 bg-[#0d0d0d] border-b border-white/10">
      <p class="text-white/30 text-xs mb-4">Data wordt lokaal opgeslagen in je browser. Upload nieuwe bestanden om bij te werken.</p>
      <div class="flex flex-wrap gap-3">
        <label class="cursor-pointer group">
          <span class="block text-xs text-white/30 mb-1.5 pl-0.5">Elektriciteit CSV</span>
          <div class="flex items-center gap-3 px-4 py-2.5 bg-[#1a1a1a] rounded-xl border border-white/10 group-hover:border-white/20 transition-colors">
            <span class="text-xs text-white/50 max-w-[200px] truncate">{{ elecFileName || 'Bestand kiezen…' }}</span>
            <span class="text-xs text-green font-semibold ml-3 shrink-0">Uploaden</span>
          </div>
          <input type="file" accept=".csv" class="hidden" @change="e => handleFileUpload(e, 'elec')" />
        </label>
        <label class="cursor-pointer group">
          <span class="block text-xs text-white/30 mb-1.5 pl-0.5">Gas CSV</span>
          <div class="flex items-center gap-3 px-4 py-2.5 bg-[#1a1a1a] rounded-xl border border-white/10 group-hover:border-white/20 transition-colors">
            <span class="text-xs text-white/50 max-w-[200px] truncate">{{ gasFileName || 'Bestand kiezen…' }}</span>
            <span class="text-xs text-orange font-semibold ml-3 shrink-0">Uploaden</span>
          </div>
          <input type="file" accept=".csv" class="hidden" @change="e => handleFileUpload(e, 'gas')" />
        </label>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
      <p class="text-white/20 text-sm">Laden…</p>
    </div>

    <!-- No data -->
    <div v-else-if="!hasData && !loading" class="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <p class="text-white/20 text-base mb-2">Geen data gevonden</p>
      <p class="text-white/15 text-xs">Upload je CSV-bestanden via de knop rechtsboven.</p>
    </div>

    <!-- Dashboard content -->
    <div v-else class="p-5">

      <!-- KPI cards -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div v-for="kpi in kpis" :key="kpi.label" class="bg-[#1a1a1a] rounded-2xl p-4">
          <div class="text-white/30 text-xs uppercase tracking-widest mb-2 leading-tight">{{ kpi.label }}</div>
          <div class="font-semibold leading-none" :class="kpi.color" style="font-size:clamp(15px,1.5vw,20px)">{{ kpi.value }}</div>
          <div v-if="kpi.sub" class="text-white/25 text-xs mt-1.5">{{ kpi.sub }}</div>
        </div>
      </div>

      <!-- Tab nav -->
      <div class="flex gap-1 mb-5 bg-[#1a1a1a] p-1 rounded-xl w-fit overflow-x-auto">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0"
          :class="activeTab === tab.id ? 'bg-white text-black' : 'text-white/35 hover:text-white/65'"
        >{{ tab.label }}</button>
      </div>

      <!-- TAB: OVERZICHT -->
      <div v-show="activeTab === 'overzicht'" class="space-y-4">
        <div class="bg-[#1a1a1a] rounded-2xl p-5">
          <h3 class="text-white/30 text-xs uppercase tracking-widest mb-4">Dagelijks elektriciteitsverbruik + injectie</h3>
          <canvas ref="canvasOverzichtElec" style="max-height:300px"></canvas>
        </div>
        <div class="bg-[#1a1a1a] rounded-2xl p-5">
          <h3 class="text-white/30 text-xs uppercase tracking-widest mb-4">Dagelijks gasverbruik (m³)</h3>
          <canvas ref="canvasOverzichtGas" style="max-height:260px"></canvas>
        </div>
      </div>

      <!-- TAB: ELEKTRICITEIT -->
      <div v-show="activeTab === 'elektriciteit'" class="space-y-4">
        <div class="bg-[#1a1a1a] rounded-2xl p-5">
          <h3 class="text-white/30 text-xs uppercase tracking-widest mb-4">Dag- en nachtverbruik per dag (kWh)</h3>
          <canvas ref="canvasElecDag" style="max-height:300px"></canvas>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-[#1a1a1a] rounded-2xl p-5">
            <h3 class="text-white/30 text-xs uppercase tracking-widest mb-4">Dag vs Nacht verdeling</h3>
            <canvas ref="canvasElecDonut" style="max-height:240px"></canvas>
          </div>
          <div class="bg-[#1a1a1a] rounded-2xl p-5">
            <h3 class="text-white/30 text-xs uppercase tracking-widest mb-4">Gemiddeld per weekdag (kWh)</h3>
            <canvas ref="canvasElecWeekdag" style="max-height:240px"></canvas>
          </div>
        </div>
      </div>

      <!-- TAB: ZONNEPANELEN -->
      <div v-show="activeTab === 'zonnepanelen'" class="space-y-4">
        <div class="bg-[#1a1a1a] rounded-2xl p-5">
          <h3 class="text-white/30 text-xs uppercase tracking-widest mb-4">Dagelijkse injectie (kWh)</h3>
          <canvas ref="canvasSolarDaily" style="max-height:300px"></canvas>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-[#1a1a1a] rounded-2xl p-5">
            <h3 class="text-white/30 text-xs uppercase tracking-widest mb-4">Maandelijkse injectie (kWh)</h3>
            <canvas ref="canvasSolarMonthly" style="max-height:240px"></canvas>
          </div>
          <div class="bg-[#1a1a1a] rounded-2xl p-5">
            <h3 class="text-white/30 text-xs uppercase tracking-widest mb-4">Netto elektriciteit per maand (kWh)</h3>
            <canvas ref="canvasNetto" style="max-height:240px"></canvas>
          </div>
        </div>
        <div class="bg-[#1a1a1a] rounded-2xl p-5">
          <h3 class="text-white/30 text-xs uppercase tracking-widest mb-4">Zelfvoorzieningsratio per maand (%)</h3>
          <canvas ref="canvasSelfRatio" style="max-height:220px"></canvas>
        </div>
      </div>

      <!-- TAB: GAS -->
      <div v-show="activeTab === 'gas'" class="space-y-4">
        <div class="bg-[#1a1a1a] rounded-2xl p-5">
          <h3 class="text-white/30 text-xs uppercase tracking-widest mb-4">Dagelijks gasverbruik (m³)</h3>
          <canvas ref="canvasGasDaily" style="max-height:300px"></canvas>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-[#1a1a1a] rounded-2xl p-5">
            <h3 class="text-white/30 text-xs uppercase tracking-widest mb-4">Maandelijks gasverbruik (m³)</h3>
            <canvas ref="canvasGasMonthly" style="max-height:240px"></canvas>
          </div>
          <div class="bg-[#1a1a1a] rounded-2xl p-5">
            <h3 class="text-white/30 text-xs uppercase tracking-widest mb-4">Gemiddeld per weekdag (m³)</h3>
            <canvas ref="canvasGasWeekdag" style="max-height:240px"></canvas>
          </div>
        </div>
      </div>

      <!-- TAB: MAANDEN -->
      <div v-show="activeTab === 'maanden'" class="space-y-4">
        <div class="bg-[#1a1a1a] rounded-2xl p-5">
          <h3 class="text-white/30 text-xs uppercase tracking-widest mb-4">Maandoverzicht: verbruik & injectie (kWh)</h3>
          <canvas ref="canvasMaandElec" style="max-height:300px"></canvas>
        </div>
        <div class="bg-[#1a1a1a] rounded-2xl p-5">
          <h3 class="text-white/30 text-xs uppercase tracking-widest mb-4">Gas (m³) + netto elektriciteit (kWh)</h3>
          <canvas ref="canvasMaandCombined" style="max-height:300px"></canvas>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

// ─── page meta ────────────────────────────────────────────────────────────────
definePageMeta({ layout: false })
useHead({
  title: 'Energie',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

// ─── constants ────────────────────────────────────────────────────────────────
const PASSWORD = 'energie2025'
const WEEKDAYS = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag']
const MONTHS_NL = ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
const tabs = [
  { id: 'overzicht', label: 'Overzicht' },
  { id: 'elektriciteit', label: 'Elektriciteit' },
  { id: 'zonnepanelen', label: 'Zonnepanelen' },
  { id: 'gas', label: 'Gas' },
  { id: 'maanden', label: 'Maanden' },
]

// ─── state ────────────────────────────────────────────────────────────────────
const authenticated = ref(false)
const passwordInput = ref('')
const passwordError = ref(false)
const activeTab = ref('overzicht')
const showUpload = ref(false)
const loading = ref(false)
const elecFileName = ref('')
const gasFileName = ref('')
const elecByDay = ref({})
const gasByDay = ref({})

// chart canvas refs
const canvasOverzichtElec = ref(null)
const canvasOverzichtGas = ref(null)
const canvasElecDag = ref(null)
const canvasElecDonut = ref(null)
const canvasElecWeekdag = ref(null)
const canvasSolarDaily = ref(null)
const canvasSolarMonthly = ref(null)
const canvasNetto = ref(null)
const canvasSelfRatio = ref(null)
const canvasGasDaily = ref(null)
const canvasGasMonthly = ref(null)
const canvasGasWeekdag = ref(null)
const canvasMaandElec = ref(null)
const canvasMaandCombined = ref(null)

// chart instances registry
const chartInstances = {}
let ChartClass = null

// ─── helpers ──────────────────────────────────────────────────────────────────
const hasData = computed(() => Object.keys(elecByDay.value).length > 0 || Object.keys(gasByDay.value).length > 0)

function parseNum(s) { return parseFloat((s || '0').replace(',', '.')) || 0 }
function parseDate(d) { const [day, mon, yr] = d.split('-'); return new Date(+yr, +mon - 1, +day) }
function monthKey(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` }
function monthLabel(k) { const [y, m] = k.split('-'); return `${MONTHS_NL[+m - 1]} ${y}` }
function sortedDays(map) { return Object.keys(map).sort((a, b) => parseDate(a) - parseDate(b)) }
function fmt1(n) { return isNaN(n) ? '—' : n.toLocaleString('nl-BE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) }
function fmt0(n) { return isNaN(n) ? '—' : n.toLocaleString('nl-BE', { maximumFractionDigits: 0 }) }

// ─── auth ─────────────────────────────────────────────────────────────────────
function login() {
  if (passwordInput.value === PASSWORD) {
    localStorage.setItem('energy_auth', '1')
    authenticated.value = true
    passwordError.value = false
    initData()
  } else {
    passwordError.value = true
  }
}

function logout() {
  localStorage.removeItem('energy_auth')
  authenticated.value = false
  passwordInput.value = ''
}

// ─── data init ────────────────────────────────────────────────────────────────
async function initData() {
  loading.value = true
  await nextTick()

  const storedElec = localStorage.getItem('energy_elec_csv')
  const storedGas = localStorage.getItem('energy_gas_csv')

  if (storedElec) {
    parseElecCSV(storedElec)
    elecFileName.value = localStorage.getItem('energy_elec_name') || 'elektriciteit.csv'
  } else {
    await fetchDefaultCSV('elec')
  }

  if (storedGas) {
    parseGasCSV(storedGas)
    gasFileName.value = localStorage.getItem('energy_gas_name') || 'gas.csv'
  } else {
    await fetchDefaultCSV('gas')
  }

  loading.value = false
  await nextTick()
  await renderAllCharts()
}

async function fetchDefaultCSV(type) {
  try {
    const url = type === 'elec' ? '/energie/elec.csv' : '/energie/gas.csv'
    const res = await fetch(url)
    if (!res.ok) return
    const text = await res.text()
    if (type === 'elec') {
      parseElecCSV(text)
      elecFileName.value = 'elec.csv'
    } else {
      parseGasCSV(text)
      gasFileName.value = 'gas.csv'
    }
  } catch {}
}

// ─── CSV parsing ──────────────────────────────────────────────────────────────
function parseElecCSV(text) {
  const map = {}
  const lines = text.replace(/^\uFEFF/, '').split('\n').filter(l => l.trim())
  lines.slice(1).forEach(line => {
    const cols = line.split(';')
    const d = cols[0]?.trim()
    if (!d || !d.match(/^\d{2}-\d{2}-\d{4}$/)) return
    const reg = cols[7]?.trim()
    const v = parseNum(cols[8])
    if (!map[d]) map[d] = { afnameDag: 0, injectieDag: 0, afnameNacht: 0, injectieNacht: 0 }
    if (reg === 'Afname Dag') map[d].afnameDag += v
    else if (reg === 'Injectie Dag') map[d].injectieDag += v
    else if (reg === 'Afname Nacht') map[d].afnameNacht += v
    else if (reg === 'Injectie Nacht') map[d].injectieNacht += v
  })
  elecByDay.value = map
}

function parseGasCSV(text) {
  const map = {}
  const lines = text.replace(/^\uFEFF/, '').split('\n').filter(l => l.trim())
  lines.slice(1).forEach(line => {
    const cols = line.split(';')
    const d = cols[0]?.trim()
    if (!d || !d.match(/^\d{2}-\d{2}-\d{4}$/)) return
    const unit = cols[9]?.trim()
    if (unit !== 'm³') return
    const v = parseNum(cols[8])
    if (!map[d]) map[d] = 0
    map[d] += v
  })
  gasByDay.value = map
}

// ─── file upload ──────────────────────────────────────────────────────────────
function handleFileUpload(event, type) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = async (e) => {
    const text = e.target.result
    if (type === 'elec') {
      localStorage.setItem('energy_elec_csv', text)
      localStorage.setItem('energy_elec_name', file.name)
      parseElecCSV(text)
      elecFileName.value = file.name
    } else {
      localStorage.setItem('energy_gas_csv', text)
      localStorage.setItem('energy_gas_name', file.name)
      parseGasCSV(text)
      gasFileName.value = file.name
    }
    await nextTick()
    await renderAllCharts()
  }
  reader.readAsText(file)
  event.target.value = ''
}

// ─── computed: KPIs ───────────────────────────────────────────────────────────
const kpis = computed(() => {
  if (!hasData.value) return []
  const days = sortedDays(elecByDay.value)
  let totalAfname = 0, totalInjectie = 0
  days.forEach(d => {
    const e = elecByDay.value[d]
    totalAfname += e.afnameDag + e.afnameNacht
    totalInjectie += e.injectieDag + e.injectieNacht
  })
  const gasDays = sortedDays(gasByDay.value)
  const totalGas = gasDays.reduce((s, d) => s + gasByDay.value[d], 0)
  const netto = totalAfname - totalInjectie

  return [
    { label: 'Totaal afname', value: fmt1(totalAfname) + ' kWh', color: 'text-white', sub: days.length + ' dagen' },
    { label: 'Injectie', value: fmt1(totalInjectie) + ' kWh', color: 'text-green' },
    { label: 'Netto elec', value: fmt1(netto) + ' kWh', color: netto < 0 ? 'text-green' : 'text-white/60' },
    { label: 'Totaal gas', value: fmt1(totalGas) + ' m³', color: 'text-orange' },
    { label: 'Gem. afname/dag', value: fmt1(totalAfname / (days.length || 1)) + ' kWh', color: 'text-white/60' },
    { label: 'Gem. gas/dag', value: fmt1(totalGas / (gasDays.length || 1)) + ' m³', color: 'text-white/60' },
  ]
})

const dateRangeLabel = computed(() => {
  const days = sortedDays(elecByDay.value)
  if (!days.length) return ''
  return `${days[0]} — ${days[days.length - 1]}`
})

// ─── monthly aggregation ──────────────────────────────────────────────────────
function monthlyElec() {
  const map = {}
  sortedDays(elecByDay.value).forEach(d => {
    const k = monthKey(parseDate(d))
    if (!map[k]) map[k] = { afnameDag: 0, injectieDag: 0, afnameNacht: 0, injectieNacht: 0 }
    const e = elecByDay.value[d]
    map[k].afnameDag += e.afnameDag; map[k].injectieDag += e.injectieDag
    map[k].afnameNacht += e.afnameNacht; map[k].injectieNacht += e.injectieNacht
  })
  return map
}

function monthlyGas() {
  const map = {}
  sortedDays(gasByDay.value).forEach(d => {
    const k = monthKey(parseDate(d))
    if (!map[k]) map[k] = 0
    map[k] += gasByDay.value[d]
  })
  return map
}

// ─── chart engine ─────────────────────────────────────────────────────────────
async function getChart() {
  if (!ChartClass) {
    const { Chart, registerables } = await import('chart.js')
    Chart.register(...registerables)
    ChartClass = Chart
  }
  return ChartClass
}

function makeChart(canvas, config) {
  if (!canvas) return
  const id = canvas.__chartId || (canvas.__chartId = Math.random().toString(36).slice(2))
  if (chartInstances[id]) { chartInstances[id].destroy() }
  chartInstances[id] = new ChartClass(canvas, config)
}

const GRID = 'rgba(255,255,255,0.06)'
const TICK = 'rgba(255,255,255,0.35)'
const C_BLUE = '#93c5fd'
const C_BLUE2 = '#3b82f6'
const C_GREEN = '#CCFF33'
const C_GREEN2 = '#84cc16'
const C_ORANGE = '#FF4D00'
const C_PURPLE = '#c084fc'

function scales(y1Label = '') {
  return {
    x: { grid: { color: GRID }, ticks: { color: TICK, maxRotation: 45, autoSkip: true, maxTicksLimit: 16, font: { size: 10 } } },
    y: { grid: { color: GRID }, ticks: { color: TICK, font: { size: 10 } }, title: { display: !!y1Label, text: y1Label, color: TICK, font: { size: 10 } } },
  }
}

function legendOpts() {
  return { labels: { color: TICK, boxWidth: 10, font: { size: 10 } } }
}

async function renderAllCharts() {
  if (!hasData.value) return
  await getChart()
  renderOverzicht()
  renderElec()
  renderSolar()
  renderGas()
  renderMaanden()
}

// ─── OVERZICHT charts ─────────────────────────────────────────────────────────
function renderOverzicht() {
  const days = sortedDays(elecByDay.value)
  makeChart(canvasOverzichtElec.value, {
    type: 'bar',
    data: {
      labels: days,
      datasets: [
        { label: 'Afname Dag', data: days.map(d => elecByDay.value[d].afnameDag), backgroundColor: C_BLUE, stack: 'a', borderWidth: 0 },
        { label: 'Afname Nacht', data: days.map(d => elecByDay.value[d].afnameNacht), backgroundColor: C_BLUE2, stack: 'a', borderWidth: 0 },
        { label: 'Injectie Dag', data: days.map(d => -elecByDay.value[d].injectieDag), backgroundColor: C_GREEN, stack: 'b', borderWidth: 0 },
        { label: 'Injectie Nacht', data: days.map(d => -elecByDay.value[d].injectieNacht), backgroundColor: C_GREEN2, stack: 'b', borderWidth: 0 },
      ],
    },
    options: { responsive: true, maintainAspectRatio: true, scales: scales('kWh'), plugins: { legend: legendOpts() } },
  })

  const gasDays = sortedDays(gasByDay.value)
  makeChart(canvasOverzichtGas.value, {
    type: 'bar',
    data: {
      labels: gasDays,
      datasets: [{ label: 'Gas (m³)', data: gasDays.map(d => gasByDay.value[d]), backgroundColor: C_ORANGE, borderWidth: 0 }],
    },
    options: { responsive: true, maintainAspectRatio: true, scales: scales('m³'), plugins: { legend: { display: false } } },
  })
}

// ─── ELEKTRICITEIT charts ─────────────────────────────────────────────────────
function renderElec() {
  const days = sortedDays(elecByDay.value)
  makeChart(canvasElecDag.value, {
    type: 'bar',
    data: {
      labels: days,
      datasets: [
        { label: 'Afname Dag', data: days.map(d => elecByDay.value[d].afnameDag), backgroundColor: C_BLUE, stack: 's', borderWidth: 0 },
        { label: 'Afname Nacht', data: days.map(d => elecByDay.value[d].afnameNacht), backgroundColor: C_BLUE2, stack: 's', borderWidth: 0 },
      ],
    },
    options: { responsive: true, maintainAspectRatio: true, scales: scales('kWh'), plugins: { legend: legendOpts() } },
  })

  let totalDag = 0, totalNacht = 0
  days.forEach(d => { totalDag += elecByDay.value[d].afnameDag; totalNacht += elecByDay.value[d].afnameNacht })
  makeChart(canvasElecDonut.value, {
    type: 'doughnut',
    data: {
      labels: ['Dag', 'Nacht'],
      datasets: [{ data: [totalDag, totalNacht], backgroundColor: [C_BLUE, C_BLUE2], borderWidth: 2, borderColor: '#1a1a1a' }],
    },
    options: { responsive: true, plugins: { legend: legendOpts() } },
  })

  const wdSum = Array(7).fill(0), wdCnt = Array(7).fill(0)
  days.forEach(d => {
    const wd = parseDate(d).getDay()
    wdSum[wd] += elecByDay.value[d].afnameDag + elecByDay.value[d].afnameNacht
    wdCnt[wd]++
  })
  makeChart(canvasElecWeekdag.value, {
    type: 'bar',
    data: {
      labels: WEEKDAYS,
      datasets: [{ label: 'Gem. kWh', data: wdSum.map((s, i) => wdCnt[i] ? +(s / wdCnt[i]).toFixed(3) : 0), backgroundColor: C_BLUE, borderWidth: 0 }],
    },
    options: { responsive: true, maintainAspectRatio: true, scales: scales('kWh'), plugins: { legend: { display: false } } },
  })
}

// ─── SOLAR charts ─────────────────────────────────────────────────────────────
function renderSolar() {
  const days = sortedDays(elecByDay.value)
  makeChart(canvasSolarDaily.value, {
    type: 'bar',
    data: {
      labels: days,
      datasets: [
        { label: 'Injectie Dag', data: days.map(d => elecByDay.value[d].injectieDag), backgroundColor: C_GREEN, stack: 's', borderWidth: 0 },
        { label: 'Injectie Nacht', data: days.map(d => elecByDay.value[d].injectieNacht), backgroundColor: C_GREEN2, stack: 's', borderWidth: 0 },
      ],
    },
    options: { responsive: true, maintainAspectRatio: true, scales: scales('kWh'), plugins: { legend: legendOpts() } },
  })

  const me = monthlyElec()
  const mKeys = Object.keys(me).sort()
  makeChart(canvasSolarMonthly.value, {
    type: 'bar',
    data: {
      labels: mKeys.map(monthLabel),
      datasets: [
        { label: 'Injectie Dag', data: mKeys.map(k => +me[k].injectieDag.toFixed(2)), backgroundColor: C_GREEN, stack: 's', borderWidth: 0 },
        { label: 'Injectie Nacht', data: mKeys.map(k => +me[k].injectieNacht.toFixed(2)), backgroundColor: C_GREEN2, stack: 's', borderWidth: 0 },
      ],
    },
    options: { responsive: true, maintainAspectRatio: true, scales: scales('kWh'), plugins: { legend: legendOpts() } },
  })

  const nettoData = mKeys.map(k => +(me[k].afnameDag + me[k].afnameNacht - me[k].injectieDag - me[k].injectieNacht).toFixed(2))
  makeChart(canvasNetto.value, {
    type: 'bar',
    data: {
      labels: mKeys.map(monthLabel),
      datasets: [{ label: 'Netto kWh', data: nettoData, backgroundColor: nettoData.map(v => v < 0 ? C_GREEN : C_PURPLE), borderWidth: 0 }],
    },
    options: { responsive: true, maintainAspectRatio: true, scales: scales('kWh'), plugins: { legend: { display: false } } },
  })

  const selfRatio = mKeys.map(k => {
    const afn = me[k].afnameDag + me[k].afnameNacht
    const inj = me[k].injectieDag + me[k].injectieNacht
    return afn > 0 ? +((inj / afn) * 100).toFixed(1) : 0
  })
  makeChart(canvasSelfRatio.value, {
    type: 'bar',
    data: {
      labels: mKeys.map(monthLabel),
      datasets: [{ label: 'Ratio %', data: selfRatio, backgroundColor: C_GREEN, borderWidth: 0 }],
    },
    options: { responsive: true, maintainAspectRatio: true, scales: scales('%'), plugins: { legend: { display: false } } },
  })
}

// ─── GAS charts ───────────────────────────────────────────────────────────────
function renderGas() {
  const gasDays = sortedDays(gasByDay.value)
  makeChart(canvasGasDaily.value, {
    type: 'bar',
    data: {
      labels: gasDays,
      datasets: [{ label: 'Gas (m³)', data: gasDays.map(d => gasByDay.value[d]), backgroundColor: C_ORANGE, borderWidth: 0 }],
    },
    options: { responsive: true, maintainAspectRatio: true, scales: scales('m³'), plugins: { legend: { display: false } } },
  })

  const mg = monthlyGas()
  const mgKeys = Object.keys(mg).sort()
  makeChart(canvasGasMonthly.value, {
    type: 'bar',
    data: {
      labels: mgKeys.map(monthLabel),
      datasets: [{ label: 'Gas (m³)', data: mgKeys.map(k => +mg[k].toFixed(2)), backgroundColor: C_ORANGE, borderWidth: 0 }],
    },
    options: { responsive: true, maintainAspectRatio: true, scales: scales('m³'), plugins: { legend: { display: false } } },
  })

  const wdSum = Array(7).fill(0), wdCnt = Array(7).fill(0)
  gasDays.forEach(d => {
    const wd = parseDate(d).getDay()
    wdSum[wd] += gasByDay.value[d]; wdCnt[wd]++
  })
  makeChart(canvasGasWeekdag.value, {
    type: 'bar',
    data: {
      labels: WEEKDAYS,
      datasets: [{ label: 'Gem. m³', data: wdSum.map((s, i) => wdCnt[i] ? +(s / wdCnt[i]).toFixed(3) : 0), backgroundColor: C_ORANGE, borderWidth: 0 }],
    },
    options: { responsive: true, maintainAspectRatio: true, scales: scales('m³'), plugins: { legend: { display: false } } },
  })
}

// ─── MAANDEN charts ───────────────────────────────────────────────────────────
function renderMaanden() {
  const me = monthlyElec()
  const mg = monthlyGas()
  const mKeys = [...new Set([...Object.keys(me), ...Object.keys(mg)])].sort()

  makeChart(canvasMaandElec.value, {
    type: 'bar',
    data: {
      labels: mKeys.map(monthLabel),
      datasets: [
        { label: 'Afname Dag', data: mKeys.map(k => +(me[k]?.afnameDag || 0).toFixed(2)), backgroundColor: C_BLUE, stack: 'a', borderWidth: 0 },
        { label: 'Afname Nacht', data: mKeys.map(k => +(me[k]?.afnameNacht || 0).toFixed(2)), backgroundColor: C_BLUE2, stack: 'a', borderWidth: 0 },
        { label: 'Injectie Dag', data: mKeys.map(k => -(me[k]?.injectieDag || 0).toFixed(2)), backgroundColor: C_GREEN, stack: 'b', borderWidth: 0 },
        { label: 'Injectie Nacht', data: mKeys.map(k => -(me[k]?.injectieNacht || 0).toFixed(2)), backgroundColor: C_GREEN2, stack: 'b', borderWidth: 0 },
      ],
    },
    options: { responsive: true, maintainAspectRatio: true, scales: scales('kWh'), plugins: { legend: legendOpts() } },
  })

  const nettoData = mKeys.map(k => +((me[k]?.afnameDag || 0) + (me[k]?.afnameNacht || 0) - (me[k]?.injectieDag || 0) - (me[k]?.injectieNacht || 0)).toFixed(2))
  makeChart(canvasMaandCombined.value, {
    type: 'bar',
    data: {
      labels: mKeys.map(monthLabel),
      datasets: [
        { label: 'Gas (m³)', data: mKeys.map(k => +(mg[k] || 0).toFixed(2)), backgroundColor: C_ORANGE, borderWidth: 0, yAxisID: 'y1' },
        { label: 'Netto elektriciteit (kWh)', data: nettoData, backgroundColor: nettoData.map(v => v < 0 ? C_GREEN : C_PURPLE), borderWidth: 0, yAxisID: 'y' },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: { grid: { color: GRID }, ticks: { color: TICK, font: { size: 10 } } },
        y: { grid: { color: GRID }, ticks: { color: TICK, font: { size: 10 } }, title: { display: true, text: 'kWh', color: TICK, font: { size: 10 } } },
        y1: { position: 'right', grid: { drawOnChartArea: false }, ticks: { color: TICK, font: { size: 10 } }, title: { display: true, text: 'm³', color: TICK, font: { size: 10 } } },
      },
      plugins: { legend: legendOpts() },
    },
  })
}

// ─── boot ─────────────────────────────────────────────────────────────────────
onMounted(() => {
  if (localStorage.getItem('energy_auth') === '1') {
    authenticated.value = true
    initData()
  }
})
</script>
