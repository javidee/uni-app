import posthog from 'posthog-js'

let initialized = false

export function initAnalytics() {
  if (initialized) return

  posthog.init('phc_zuuZ9WSu6ywPtQjFpKaty2WSbuovqVFVTcs5KnwbUSbx', {
    api_host: 'https://us.posthog.com',
    person_profiles: 'identified_only',
    autocapture: true,
    capture_pageview: true,
  })

  initialized = true
}

export function trackEvent(eventName, properties = {}) {
  console.log(`[Analytics] ${eventName}`, properties)
  posthog.capture(eventName, properties)
}