document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.app-apply-ckeditor5').forEach(function ($el) {
    CKSource.Editor.create($el).catch(err => {
      console.error(err.stack)
    })
  })
})
