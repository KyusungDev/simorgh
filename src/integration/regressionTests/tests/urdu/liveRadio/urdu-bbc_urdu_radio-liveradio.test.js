/**
 * @pathname /urdu/bbc_urdu_radio/liveradio
 */

it('I can see a page title - AMP', () => {
  const pageTitle = amp.document.querySelector('title').textContent;

  expect(pageTitle).toBeTruthy();
  expect(pageTitle).toMatchInlineSnapshot(
    `"بی بی سی اردو ریڈیو - BBC News اردو"`,
  );
});

it('I can see a page title - Canonical', () => {
  const pageTitle = canonical.document.querySelector('title').textContent;

  expect(pageTitle).toBeTruthy();
  expect(pageTitle).toMatchInlineSnapshot(
    `"بی بی سی اردو ریڈیو - BBC News اردو"`,
  );
});

it(`I can see the brand logo in the header - AMP`, () => {
  const logo = amp.document.querySelector('header svg');

  expect(logo).toBeInTheDocument();
  expect(logo.parentNode.textContent).toMatchInlineSnapshot(`"BBC News, اردو"`);
});

it(`I can see the brand logo in the header - Canonical`, () => {
  const logo = canonical.document.querySelector('header svg');

  expect(logo).toBeInTheDocument();
  expect(logo.parentNode.textContent).toMatchInlineSnapshot(`"BBC News, اردو"`);
});

it('I can see a skip to content link that links to the main content of the page - AMP', () => {
  const skipToContentEl = amp.document.querySelector('[href="#content"]');
  const h1El = amp.document.querySelector('h1');

  expect(skipToContentEl.getAttribute('href')).toBe('#content');
  expect(h1El.getAttribute('id')).toBe('content');
  expect(h1El.getAttribute('tabindex')).toBe('-1');
  expect(skipToContentEl.textContent).toMatchInlineSnapshot(`"مواد پر جائیں"`);
});

it('I can see a headline - AMP', () => {
  const headline = amp.document.querySelector('h1').textContent;

  expect(headline).toBeTruthy();
  expect(headline).toMatchInlineSnapshot(`"بی بی سی اردو ریڈیو"`);
});

it('I can see a skip to content link that links to the main content of the page - Canonical', () => {
  const skipToContentEl = canonical.document.querySelector('[href="#content"]');
  const h1El = canonical.document.querySelector('h1');

  expect(skipToContentEl.getAttribute('href')).toBe('#content');
  expect(h1El.getAttribute('id')).toBe('content');
  expect(h1El.getAttribute('tabindex')).toBe('-1');
  expect(skipToContentEl.textContent).toMatchInlineSnapshot(`"مواد پر جائیں"`);
});

it('I can see a headline - Canonical', () => {
  const headline = canonical.document.querySelector('h1').textContent;

  expect(headline).toBeTruthy();
  expect(headline).toMatchInlineSnapshot(`"بی بی سی اردو ریڈیو"`);
});

it('I can see the summary - AMP', () => {
  const summaryEl = amp.document.querySelector('main p');

  expect(summaryEl).toBeInTheDocument();
  expect(summaryEl.textContent).toMatchInlineSnapshot(
    `"اردو زبان کے معتبر ترین خبررساں اداروں میں ایک، بی بی سی اردو کی جانب سے مصدقہ خبریں اور جامع تجزیے"`,
  );
});

it('I can see the summary - Canonical', () => {
  const summaryEl = canonical.document.querySelector('main p');

  expect(summaryEl).toBeInTheDocument();
  expect(summaryEl.textContent).toMatchInlineSnapshot(
    `"اردو زبان کے معتبر ترین خبررساں اداروں میں ایک، بی بی سی اردو کی جانب سے مصدقہ خبریں اور جامع تجزیے"`,
  );
});

it('I can see an audio player embed - Canonical', () => {
  const audioPlayerIframe = canonical.document.querySelector('iframe');

  expect(audioPlayerIframe).toBeInTheDocument();
  expect(audioPlayerIframe.getAttribute('src')).toMatchInlineSnapshot(
    `"https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_urdu_radio/liveradio/ur"`,
  );
});

it('I can see an audio player image placeholder - AMP', () => {
  const audioPlaceholderImage = amp.document.querySelector(
    'amp-img[src="http://localhost:7080/images/amp_audio_placeholder.png"]',
  );

  expect(audioPlaceholderImage).toBeInTheDocument();
});

it('I can see an audio player embed - AMP', () => {
  const audioPlayerIframe = amp.document.querySelector('amp-iframe');

  expect(audioPlayerIframe.getAttribute('src')).toMatchInlineSnapshot(
    `"https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_urdu_radio/liveradio/ur/amp"`,
  );
});

it('I can see the footer copyright - AMP', () => {
  const footerCopyright = amp.document.querySelector('footer div p')
    .textContent;

  expect(footerCopyright).toBeTruthy();
  expect(footerCopyright).toMatchInlineSnapshot(
    `"© 2020 بی بی سی. بی بی سی بیرونی ویب سائٹس کے مواد کا ذمہ دار نہیں بیرونی لنکس کے بارے میں ہماری پالیسی."`,
  );
});

it('I can see the footer copyright - Canonical', () => {
  const footerCopyright = amp.document.querySelector('footer div p')
    .textContent;

  expect(footerCopyright).toBeTruthy();
  expect(footerCopyright).toMatchInlineSnapshot(
    `"© 2020 بی بی سی. بی بی سی بیرونی ویب سائٹس کے مواد کا ذمہ دار نہیں بیرونی لنکس کے بارے میں ہماری پالیسی."`,
  );
});
