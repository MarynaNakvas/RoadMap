module.exports = function () {
	let faker = require('faker');
	let _ = require('lodash');
	return {
		posts: _.times(2000, function (n) {
			return {
				id: n,
				title: faker.lorem.sentence(3),
				author: faker.name.findName(),
				date: faker.date.between('2015-01-01', '2020-01-01'),
				raiting: faker.random.number({
					'min': 0,
					'max': 2000,
				}),
				isPriority: false,
			}
		}),
	}
}
