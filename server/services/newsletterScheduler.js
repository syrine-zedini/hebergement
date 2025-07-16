import cron from 'node-cron';
import { sendReminderEmails } from '../controllers/newsletterController.js';

class NewsletterScheduler {
    constructor() {
        this.isRunning = false;
        this.task = null;
    }

    // Start the scheduler to send emails every 5 minutes
    startScheduler() {
        if (this.isRunning) {
            console.log('Newsletter scheduler is already running');
            return;
        }

        // Schedule task to run every 5 minutes
        this.task = cron.schedule('*/5 * * * *', async () => {
            console.log('Running newsletter reminder email campaign...');
            await sendReminderEmails();
        }, {
            scheduled: false,
            timezone: "UTC"
        });

        this.task.start();
        this.isRunning = true;
        console.log('Newsletter scheduler started - sending emails every 5 minutes');
    }
}

// Create singleton instance
const newsletterScheduler = new NewsletterScheduler();

export default newsletterScheduler; 