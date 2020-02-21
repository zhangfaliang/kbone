import React from 'react'
import ReactDOM from 'react-dom'
import Counter from './components/counter'
import BetButton from './components/betButton'

export default function createApp() {
  const container = document.createElement('div')
  container.id = 'app'
  document.body.appendChild(container)

  ReactDOM.render(
    <div>
      <Counter />
      <BetButton
        optionId="3453"
        handicap="444"
        odds="67"
        optionName="test"
        betHandicap="45"
        isDetail
        bettingSlipId="gkjhkd"
      />
    </div>,
    container
  )
}

;('undefined' != typeof wx && wx.getSystemInfoSync) || createApp()
