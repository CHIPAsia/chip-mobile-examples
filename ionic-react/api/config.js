const config = {
  brandId: '<<BRAND_ID>>',
  apiKey: '<<API_KEY>>',
  endpoint: 'https://gate.chip-in.asia/api/v1',
  basedUrl: 'http://localhost:7001',
  /**
   * Uncomment this line if you required test webhook,
   * However, you need to change the basedUrl to your
   * preferred public domain service (i.e. ngrok).
   */
  // webhookPublicKey: '<<WEBHOOK_PUBLIC_KEY>>'
}

module.exports = config
