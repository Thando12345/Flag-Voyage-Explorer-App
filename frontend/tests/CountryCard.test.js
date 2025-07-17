import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CountryCard from '../src/components/CountryCard.vue'

describe('CountryCard', () => {
  it('renders properly with country data', () => {
    const country = {
      name: 'Germany',
      flag: 'https://example.com/germany.png'
    }
    
    const wrapper = mount(CountryCard, {
      props: { country }
    })
    
    // Check if the component renders the country name
    expect(wrapper.text()).toContain('Germany')
    
    // Check if the flag image has the correct src
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://example.com/germany.png')
    expect(img.attributes('alt')).toBe('Flag of Germany')
  })
  
  it('handles image loading errors', async () => {
    const country = {
      name: 'Test Country',
      flag: 'invalid-url'
    }
    
    const wrapper = mount(CountryCard, {
      props: { country }
    })
    
    // Simulate image error
    const img = wrapper.find('img')
    await img.trigger('error')
    
    // Check if the placeholder is set
    expect(img.attributes('src')).toBe('/placeholder.svg')
  })
})