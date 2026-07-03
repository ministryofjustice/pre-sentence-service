import fs from 'fs'
import path from 'path'

describe('sharedPageLayout.njk', () => {
  const source = fs.readFileSync(path.join(__dirname, 'sharedPageLayout.njk'), 'utf8')

  it('wraps editor scripts in featureRichTextEditor conditional', () => {
    expect(source).toContain('{% if featureRichTextEditor %}')
    expect(source).toContain('{% endif %}')

    const insideIf = source.split('{% if featureRichTextEditor %}')[1].split('{% endif %}')[0]
    expect(insideIf).toContain('/assets/ckeditor.js')
    expect(insideIf).toContain('/assets/ckeditor5setup.js')
    expect(insideIf).toContain('/assets/wproofreader.js')
    expect(insideIf).toContain('window.wproofreaderConfig')
  })

  it('keeps character-count and save-on-exit outside the conditional', () => {
    // Split on the featureRichTextEditor block boundaries to get the content after it.
    // The file contains two {% endif %} tags; we want everything after the one that
    // closes the {% if featureRichTextEditor %} block.
    const afterFeatureBlock = source.split('{% if featureRichTextEditor %}')[1].split('{% endif %}')[1]
    expect(afterFeatureBlock).toContain('/assets/character-count.js')
    expect(afterFeatureBlock).toContain('/assets/save-on-exit.js')
  })
})
