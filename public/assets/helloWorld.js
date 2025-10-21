export function renderHelloWorld(target, { msg }) {
  const container = document.createElement('div')
  container.className =
    'flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm'

  const title = document.createElement('p')
  title.className = 'text-xl font-semibold text-slate-800'
  title.textContent = msg

  const button = document.createElement('button')
  button.type = 'button'
  button.className =
    'rounded-lg bg-emerald-500 px-4 py-2 font-medium text-white transition hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500'
  button.textContent = 'count is '

  const countSpan = document.createElement('span')
  countSpan.dataset.count = 'value'
  countSpan.textContent = '0'
  button.append(countSpan)

  let count = 0
  button.addEventListener('click', () => {
    count += 1
    countSpan.textContent = String(count)
  })

  const hint = document.createElement('p')
  hint.className = 'text-sm text-slate-500'
  hint.innerHTML =
    'Edit <code>public/assets/helloWorld.js</code> to test instant updates.'

  container.append(title, button, hint)
  target.append(container)
}
