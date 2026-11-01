export const usd = (cents) => '$' + (cents / 100).toFixed(2)
export const fmtPhone = (d) => d.replace(/^(\d{0,3})(\d{0,3})(\d{0,4}).*/, (_, a, b, c) => [a, b, c].filter(Boolean).join('-'))
