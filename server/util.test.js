const roundTo = require('round-to');
const { coordDistance } = require('./util');
const { coordClosest } = require('./util');

const testPoints = [
  { lat: 29.6488, lng: -82.3433 }, // century tower
  { lat: 29.6465, lng: -82.3479 }, // reitz union
  { lat: 29.6381, lng: -82.3686 }, // southwest rec
  { lat: 29.6481, lng: -82.3437 }, // marston science library
];

test('distance between century tower and reitz union to equal ~0.005143', () => {
  expect(roundTo(coordDistance(testPoints[0], testPoints[1]), 6)).toBe(0.005143);
});

test('distance between century tower and southwest rec to equal ~0.027470', () => {
  expect(roundTo(coordDistance(testPoints[0], testPoints[2]), 6)).toBe(0.02747);
});

test('distance between southwest rec and marston science library to equal ~0.026833', () => {
  expect(roundTo(coordDistance(testPoints[2], testPoints[3]), 6)).toBe(0.026833);
});

test('distance between reitz union and southwest rec to equal ~0.022339', () => {
  expect(roundTo(coordDistance(testPoints[1], testPoints[2]), 6)).toBe(0.022339);
});

test('distance between century tower and marston science library to equal ~0.000806', () => {
  expect(roundTo(coordDistance(testPoints[0], testPoints[3]), 6)).toBe(0.000806);
});

test('closest point to 20, 82 to equal {lat: 29.6488, lng: -82.3433}', () => {
  expect(coordClosest(testPoints, { lat: 20, lng: 82 }).coordinates).toEqual({
    lat: 29.6488,
    lng: -82.3433,
  });
});

test('closest point to 10, -82 to equal {lat: 29.6381, lng: -82.3686}', () => {
  expect(coordClosest(testPoints, { lat: 10, lng: -82 }).coordinates).toEqual({
    lat: 29.6381,
    lng: -82.3686,
  });
});

test('closest point to 29.6379, -82.3690 to equal {lat: 29.6488, lng: -82.3433}', () => {
  expect(coordClosest(testPoints, { lat: 29.6379, lng: -82.369 }).coordinates).toEqual({
    lat: 29.6381,
    lng: -82.3686,
  });
});
