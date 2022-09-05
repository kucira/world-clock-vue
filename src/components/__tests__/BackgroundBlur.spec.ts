import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BackgroundBlur from '../BackgroundBlur.vue'

describe('BackgroundBlur Component', () => {
  it('renders properly', () => {
    const wrapper = mount(BackgroundBlur, { slots: {
        default: '<p>this is the content</p>'
    }})
    expect(wrapper.html()).toContain('<p>this is the content</p>')
  })
})
