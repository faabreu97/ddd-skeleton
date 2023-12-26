import { TextEncrypter } from '../../../../src/Contexts/Shared/infrastructure/TextEncrypter';
import { WordMother } from '../domain/WordMother';

describe('TextEncrypter', () => {
  const encrypter = TextEncrypter;

  it('encrypt a text', async () => {
    const text = WordMother.random();
    const encryptedText = await encrypter.encrypt(text);
    expect(text).not.toEqual(encryptedText);
  });

  it('compare a text', async () => {
    const text = WordMother.random();
    const encryptedText = await encrypter.encrypt(text);
    const match = await encrypter.compare(encryptedText, text);
    expect(match).toEqual(true);
  });
});
