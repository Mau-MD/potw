import type { RequestHandler } from '@sveltejs/kit/types/internal';
import axios from 'axios';
import fs from 'fs';

import prevLeetcodeData from './data.json';

const getUserData = async (username: string) => {
	const url = 'https://leetcode-stats-api.herokuapp.com/';
	return await axios.get<LeetcodeUser>(url + username);
};

const getPoints = (lastUser: LeetcodeUser, currUser: LeetcodeUser) => {
	return (
		currUser.easySolved -
		lastUser.easySolved +
		3 * (currUser.mediumSolved - lastUser.mediumSolved) +
		5 * (currUser.hardSolved - lastUser.hardSolved)
	);
};
export const get: RequestHandler = async ({ params }): Promise<{ body: any }> => {
	try {
		const usernames = [
			'Ivanfmms',
			'ElNito7',
			'Dusuan',
			'emiliano_0X1',
			'Maza-paneitor',
			'NicoEscaroz',
			'Civza',
			'pecezon',
			'h4ru77',
			'Rhamses09',
			'ximeenavargas',
			'ericpapazzz',
			'kamichips'
		];

		const data = await Promise.all(usernames.map(getUserData));

		let currLeetcodeData = data.map((d, i) => {
			return { ...d.data, username: usernames[i] };
		});

		let userPoints: { username: string; points: number; place?: number }[] = [];
		for (let i = 0; i < currLeetcodeData.length; i++) {
			const points = getPoints(prevLeetcodeData[i], currLeetcodeData[i]);
			userPoints.push({ points, username: currLeetcodeData[i].username });
		}

		userPoints = userPoints.sort((a, b) => b.points - a.points);

		let place = 2;
		userPoints[0].place = 1;
		for (let idx = 1; idx < userPoints.length; idx++) {
			if (userPoints[idx].points === userPoints[idx - 1].points) {
				userPoints[idx].place = userPoints[idx - 1].place;
				place += 1;
				continue;
			}
			userPoints[idx].place = place;
			place += 1;
		}

		currLeetcodeData = currLeetcodeData.map((curr) => {
			const pts = userPoints.find((u) => u.username === curr.username);
			if (!pts?.place) {
				return { ...curr, place: 0 };
			}
			return { ...curr, place: pts.place, link: `https://leetcode.com/${curr.username}/` };
		});

		fs.writeFileSync('./src/routes/contest/data.json', JSON.stringify(currLeetcodeData, null, 2));

		return {
			body: {
				prevLeetcodeData,
				currLeetcodeData
			}
		};
	} catch (err) {
		console.log(err);
		return {
			body: { error: 'error' }
		};
	}
};
