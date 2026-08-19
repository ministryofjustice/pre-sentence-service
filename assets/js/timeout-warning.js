import ModalDialog from './modal-dialog.js'

function TimeoutWarning($module) {
  this.$module = $module
  this.$dialog = $module.querySelector('.govuk-timeout-warning__dialog')
  this.$fallbackElement = document.querySelector('.govuk-timeout-warning-fallback')
  this.modalDialog = new ModalDialog(this.$dialog).init({
    onClose: this.dialogClose.bind(this),
    onDialogNotSupported: this.dialogFallback.bind(this),
  })
  this.timers = []
  this.$countdown = $module.querySelector('.govuk-timeout-warning__timer')
  this.$accessibleCountdown = $module.querySelector('.govuk-timeout-warning__at-timer')
  this.idleMinutesBeforeTimeOut = parseFloat($module.getAttribute('data-minutes-idle-timeout')) || 25
  this.timeOutRedirectUrl = $module.getAttribute('data-url-redirect') || 'timeout'
  this.extendSessionUrl = $module.getAttribute('data-url-extend') || 'extend'
  this.minutesTimeOutModalVisible = parseFloat($module.getAttribute('data-minutes-modal-visible')) || 5
  this.timerText = $module.getAttribute('data-timer-text') || 'Your session will be reset in'
  this.timerExtraText = $module.getAttribute('data-timer-extra-text') || ''
  this.timerRedirectText = $module.getAttribute('data-timer-redirect-text') || 'You are about to be redirected'
}

TimeoutWarning.prototype.init = function() {
  if (!this.$module || !this.modalDialog) {
    return
  }

  this.countIdleTime()

  if (window.history.pushState) {
    this.disableBackButtonWhenOpen()
  }
}

TimeoutWarning.prototype.countIdleTime = function() {
  var idleTime
  var lastKeepAlive = 0
  var milliSecondsBeforeTimeOut = this.idleMinutesBeforeTimeOut * 60000
  var milliSecondsBetweenKeepAlives = 60000
  var boundResetIdleTime = resetIdleTime.bind(this)

  window.addEventListener('load', boundResetIdleTime)
  window.addEventListener('mousemove', boundResetIdleTime)
  window.addEventListener('mousedown', boundResetIdleTime)
  window.addEventListener('click', boundResetIdleTime)
  window.addEventListener('keypress', boundResetIdleTime)
  window.addEventListener('keyup', boundResetIdleTime)

  function resetIdleTime() {
    if (!this.isDialogOpen()) {
      clearTimeout(idleTime)
      idleTime = setTimeout(this.openDialog.bind(this), milliSecondsBeforeTimeOut)

      if (Date.now() - lastKeepAlive >= milliSecondsBetweenKeepAlives) {
        lastKeepAlive = Date.now()
        this.extendTimeOnServer()
      }
    }
  }

  boundResetIdleTime()
}

TimeoutWarning.prototype.extendTimeOnServer = function() {
  var $module = this
  fetch(this.extendSessionUrl, { redirect: 'manual' })
    .then(function(response) {
      if (!response.ok) {
        $module.redirect()
      }
    })
    .catch(function() {})
}

TimeoutWarning.prototype.openDialog = function() {
  this.modalDialog.open()
  this.startUiCountdown()

  if (window.history.pushState) {
    window.history.pushState('', '')
  }
}

TimeoutWarning.prototype.disableBackButtonWhenOpen = function() {
  window.addEventListener(
    'popstate',
    function() {
      if (this.isDialogOpen()) {
        this.modalDialog.close()
      }
    }.bind(this)
  )
}

TimeoutWarning.prototype.dialogFallback = function() {
  this.$fallbackElement.style.display = 'block'
}

TimeoutWarning.prototype.startUiCountdown = function() {
  this.clearTimers()
  var $module = this
  var $countdown = this.$countdown
  var $accessibleCountdown = this.$accessibleCountdown
  var minutes = this.minutesTimeOutModalVisible
  var timerRunOnce = false
  var timers = this.timers
  var seconds = Math.round(60 * minutes)

  ;(function runTimer() {
    var timerExpired = seconds < 1
    var minutesLeft = Math.ceil(seconds / 60)
    var timeLeftText

    if (seconds >= 60) {
      timeLeftText = '<span class="tabular-numbers">' + minutesLeft + '</span> minute' + (minutesLeft > 1 ? 's' : '')
    } else {
      timeLeftText = '<span class="tabular-numbers">' + seconds + '</span> second' + (seconds > 1 ? 's' : '')
    }

    var atTimeLeftText = seconds >= 60 ? minutesLeft + ' minute' + (minutesLeft > 1 ? 's' : '') : seconds + ' second' + (seconds > 1 ? 's' : '')

    var text = document.createElement('p')
    text.appendChild(document.createTextNode($module.timerText))

    var countdown = document.createElement('span')
    countdown.setAttribute('class', 'countdown')
    countdown.innerHTML = ' ' + timeLeftText + '.'
    text.appendChild(countdown)

    var atText = $module.timerText + ' ' + atTimeLeftText + '.'

    var extraText
    if ($module.timerExtraText) {
      extraText = document.createElement('p')
      extraText.innerText = $module.timerExtraText
    }

    if (timerExpired) {
      $accessibleCountdown.innerText = $module.timerRedirectText
      setTimeout($module.redirect.bind($module), 1000)
    } else {
      seconds--

      $countdown.innerText = ''
      $countdown.appendChild(text)
      if (extraText) $countdown.appendChild(extraText)

      if (seconds < 20) {
        $accessibleCountdown.setAttribute('aria-live', 'assertive')
      }

      if (!timerRunOnce) {
        setTimeout(function() {
          $accessibleCountdown.innerText = atText + ' ' + $module.timerExtraText
          timerRunOnce = true
        }, 1000)
      } else if (seconds % 15 === 0) {
        $accessibleCountdown.innerText = atText
      }

      timers.push(setTimeout(runTimer, 1000))
    }
  })()
}

TimeoutWarning.prototype.redirect = function() {
  var returnTo = encodeURIComponent(window.location.pathname + window.location.search)
  window.location.href = this.timeOutRedirectUrl + '?returnTo=' + returnTo
}

TimeoutWarning.prototype.isDialogOpen = function() {
  return this.modalDialog.isOpen()
}

TimeoutWarning.prototype.dialogClose = function() {
  if (!this.isDialogOpen()) {
    this.clearTimers()
    this.extendTimeOnServer()
  }
}

TimeoutWarning.prototype.clearTimers = function() {
  for (var i = 0; i < this.timers.length; i++) {
    clearTimeout(this.timers[i])
  }
}

export default TimeoutWarning
