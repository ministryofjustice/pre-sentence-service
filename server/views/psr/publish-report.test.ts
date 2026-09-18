import fs from 'fs'
import path from 'path'

describe('publish-report.njk', () => {
  const source = fs.readFileSync(path.join(__dirname, 'publish-report.njk'), 'utf8')

  it('wraps the Smart Survey popup script in featureSmartSurvey conditional', () => {
    expect(source).toContain('{% if featureSmartSurvey %}')

    const insideIf = source.split('{% if featureSmartSurvey %}')[1].split('{% endif %}')[0]
    expect(insideIf).toContain('https://embed.smartsurvey.io/index.js?popupCode=X8XUZ7')
  })

  it('preserves inherited scripts via super() in the additionalScripts block', () => {
    const additionalScripts = source.split('{% block additionalScripts %}')[1].split('{% endblock %}')[0]
    expect(additionalScripts).toContain('{{ super() }}')
  })
})
