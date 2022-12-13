const add = (a, b) => parseInt(a) + parseInt(b);

describe('S', () => {
  it('works as expected', () => {
    // we run our expect statements to see if the test will pass
    expect(1).toEqual(1);
    const age = 100;
    expect(age).toEqual(100);
  });
  it('adds two things together', () => {
    // we run our expect statements to see if the test will pass
    expect(add(1, 2)).toEqual(3);
  });
  it('can add strings of numbers together', () => {
    // we run our expect statements to see if the test will pass
    expect(add('1', '2')).toEqual(3);
  });
});
