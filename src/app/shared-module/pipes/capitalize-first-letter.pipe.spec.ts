import {CapitalizeFirstLetterPipe} from './capitalize-first-letter.pipe';

describe('CapitalizeFirstLetterPipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizeFirstLetterPipe();
    expect(pipe).toBeTruthy();
  });
  it('should return an empty string when enter a falsy input', () => {
    const pipe = new CapitalizeFirstLetterPipe();
    expect(pipe.transform(null)).toEqual('');
  });

  it('should capitalize the first letter of input', () => {
    const pipe = new CapitalizeFirstLetterPipe();
    expect(pipe.transform('hackages')).toEqual('Hackages');
  });
});
