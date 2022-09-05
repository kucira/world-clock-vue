import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ButtonClock from '../ButtonClock.vue'

describe('ButtonClock Component', () => {
  it('renders properly', () => {
    const wrapper = mount(ButtonClock, { props: { label: 'Label Button' } })
    expect(wrapper.text()).toContain('Label Button')
  })
})
