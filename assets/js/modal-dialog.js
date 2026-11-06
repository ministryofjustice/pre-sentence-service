function ModalDialog($module) {
  this.$module = $module
  this.$dialogBox = $module.querySelector('dialog')
  this.$container = document.documentElement

  this.focussable = [
    'button',
    '[href]',
    'input',
    'select',
    'textarea'
  ]

  this.open = this.handleOpen.bind(this)
  this.close = this.handleClose.bind(this)
  this.focus = this.handleFocus.bind(this)
  this.focusTrap = this.handleFocusTrap.bind(this)
  this.boundKeyDown = this.handleKeyDown.bind(this)

  this.$closeButtons = this.$dialogBox.querySelectorAll('[data-element="govuk-modal-dialogue-close"]')
  this.$focussable = this.$dialogBox.querySelectorAll(this.focussable.toString())
  this.$focusableLast = this.$focussable[this.$focussable.length - 1]
  this.$inertContainer = document.querySelector(this.$module.dataset.inertContainer || '.govuk-modal-dialogue-inert-container')
}

ModalDialog.prototype.init = function(options) {
  if (!this.$module) {
    return
  }

  this.options = options || {}

  this.$focusElement = this.options.focusElement || this.$dialogBox

  if (!this.dialogSupported()) {
    if (typeof this.options.onDialogNotSupported === 'function') {
      this.options.onDialogNotSupported.call()
    }
    return
  }

  if (this.$dialogBox.hasAttribute('open')) {
    this.open()
  }

  this.initEvents()

  return this
}

ModalDialog.prototype.dialogSupported = function() {
  return typeof HTMLDialogElement === 'function'
}

ModalDialog.prototype.initEvents = function() {
  if (this.options.triggerElement) {
    this.options.triggerElement.addEventListener('click', this.open)
  }

  this.$closeButtons.forEach(function(element) {
    element.addEventListener('click', this.close.bind(this))
  }.bind(this))
}

ModalDialog.prototype.handleOpen = function(event) {
  if (event) {
    event.preventDefault()
  }

  this.$lastActiveElement = document.activeElement

  this.$container.classList.add('govuk-!-scroll-disabled')
  this.$module.classList.add('govuk-modal-dialogue--open')

  this.$inertContainer.inert = true
  this.$inertContainer.setAttribute('aria-hidden', 'true')

  document.addEventListener('keydown', this.boundKeyDown, true)

  if (typeof this.options.onOpen === 'function') {
    this.options.onOpen.call(this)
  }

  if (this.$dialogBox.hasAttribute('open')) {
    return
  }

  this.$dialogBox.setAttribute('open', '')

  this.focus()
}

ModalDialog.prototype.handleClose = function(event) {
  if (event) {
    event.preventDefault()
  }

  if (!this.$dialogBox.hasAttribute('open')) {
    return
  }

  this.$dialogBox.removeAttribute('open')

  this.$module.classList.remove('govuk-modal-dialogue--open')
  this.$container.classList.remove('govuk-!-scroll-disabled')
  this.$inertContainer.inert = false
  this.$inertContainer.setAttribute('aria-hidden', 'false')

  this.$lastActiveElement.focus()

  if (typeof this.options.onClose === 'function') {
    this.options.onClose.call(this)
  }

  document.removeEventListener('keydown', this.boundKeyDown, true)
}

ModalDialog.prototype.isOpen = function() {
  return this.$dialogBox.hasAttribute('open')
}

ModalDialog.prototype.handleFocus = function() {
  this.$dialogBox.scrollIntoView()
  this.$focusElement.focus({ preventScroll: true })
}

ModalDialog.prototype.handleFocusTrap = function(event) {
  var $focusElement

  var hasFocusEscaped = document.activeElement !== this.$dialogBox

  if (hasFocusEscaped) {
    this.$focussable.forEach(function(element) {
      if (hasFocusEscaped && document.activeElement === element) {
        hasFocusEscaped = false
      }
    })

    $focusElement = hasFocusEscaped
      ? this.$dialogBox
      : undefined
  }

  if (!$focusElement) {
    if ((document.activeElement === this.$focusableLast && !event.shiftKey) || !this.$focussable.length) {
      $focusElement = this.$dialogBox
    } else if (document.activeElement === this.$dialogBox && event.shiftKey) {
      $focusElement = this.$focusableLast
    }
  }

  if ($focusElement) {
    event.preventDefault()
    $focusElement.focus({ preventScroll: true })
  }
}

ModalDialog.prototype.handleKeyDown = function(event) {
  var KEY_TAB = 9
  var KEY_ESCAPE = 27

  switch (event.keyCode) {
    case KEY_TAB:
      this.focusTrap(event)
      break

    case KEY_ESCAPE:
      this.close()
      break
  }
}

export default ModalDialog
