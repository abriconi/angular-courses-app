import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('should transform minutes into "hours minutes" format', () => {
    expect(pipe.transform('100')).toEqual('1h 40min');
    expect(pipe.transform('30')).toEqual('30min');
  });

  it('should handle singular and plural correctly', () => {
    expect(pipe.transform('0')).toEqual('0min');
    expect(pipe.transform('1')).toEqual('1min');
    expect(pipe.transform('60')).toEqual('1h');
    expect(pipe.transform('61')).toEqual('1h 1min');
  });

  it('should return "0min" for invalid input', () => {
    expect(pipe.transform('')).toEqual('0min');
    expect(pipe.transform('abc')).toEqual('0min');
  });
});
