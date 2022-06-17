document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.app-apply-ckeditor5').forEach(function ($el) {
    CKSource.Editor.create($el, {
      /* @TODO: Implement auto save functionality
      autosave: {
        save (editor) {
          var xhr = new XMLHttpRequest()
          xhr.open('POST', 'save', true)
          xhr.setRequestHeader('Content-Type', 'application/json')
          xhr.send(JSON.stringify([
            {
              id: $(editor.sourceElement).attr('id'),
              value: editor.getData()
            }
          ]))
        }
      },
      */
    }).catch(err => {
      console.error(err.stack)
    })
  })
})
