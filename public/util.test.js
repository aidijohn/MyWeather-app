//location test
const { addListener }= require('./script');

test('Should display location', () => {
    const text = addListener('Nairobi, Kenya');
    expect(text).toBe('Nairobi, Kenya');
});



//to show the weather conditions
