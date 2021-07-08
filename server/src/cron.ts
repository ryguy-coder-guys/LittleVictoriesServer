import shell from 'shelljs';
import { CronJob } from 'cron';

console.log('Before job instantiation');
const job = new CronJob('00 00 00 * * *', function() {
	if (shell.exec('ts-node-dev server/src/helpers/resetHabits').code !== 0) {
		console.log('something went wrong')
	}
	console.log('cron is executing, timestamp is:', new Date());
});
console.log('After job instantiation');

export default job;