const addItems = document.querySelector('.add-items')
const itemsList = document.querySelector('.plates')
const items = JSON.parse(localStorage.getItem('items')) || []

function addItem(e) {
  e.preventDefault()
  const text = this.querySelector(`[name=item]`).value
  const item = {
    text,
    done: false
  }
  items.push(item)

  // dom update
  populateList(items, itemsList)
  // set localstrage
  localStorage.setItem('items', JSON.stringify(items))
  // input value reset
  this.reset()
}

function toggleDone(e) {
  const el = e.target
  if (!el.matches('input')) return
  
  const index = el.dataset.index
  // change property
  items[index].done = !items[index].done
  // set localstrage
  localStorage.setItem('items', JSON.stringify(items))
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, index) => {
    return `
      <li>
        <input type="checkbox" data-index=${index} id="item${index}" ${plate.done ? 'checked' : ''} />
        <label for="item${index}">${plate.text}</label>
      </li>
    `
  }).join('')
}

addItems.addEventListener('submit', addItem)
itemsList.addEventListener('click', toggleDone)
populateList(items, itemsList)
