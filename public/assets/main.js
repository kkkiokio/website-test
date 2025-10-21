import { renderHelloWorld } from './helloWorld.js'

const app = document.querySelector('#app')

if (!app) {
  throw new Error('Missing #app container')
}

const shell = document.createElement('div')
shell.className = 'mx-auto flex max-w-3xl flex-col items-center gap-6 py-24 text-center'

const logo = document.createElement('img')
logo.src = '/vite.svg'
logo.alt = 'Vite logo'
logo.className = 'h-24 w-24'

const copy = document.createElement('div')
copy.className = 'space-y-3'
copy.innerHTML = `
  <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Vite-style Starter</h1>
  <p class="text-lg text-slate-600">
    Edit <code class="rounded bg-slate-200 px-2 py-1 font-mono">public/assets/helloWorld.js</code> to see instant updates.
  </p>
`

const helloWorldMount = document.createElement('div')
renderHelloWorld(helloWorldMount, { msg: 'You did it!' })

shell.append(logo, copy, helloWorldMount)
app.append(shell)
