const express = require('express');
const cors = require('cors');

const hotels = require('./data/hotel');

const app = express();
app.use(cors());

/**
 * Endpoint to get all hotels
 */
app.get('/hotels', (req, res) => {
  res.json({ hotels });
});

/**
 * Sort hotels by pricing
 */

function sortByPricingDescending(hotel1, hotel2) {
  return hotel2.price - hotel1.price;
}
function sortByPricingAscending(hotel1, hotel2) {
  return hotel1.price - hotel2.price;
}

app.get('/hotels/sort/pricing', (req, res) => {
  const pricing = req.query.pricing;
  let hotelsCopy = hotels.slice();
  if (pricing === 'low-to-high') {
    hotelsCopy.sort(sortByPricingAscending);
  } else if (pricing === 'high-to-low') {
    hotelsCopy.sort(sortByPricingDescending);
  }

  res.json({
    hotels: hotelsCopy,
  });
});

/**
 * Sort hotels by rating
 */
function sortByRatingDescending(hotel1, hotel2) {
  return hotel2.rating - hotel1.rating;
}
function sortByRatingAscending(hotel1, hotel2) {
  return hotel1.rating - hotel2.rating;
}
app.get('/hotels/sort/rating', (req, res) => {
  const rating = req.query.rating;
  let hotelsCopy = hotels.slice();
  if (rating === 'low-to-high') {
    hotelsCopy.sort(sortByRatingAscending);
  } else if (rating === 'high-to-low') {
    hotelsCopy.sort(sortByRatingDescending);
  }

  res.json({
    hotels: hotelsCopy,
  });
});

/**
 * Sort hotels by reviews
 */
function sortByReviewsDescending(hotel1, hotel2) {
  return hotel2.reviews - hotel1.reviews;
}
function sortByReviewsAscending(hotel1, hotel2) {
  return hotel1.reviews - hotel2.reviews;
}
app.get('/hotels/sort/reviews', (req, res) => {
  const reviews = req.query.reviews;
  let hotelsCopy = hotels.slice();
  if (reviews === 'least-to-most') {
    hotelsCopy.sort(sortByReviewsAscending);
  } else if (reviews === 'most-to-least') {
    hotelsCopy.sort(sortByReviewsDescending);
  }

  res.json({
    hotels: hotelsCopy,
  });
});

/**
 * Filter hotels by amenity
 */
function filterByAmenity(hotel, amenity) {
  return hotel.amenity.toLowerCase() === amenity;
}

app.get('/hotels/filter/amenity', (req, res) => {
  const amenity = req.query.amenity.toLowerCase();
  let result = hotels.filter((hotel) => filterByAmenity(hotel, amenity));

  res.json({
    hotels: result,
  });
});

/**
 * Filter hotels by Country
 */
function filterByCountry(hotel, country) {
  return hotel.country.toLowerCase() === country;
}

app.get('/hotels/filter/country', (req, res) => {
  const country = req.query.country.toLowerCase();
  let result = hotels.filter((hotel) => filterByCountry(hotel, country));

  res.json({
    hotels: result,
  });
});

/**
 * Filter hotels by Category
 */
function filterByCategory(hotel, category) {
  return hotel.category.toLowerCase() === category;
}

app.get('/hotels/filter/category', (req, res) => {
  const category = req.query.category.toLowerCase();
  let result = hotels.filter((hotel) => filterByCategory(hotel, category));

  res.json({
    hotels: result,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
