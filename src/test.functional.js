import { Selector } from 'testcafe';

fixture `Page Load`
  .page `http://localhost:3000`;

test('The app web page loads', async t => {
  await t
    .expect(Selector('h1.score').innerText).eql('Rejection Score: 0');
});
