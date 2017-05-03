import {ReplaceAllUnderscoreBySpacePipe} from './replace-all-underscore-by-space.pipe';

describe('ReplaceAllUnderscoreBySpacePipe', () => {
  it('create an instance', () => {
    const pipe = new ReplaceAllUnderscoreBySpacePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return an empty string when enter a falsy input', () => {
    const pipe = new ReplaceAllUnderscoreBySpacePipe();
    expect(pipe.transform(null)).toEqual('');
  });

  it('should replace all underscore of input by \'\' ', () => {
    const pipe = new ReplaceAllUnderscoreBySpacePipe();
    expect(pipe.transform('a_word_with_multiple_under_')).toEqual('a word with multiple under ');
  });
});
