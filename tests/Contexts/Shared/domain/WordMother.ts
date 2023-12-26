import { MotherCreator } from './MotherCreator';

export class WordMother {
  static random(options?: { minLength?: number; maxLength: number }): string {
    const minLength = options?.minLength ?? 1;
    const maxLength = options?.maxLength ?? 10;
    return (
      MotherCreator.random().lorem.word(
        Math.floor(Math.random() * (maxLength - minLength)) + minLength
      ) || 'word'
    );
  }
}
