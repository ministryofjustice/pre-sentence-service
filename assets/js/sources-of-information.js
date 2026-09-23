/**
 * Page-scoped submit guard for Sources of information.
 *
 * This form contains multiple submit buttons (remove existing source and add custom source).
 * When Enter is pressed in the custom source input, browsers can submit the first submit button
 * in the form, which may trigger a remove action instead of add.
 *
 * This file intercepts Enter on #source and explicitly submits the add-source button so user
 * intent is preserved, without reordering template markup or adding page-specific logic globally.
 */

const sourceInput = document.getElementById('source')

if (sourceInput instanceof HTMLInputElement && sourceInput.form) {
  sourceInput.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return
    event.preventDefault()

    const addButton = sourceInput.form.querySelector('button[name="action"][value="add-source"]')
    if (addButton instanceof HTMLButtonElement && typeof sourceInput.form.requestSubmit === 'function') {
      sourceInput.form.requestSubmit(addButton)
    } else if (addButton instanceof HTMLButtonElement) {
      addButton.click()
    }
  })
}